export const matchRoles = (roles: string[], role: string): boolean => {
  let result = false;
  roles.forEach((elem) => {
    if (elem === role) {
      result = true;
    }
  });

  return result;
};
