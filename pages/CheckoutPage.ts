import { Locator, Page } from "@playwright/test";


export class CheckoutPage {

    readonly existingAdress: Locator;
    readonly deleviveryAdress: Locator;
    readonly paymentMethod: Locator;
    readonly shippingMethod: Locator;
    readonly termsConditionsCheckbox: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {

        this.existingAdress = page.locator('label[for="input-payment-address-existing"]')
        this.deleviveryAdress = page.locator('label[for="input-shipping-address-same"]')
        this.paymentMethod = page.locator('label[for="input-payment-method-cod"]')
        this.shippingMethod = page.locator('label[for="input-shipping-method-flat.flat"]')
        this.termsConditionsCheckbox = page.locator('label[for="input-agree"]')
        this.continueButton = page.getByRole('button', { name: 'Continue' })


    }

    async selectExistingAdress() {
        await this.existingAdress.check()
    }

    async selectDeliveryBillingAdress() {
        await this.deleviveryAdress.check()
    }

    async selectPaymentMethod() {
        await this.paymentMethod.check()
    }

    async selectshippingMethod() {
        await this.shippingMethod.check()
    }

    async selectTermsConditions() {
        await this.termsConditionsCheckbox.check()
    }

    async clickOnContinue() {
        await this.continueButton.click()
    }






}