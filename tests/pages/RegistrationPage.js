const { expect } = require('@playwright/test');
const { registrationLocators } = require('../locators/locators');
const { scrollToElement } = require('../utils/scroll_utils');

class RegistrationPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToRegistration() {
    await this.page.goto('/index.php?route=account/register'); // Use a relative URL
  }  

  async fillPersonalDetails(firstName, lastName, email, telephone) {
    await this.page.fill(registrationLocators.firstName, firstName);
    await this.page.fill(registrationLocators.lastName, lastName);
    await this.page.fill(registrationLocators.email, email);
    await this.page.fill(registrationLocators.telephone, telephone);
  }

  async setPassword(password, confirmPassword) {
    await this.page.fill(registrationLocators.password, password);
    await this.page.fill(registrationLocators.passwordConfirm, confirmPassword);

    // Scroll down to the next section after setting the password
    await scrollToElement(this.page, registrationLocators.subscribeYes); // Scroll to subscription options or next section
  }

  async chooseSubscription(subscribe = false) {
    const locator = subscribe ? registrationLocators.subscribeYes : registrationLocators.subscribeNo;
    await this.page.check(locator);
  }

  async agreeToTerms() {
  await this.page.check(registrationLocators.agreeCheckbox);
   
  }

  async submitForm() {
    await this.page.click(registrationLocators.continueButton);
  }

  async verifyRegistrationSuccess() {
    await expect(this.page.locator('h1')).toContainText('Your Account Has Been Created!');
  }
}

module.exports = { RegistrationPage };
