const resourceMessenger = {
  msg: {
    err: {
      notExistAccount:
          "Sorry, we couldn't find an account with this email address. Please try again or create a new account.",
      wrongPassword: "Incorrect account or password. Please try again.",
      notExistUser: "User does not exist.",
      generalUserMsg: "An error has occurred, please contact us for assistance.",
      emailErrMsg: "Invalid email format, please try again.",
      emailEmptyMsg: "You have not entered your email.",
      passEmptyMsg: "You have not entered your password.",
      emailExist: "Email already exists, please use a different email.",
      passNotDuplicatedMsg: "Invalid password.",
      fileNotFound: "Error: File not found.",
      generalEmpty: "Empty.",
      notFound: "(id): Not found",
      missingInfo: "Missing information.",
      duplicated1vs1: "Duplicated 1vs1.",
      dateErrMsg: "Please enter a valid date of birth (MM/DD/YYYY).",
      nameMsg: "Name contains non-numeric characters.",
    },
    success: {
      register: "Registration successful.",
      login: "Login successful.",
      logout: "Logged out.",
      updateInfo: "Information updated successfully.",
      updatePrivacy: "User privacy information updated successfully.",
      uploadFile: "File uploaded successfully.",
      messageCreate: "Message sent successfully.",
      removeMessage: "Message deleted.",
    },
  },

  regex: {
    email:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },

  number: {
    defaultMsg: 20,
    defaultConversation: 15,
    defaultUser: 20,
  },
};

module.exports = resourceMessenger;
