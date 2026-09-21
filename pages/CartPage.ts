import { Locator, Page } from "@playwright/test";


export class CartPage {

    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly itemCount: Locator;
    readonly viewCart: Locator;
    readonly nameAddedProduct: Locator;
    readonly quantityProduct: Locator;
    readonly updateQuantityButton: Locator;
    readonly successUpdateMessage: Locator;
    readonly totalPrice: Locator;
    readonly checkoutButton: Locator;



    constructor(page: Page) {
        this.page = page
        this.addToCartButton = page.getByRole('button', {
            name: 'Add to Cart'
        })

        this.itemCount = page.locator('span.badge.badge-pill.badge-info.cart-item-total:visible')
        this.viewCart = page.getByRole('link', { name: 'View Cart ' })
        this.nameAddedProduct = page.locator("td[class='text-left'] a")
        this.quantityProduct = page.locator("div.input-group.flex-nowrap input.form-control")
        this.updateQuantityButton = page.locator('.input-group.flex-nowrap').getByRole('button').first()
        this.successUpdateMessage = page.locator('.alert.alert-success.alert-dismissible')
        this.totalPrice = page.locator('tbody tr');
        this.checkoutButton = page.getByRole('link', { name: 'Checkout' })

    }

    async addToCart() {
        await this.addToCartButton.click()
    }


    async gotoCartPage() {
        await this.viewCart.click()
    }

    async modifyQuantity(quantity: string) {
        await this.quantityProduct.fill(quantity)
    }
    async updateQuanity() {
        await this.updateQuantityButton.click()

    }

    async getTotalPrice(productName: string) {

        const totalPriceRaw = this.totalPrice.filter({ hasText: productName })
        const totalPriceCell = totalPriceRaw.getByRole('cell').last()
        const totalPriceText = await totalPriceCell.textContent()

        if (!totalPriceText) return 0;

        const cleanText = totalPriceText.replace('$', '').replace(',', '').trim();

        return parseFloat(cleanText);

    }

    async gotoToCheckoutPage() {
        await this.checkoutButton.click()
    }

}