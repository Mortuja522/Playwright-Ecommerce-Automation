const registrationLocators = {
    firstName: "//input[@id='input-firstname']",
    lastName: "//input[@id='input-lastname']",
    email: "//input[@id='input-email']",
    telephone: "//input[@id='input-telephone']", 
    password: "//input[@id='input-password']",
    passwordConfirm: "//input[@id='input-confirm']",
    subscribeYes: "//label[normalize-space()='Yes']",
    subscribeNo: "//label[normalize-space()='No']",
    agreeCheckbox: "//label[@for='input-agree']",
    continueButton: "//input[@value='Continue']",
  };
  
  module.exports = { registrationLocators };