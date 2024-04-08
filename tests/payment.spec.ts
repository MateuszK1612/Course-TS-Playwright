import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await page.getByRole('link', { name: 'płatności' }).click();
  });
  test('simple payment', async ({ page }) => {
    //Arrange

    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 3465 3464 3643 6436 34666';
    const transferAmount = '222';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla Jan Nowak`;

    //Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiver.fill(transferReceiver);
    await paymentPage.fromAccountTo.fill(transferAccount);
    await paymentPage.formAmount.fill(transferAmount);
    await paymentPage.buttonMakeTransfer.click();
    await paymentPage.closeButton.click();

    //Assert
    await expect(paymentPage.showMessage).toHaveText(expectedMessage);
  });
});
