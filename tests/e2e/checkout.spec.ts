import { expect, test } from '@fixtures/authenticatedPage'
import { keywordsProduct } from '@fixtures/keywords'
import { ProductPage } from '@pages/ProductPage'
import { CartPage } from '@pages/CartPage'
import { CheckoutPage } from '@pages/CheckoutPage'
import { ConfirmOrderPage } from '@pages/ConfirmOrderPage'


test.describe('Checkout feature', () => {

    let cartPage: CartPage;
    let productPage: ProductPage;
    let checkoutPage: CheckoutPage;
    let productName: string;
    let priceProduct: number;
    let confirmOrderPage: ConfirmOrderPage;

    test.beforeEach(async ({ authenticatedPage }) => {

        cartPage = new CartPage(authenticatedPage)

        productPage = new ProductPage(authenticatedPage)

        checkoutPage = new CheckoutPage(authenticatedPage)

        confirmOrderPage = new ConfirmOrderPage(authenticatedPage)

        await productPage.search(keywordsProduct.existKeyword)
        productName = (await productPage.getFirstProductTitle())!

        await productPage.openProductSheet()

        priceProduct = await productPage.getUnitPriceProduct()

        await cartPage.addToCart()
        await cartPage.gotoCartPage()



    })

    test('Add product to cart', async () => {

        await expect(cartPage.itemCount).toHaveText("1")
        await expect(cartPage.nameAddedProduct).toHaveText(productName!)
        await expect(cartPage.quantityProduct).toHaveValue("1")

    })


    test('Modify product quantity', async () => {


        await cartPage.modifyQuantity("2")
        await cartPage.updateQuanity()
        await expect(cartPage.successUpdateMessage).toContainText('Success')
        await expect.poll(async () => await cartPage.getTotalPrice(productName)).toBe(priceProduct * 2)


    })

    test('Checkout Product flow ', async () => {

        await cartPage.gotoToCheckoutPage()
        await checkoutPage.selectExistingAdress()
        await checkoutPage.selectDeliveryBillingAdress()
        await checkoutPage.selectPaymentMethod()
        await checkoutPage.selectshippingMethod()
        await checkoutPage.selectTermsConditions()
        await checkoutPage.clickOnContinue()

        await confirmOrderPage.clickOnConfirmOrder()

        const orderMessage = await confirmOrderPage.getOrderMessage()

        expect(orderMessage).toContain('Your order has been placed')

        await confirmOrderPage.continueButton.click()



    })



})