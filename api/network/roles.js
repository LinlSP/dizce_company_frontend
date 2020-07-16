////You pass a parameter (role) and it returns and array with the permissions of that role
function grantAccess(role) {
  const permissions = [
    "ADDFREE",
    "GETFREE",
    "UPDATEFREE",
    "DELETEFREE",
    "ACTIVEUSER",
    "ADDUSER",
    "DELETEUSER",
  ];
  switch (role) {
    case "admin":
      return permissions;
    case "free-admin":
      return permissions.slice(0, 4);
    case "users-admin":
      return permissions.slice(4, 7);
    case "users-active":
      return permissions.slice(4, 5);
    default:
      return permissions.slice(0, 1);
  }
}

module.exports = grantAccess;
