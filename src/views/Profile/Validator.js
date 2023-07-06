export const emailValidator = (email) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,11})+$/.test(email)) {
    return false;
  }
  return true;
};

export const passwordValidator = (password) => {
  if (/([^A-Za-z0-9@#$%_&\.]+)/g.test(password)) {
    return "Password may contain only uppercase (A-Z) letters, lowercase (a-z) letters, numbers (0-9), and special characters of .@#$%_&";
  } else if (!/^(.{8,20}$)/.test(password)) {
    return "Password must be between 8 to 20 characters long.";
  } else if (!/^(?=.*[A-Z])/.test(password)) {
    return "Password must contain at least one uppercase.";
  } else if (!/^(?=.*[a-z])/.test(password)) {
    return "Password must contain at least one lowercase.";
  } else if (!/^(?=.*[0-9])/.test(password)) {
    return "Password must contain at least one digit.";
  } else if (!/^(?=.*[@#$%_&\.])/.test(password)) {
    return "Password must contain special characters from .@#$%_&";
  }
  return false;
};

export const usernameValidator = (username) => {
  if (/([^A-Za-z0-9_\.-]+)/g.test(username)) {
    return "Username may contain letters (A-Za-z), numbers (0-9), and special characters of -._";
  } else if (!/^[A-Za-z]+/.test(username)) {
    return "Username must start with letters (A-Za-z)";
  } else if (/[_\.-]+[_\.-]+/.test(username)) {
    return "Username must not contain adjacent occurrences of -._ ";
  } else if (/[_\.-]+$/.test(username)) {
    return "Username must not end with special characters of -._";
  }
  return false;
};

export const getName = (user) => {
  if (user?.name && user?.lastname) return user?.name + " " + user?.lastname;
  else if (user?.name) return user?.name;
  else return user?.username;
};
