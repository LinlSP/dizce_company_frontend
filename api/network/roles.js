////You pass a parameter (role) and it returns and array with the permissions of that role
function grantAccess(role) {
  switch (role) {
    case "admin":
      return ["LOGIN", "ADDUSER", "CLIENTSTORE", "CLIENTFREE"];
    case "free-admin":
      return ["LOGIN", "CLIENTFREE"];
    default:
      return ["LOGIN"];
  }
}

module.exports = grantAccess;
