let mySqlConnection;

module.exports = injectedMySqlConnection => {

  mySqlConnection = injectedMySqlConnection

  return {

   registerUserInDB: registerUserInDB,
   getUserFromCrentials: getUserFromCrentials,
   doesUserExist: doesUserExist,
   getUserS: getUserS
 }
}

/**
 * attempts to register a user in the DB with the specified details.
 * it provides the results in the specified callback which takes a
 * DataResponseObject as its only parameter
 *
 * @param username
 * @param password
 * @param registrationCallback - takes a DataResponseObject
 */
function registerUserInDB(username, password, registrationCallback){
  console.log(username)
  console.log(password)
  //create query using the data in the req.body to register the user in the db
  const registerUserQuery = `INSERT INTO [dbFramework].[dbo].[User] ([txSSOLoginName], [txSSOPassword]) VALUES ('${username}', SHA('${password}'))`

  //execute the query to register the user
  mySqlConnection.query(registrationCallback,registerUserQuery)
}

/**
 * Gets the user with the specified username and password.
 * It provides the results in a callback which takes an:
 * an error object which will be set to null if there is no error.
 * and a user object which will be null if there is no user
 *
 * @param username
 * @param password
 * @param callback - takes an error and a user object
 */
function getUserFromCrentials(username, password, callback) {

  //create query using the data in the req.body to register the user in the db
  const getUserQuery = `SELECT * FROM [dbFramework].[dbo].[User] WHERE [txSSOLoginName] = '${username}' AND [txSSOPassword]= SHA('${password}')`

  //console.log('getUserFromCrentials query is: ', getUserQuery);

  //execute the query to get the user
  mySqlConnection.query(getUserQuery, (dataResponseObject) => {

      //pass in the error which may be null and pass the results object which we get the user from if it is not null
      callback(false, dataResponseObject.results !== null && dataResponseObject.results.length  === 1 ?  dataResponseObject.results[0] : null)
  })
}
function doesUserExist(username, callback) {
  //console.log('doesUserExist')
  //create query to check if the user already exists
  const doesUserExistQuery = `SELECT * FROM [dbFramework].[dbo].[User] WHERE [txSSOLoginName] = '${username}'`
  //console.log(doesUserExistQuery)
  //holds the results  from the query
  const sqlCallback = (dataResponseObject) => {

      //calculate if user exists or assign null if results is null
      const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null

      //check if there are any users with this username and return the appropriate value
      callback(dataResponseObject.error, doesUserExist)
  }

  //execute the query to check if the user exists
  mySqlConnection.query(sqlCallback,doesUserExistQuery)
}

function getUserS(req,res){
  var queryd = "SELECT TOP (1000) [idUser],[txSSOLoginName],[txSSOPassword],[inStatus],[obPicture],[txCPF],[txFirstName],[txLastName],[txFullName],[dtBirthDate],[txGenneraCode]FROM [dbFramework].[dbo].[User]";                
  mySqlConnection.query(res,queryd); 
}