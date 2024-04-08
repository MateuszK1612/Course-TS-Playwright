import { Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}
  sideMenu = new SideMenuComponent(this.page)

  transferReceiver = this.page.getByTestId('transfer_receiver');
  fromAccountTo = this.page.getByTestId('form_account_to');
  formAmount = this.page.getByTestId('form_amount');
  buttonMakeTransfer = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closeButton = this.page.getByTestId('close-button');
  showMessage = this.page.locator('#show_messages');
}
