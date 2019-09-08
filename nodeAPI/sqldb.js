var sqldb = require("mssql");
var settings = require("./config.js");


//Connect to database and execute query
exports.executeSql = function(sql, callback){
    const conn = new sqldb.ConnectionPool(settings.dbConfig);
    conn.connect()
        .then(function (){
            var req = new sqldb.Request(conn);
            req.query(sql)
                .then(function(recordset){
                    console.log("Oracle SQL DB connected.")
                    callback(recordset)
            })
                .catch(function(err){
                    console.log("Error while connecting database :" + err);
                    callback(null, err);
                });
        })
        .catch(function (err){
            console.log("Error while connecting database :" + err);
            callback(null, err);

        });
};