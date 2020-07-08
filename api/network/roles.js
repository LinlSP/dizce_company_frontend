////You pass a parameter (role) and it returns and array with the permissions of that role
module.exports = (role) => {
  var permissions = [];
  const accessTo = () => {
    switch (role) {
      case "admin":
        return ["CLIENTSTORE, CLIENTFREE"];
      case "free-admin":
        return ["CLIENTFREE"];
      default:
        return [];
    }
  };
  permissions.push(...accessTo);
  return permissions;
};
