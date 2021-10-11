var express = require('express');
var router = express.Router();

const queue = [];

/* GET users listing. */
router.post('/', function(req, res) {
  const userId = req.body.user;
  queue.push(userId);
  if (queue.length % 2 == 0 && queue.length > 0) {
    const user1 = queue.pop();
    const user2 = queue.pop();
    
  }
  res.send('respond with a resource');
});

router.get('/', function(req, res) {

})

module.exports = router;
