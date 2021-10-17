var express = require('express');
var router = express.Router();
const Redis = require('redis');
const { v4: uuidv4 } = require('uuid');

const redisClient = Redis.createClient();

const EXPIRY_TIME = 80;

/* GET users listing. */
router.post('/create', function(req, res) {
  const userId = req.body.user;
  const difficulty = req.body.difficulty;
  const questionType = req.body.questionType;
  const subKey = difficulty + questionType;
  const key = difficulty + questionType + userId;
  redisClient.keys(subKey + '*', (error, value) => {
    if (value.length >= 1) {
      const partnerKey = value[0];
      redisClient.get(partnerKey, (error, value1) => {
        const lobbyId = uuidv4();
        redisClient.set('matched' + partnerKey, JSON.stringify({lobbyId, userId}));
        redisClient.del(partnerKey);
        return res.json({ matchStatus: "success", matchId: lobbyId, parterId: value1 });
      })
    } else {
      redisClient.setex(key, EXPIRY_TIME, userId);
      return res.json({ matchStatus: "waiting" });
    }
  })
});

router.post('/', function(req, res) {
  const userId = req.body.user;
  const difficulty = req.body.difficulty;
  const questionType = req.body.questionType;
  const key = difficulty + questionType + userId;
  redisClient.get('matched' + key, (error, value) => {
    if (value) {
      const obj = JSON.parse(value);
      redisClient.del('matched' + key);
      return res.json({ matchStatus: "success", matchId: obj.lobbyId, parterId: obj.userId });
    } else {
      redisClient.get(key, (error, value1) => {
        if (key) {
          return res.json({ matchStatus: "waiting" });
        } else {
          return res.json({ matchStatus: "failed" });
        }
      })
    }
  })
})


module.exports = router;