const { test, expect } = require('@playwright/test');
const { RegistrationPage } = require('../pages/RegistrationPage');
const registrationData = require('../data/registrationData.json');
const { generateReportPDF } = require('../utils/reportHandler');

test.describe('Registration Flow', () => {
  test('should register a new user successfully', async ({ page }) => {
    test.setTimeout(60000);
    const registrationPage = new RegistrationPage(page);
    const user = registrationData.validUser;

    // Report variables
    let result = 'Test started...';
    let additionalInfo = '';

    try {
      // Start registration flow
      await registrationPage.navigateToRegistration();
      await registrationPage.fillPersonalDetails(user.firstName, user.lastName, user.email, user.telephone);
      await registrationPage.setPassword(user.password, user.password);
      await registrationPage.chooseSubscription(user.subscribe);
      await registrationPage.agreeToTerms();
      await registrationPage.submitForm();

      // Verify registration success
      const successMessage = await page.locator('h1');
      await successMessage.waitFor({ timeout: 10000 }); // Wait for up to 10 seconds
      await expect(successMessage).toContainText('Your Account Has Been Created!'); // Assertion

      // If successful, update the result
      result = 'Registration completed successfully!';
      additionalInfo = `User: ${user.firstName} ${user.lastName} (${user.email}) has been successfully registered.`;

    } catch (error) {
      // If an error occurs, update the result and additional info
      result = 'Test failed!';
      additionalInfo = `Error: ${error.message}`;
    }

    // Generate the PDF report after test completion
    const pdfPath = await generateReportPDF('RegistrationFlow', result, additionalInfo);

    console.log(`Test report generated at: ${pdfPath}`);
  });
});
