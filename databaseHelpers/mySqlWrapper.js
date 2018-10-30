module.exports = {

  query: query
}
const sql = require("mssql");

var dbConfig = {
  user: "usrFramework",
  password: "S3curity307!@#k8y5",
  server: "bmwm3.rsb.org.br",
  database: "dbFramework"
};
//Function to connect to database and execute query
function query(res, queryStr) {      
  sql.connect(dbConfig, function (err) {
    if (err) {
      console.log("Error while connecting database :- " + err);
      res.send(err);
    }
    else {
      // create Request object
      var request = new sql.Request();
      // query to the database
      request.query(queryStr, function (err, resp) {
        if (err) {
          console.log("Error while querying database :- " + err);
          res.send(err);
        }
        else {
          console.log(resp)
          res.send(resp);
        }
      });
    }
  });
}