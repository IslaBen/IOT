const db = require("../sqldb.js")
var httpMsgs = require("../httpMgs");

exports.getAllData = function(req, res) {
    console.log("database connected");
    db.executeSql("SELECT * FROM fallRisk", function (data, err) {
        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            httpMsgs.sendJson(req, res, data);
        }
    });
};



exports.get = function (req, res){
// need to be implimented
};


exports.add = function (req, res, reqBody){
// need to be implimented
};


exports.update = function (req, res, reqBody){
// need to be implimented
};

exports.delete = function (req, res){
// need to be implimented
};