const env = process.env.NODE_ENV;
const API_GATRWAY = "http://ddf9af43-default-apiingres-41cb-735676359.ap-southeast-1.elb.amazonaws.com";
const DEPLOYED_SOCKETIO = "http://a3a8c8d99028a4193b8886ba7d66cdc6-978900654.ap-southeast-1.elb.amazonaws.com:5000";

const ENDPOINTS_MAP = {
    development: {
        questionService: "http://localhost:3001/question",
        matchingService: "http://localhost:8000/match",
        userService: "http://localhost:4000/auth",
        socketIO: "http://localhost:5000",
    },
    production: {
        questionService: `${API_GATRWAY}/question`,
        matchingService: `${API_GATRWAY}/match`,
        userService: `${API_GATRWAY}/auth`,
        socketIO: DEPLOYED_SOCKETIO,
    },
};

export const endpoints = {
    questionService: ENDPOINTS_MAP[env].questionService,
    matchingService: ENDPOINTS_MAP[env].matchingService,
    userService: ENDPOINTS_MAP[env].userService,
    socketIO: ENDPOINTS_MAP[env].socketIO,
};
