var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", require("./routes/user.routes"));
app.use("/product", require("./routes/product.routes"));

var server = app.listen(4000, function () {
  console.log("Listening on port %s...", server.address().port);
});
