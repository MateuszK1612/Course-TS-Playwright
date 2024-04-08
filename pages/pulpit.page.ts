import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiver = this.page.locator('#widget_1_transfer_receiver');
  transferAmount = this.page.locator('#widget_1_transfer_amount');
  transferTitle = this.page.locator('#widget_1_transfer_title');
  transferButton = this.page.getByRole('button', { name: 'wykonaj' });
  closeButton = this.page.getByTestId('close-button');
  showMessage = this.page.locator('#show_messages');

  topupReceiver = this.page.locator('#widget_1_topup_receiver');
  topupAmount = this.page.locator('#widget_1_topup_amount');
  topupAgreement = this.page.locator('#uniform-widget_1_topup_agreement span');
  topupButton = this.page.getByRole('button', { name: 'doładuj telefon' });
  moneyValue = this.page.locator('#money_value');

  async executeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string
  ): Promise<void> {
    await this.transferReceiver.selectOption(receiverId);
    await this.transferAmount.fill(transferAmount);
    await this.transferTitle.fill(transferTitle);
    await this.transferButton.click();
    await this.closeButton.click();
  }

  async executeMobileTopUp(
    topUpReceiver: string,
    topUpAmount: string
  ): Promise<void> {
    await this.topupReceiver.selectOption(topUpReceiver);
    await this.topupAmount.fill(topUpAmount);
    await this.topupAgreement.click();
    await this.topupButton.click();
    await this.closeButton.click();
  }
}
