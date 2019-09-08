var httpMsgFormat = require("./config");
var config = require("./config")

exports.show500 = function (req, res, err) {
    if(config.httpMsgFormat === "HTML"){
        res.writeHeader(500, "Internal Error occurred", {"Content-Type": "text/html"});
        res.write("<html lang='eng'><head><title>500</title></head><body>500 : Internal Error" + err + "</body></html>>")
    }
    else{
        res.writeHeader(500,"Internal Error occurred", {"Content-Type": "application/json"});
        res.write(JSON.stringify({data: "ERROR occured" + err}));
    }
};

exports.sendJson = function (req, res, data) {
    res.writeHeader(200, {"Content-Type": "application/json"});
    if (data){
        res.write(JSON.stringify(data));
    }
    res.end();
};


exports.show405 = function (req, res, err) {
    if(config.httpMsgFormat === "HTML"){
        res.writeHeader(405, "Internal Error occurred", {"Content-Type": "text/html"});
        res.write("<html lang='eng'><head><title>405</title></head><body>405 : Internal Error" + err + "</body></html>>")
    }
    else{
        res.writeHeader(405,"Method not supported", {"Content-Type": "application/json"});
        res.write(JSON.stringify({data: "Method not supported" + err}));
    }
    res.end();
};

exports.show404 = function (req, res, err) {
    if(config.httpMsgFormat === "HTML"){
        res.writeHeader(404, "Not found", {"Content-Type": "text/html"});
        res.write("<html lang='eng'><head><title>404</title></head><body>404 : Not found" + err + "</body></html>>")
    }
    else{
        res.writeHeader(405,"Not found", {"Content-Type": "application/json"});
        res.write(JSON.stringify({data: "not found" + err}));
    }
    res.end();
};

exports.show404 = function (req, res, err) {
    if(config.httpMsgFormat === "HTML"){
        res.writeHeader(413, "request too large", {"Content-Type": "text/html"});
        res.write("<html lang='eng'><head><title>413</title></head><body>413 : request too large" + err + "</body></html>>")
    }
    else{
        res.writeHeader(413,"request too large", {"Content-Type": "application/json"});
        res.write(JSON.stringify({data: "request too large" + err}));
    }
    res.end();
};


exports.show200 = function (req, res, err) {
        res.writeHeader(200, {"Content-Type": "text/html"});
    res.end();
};



exports.showHome = function(req, res){

    if(config.httpMsgFormat === "HTML"){
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write("<html lang='eng'><head><title>Home</title></head><body>valid endpoint</body></html>>")
    }
    else{
        res.writeHeader(500,"Internal Error occurred", {"Content-Type": "application/json"});
    }
};