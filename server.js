const http = require("http");
const fs = require("fs");
const prefix = "shared/public/";

const server = http.createServer(function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(`Method = ${req.method}, ` + `URL = ${req.url}`);
  var requestedPath = prefix + req.url;
  var text = fs.readFileSync(requestedPath, "utf-8");
  res.write(text);
  res.end();
});

const port = 7070;
server.listen(port);
