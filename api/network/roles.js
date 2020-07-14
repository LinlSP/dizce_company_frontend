////You pass a parameter (role) and it returns and array with the permissions of that role
function grantAccess(role) {
  const availableRoles = ["LOGIN", "ADDFREE", "ADDUSER"];
  switch (role) {
    case "admin":
      return availableRoles;
    case "free-admin":
      return availableRoles(0, 2);
    default:
      return availableRoles(0, 1);
  }
}

module.exports = grantAccess;
