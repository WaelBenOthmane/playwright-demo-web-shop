import { Locator, Page } from "@playwright/test";

export class ProductPage {

    readonly page: Page;
    readonly searchField: Locator;
    readonly searchButton: Locator;
    readonly productsWrapper: Locator;
    readonly resultMessage: Locator;
    readonly priceProduct: Locator;
    readonly unitePrice: Locator;


    constructor(page: Page) {
        this.page = page;
        this.searchField = page.getByRole('textbox', {
            name: 'search'
        })
        this.searchButton = page.getByRole('button', {
            name: 'Search'
        })
        this.productsWrapper = page.locator('.product-thumb')
        this.resultMessage = page.getByText(/no product/i)

        this.priceProduct = page.locator('.price-new mb-0')
        this.unitePrice = page.locator('h3.price-new.mb-0')


    }


    async search(keyword: string) {
        await this.searchField.fill(keyword)
        await this.searchButton.click()
    }

    async getResultsCount() {
        await this.productsWrapper.first().waitFor({ state: "visible" })

        return this.productsWrapper.count()

    }

    async getFirstProductTitle() {
        return this.productsWrapper.getByRole('heading').nth(2).textContent()
    }

    async getFirstProductPrice() {
        return await this.priceProduct.textContent()
    }

    async getUnitePriceProduct() {
        const priceRaw = await this.unitePrice.textContent()
        const price = Number(priceRaw?.replace("$", ""));
        return price
    }

    async getProductsTitles() {
        return this.productsWrapper.getByRole('heading').allTextContents()
    }

    async openProductSheet() {

        await this.productsWrapper.getByRole('heading').nth(2).click()

    }

    async getResultMessage() {
        return this.resultMessage.textContent()

    }


}