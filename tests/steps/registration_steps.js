// const { Given, When, Then } = require('@cucumber/cucumber');
// const { RegistrationPage } = require('../pages/RegistrationPage');
// const registrationData = require('../data/registrationData.json');

// let registrationPage;

// Given('a user is on the registration page', async function ({ page }) {
//   registrationPage = new RegistrationPage(page);
//   await registrationPage.navigateToRegistration();
// });

// When('the user fills the registration form with valid data', async function () {
//   const user = registrationData.validUser;
//   await registrationPage.fillPersonalDetails(user.firstName, user.lastName, user.email, user.telephone);
//   await registrationPage.setPassword(user.password, user.password);
//   await registrationPage.chooseSubscription(user.subscribe);
//   await registrationPage.agreeToTerms();
// });

// When('submits the form', async function () {
//   await registrationPage.submitForm();
// });

// Then('the user should see a success message', async function () {
//   await registrationPage.verifyRegistrationSuccess();
// });


const { Given, When, Then } = require('@cucumber/cucumber');
const { RegistrationPage } = require('../pages/RegistrationPage');
const registrationData = require('../data/registrationData.json');

let registrationPage;

Given('a user is on the registration page', async function ({ page }) {
  registrationPage = new RegistrationPage(page);
  await registrationPage.navigateToRegistration();
});

When('the user fills the registration form with valid data', async function () {
  const user = registrationData.validUser;
  await registrationPage.fillPersonalDetails(user.firstName, user.lastName, user.email, user.telephone);
  await registrationPage.setPassword(user.password, user.password);
  await registrationPage.chooseSubscription(user.subscribe);
  await registrationPage.agreeToTerms();
});

When('submits the form', async function () {
  await registrationPage.submitForm();
});

Then('the user should see a success message', async function () {
  await registrationPage.verifyRegistrationSuccess();
});



