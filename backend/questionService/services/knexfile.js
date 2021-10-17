module.exports = {
    development: {
        client: "pg",
        connection: {
            host: "localhost",
            user: "postgres",
            password: "postgres",
            database: "postgres",
        },
    },
    test: {
        client: "pg",
        connection: {
            host: "localhost",
            port: 5432,
            user: "postgres",
            password: "postgres",
            database: "postgres",
        },
    },
};
