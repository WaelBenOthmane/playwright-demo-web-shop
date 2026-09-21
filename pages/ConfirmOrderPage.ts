import { Locator, Page } from "@playwright/test";


export class ConfirmOrderPage {

    readonly confirmOrderButton: Locator;
    readonly orderMessage: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {

        this.confirmOrderButton = page.locator('#button-confirm')
        this.orderMessage = page.locator('#common-success').getByRole('heading')
        this.continueButton = page.getByRole('link', { name: 'Continue' })

    }

    async getOrderMessage() {
        return await this.orderMessage.textContent()
    }

    async clickOnConfirmOrder() {
        await this.confirmOrderButton.click()
    }






}