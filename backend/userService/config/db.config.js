module.exports = {
    HOST: process.env.DB_HOST || "localhost", // docker.for.mac.host.internal for mac testing
    USER: process.env.DB_USER || "postgres",
    PASSWORD: process.env.DB_PASSWORD || "postgres",
    DB: process.env.DB_DATABASE || "userservice",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };