exports.dbConfig = { options: {
    encrypt: true,},
server: "deploymentserver.database.windows.net",
port: 1433,
database: "fallRisk",
user: "noadmin",
password: "password#0",
};

exports.serverPort = 8080;
exports.httpMsgFormat = "JSON"; //OR HTML