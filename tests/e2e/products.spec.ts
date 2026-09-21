import { expect, test } from '@fixtures/authenticatedPage'
import { ProductPage } from '@pages/ProductPage'
import { LoginPage } from '@pages/LoginPage'
import { validCredentials } from '@fixtures/users'
import { keywordsProduct } from '@fixtures/keywords'

test.describe('Products feature tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('')
    })

    test('Search exist product', async ({ authenticatedPage }) => {
      
        const productPage = new ProductPage(authenticatedPage)

       
        await productPage.search(keywordsProduct.existKeyword)

        const numberProducts = await productPage.getResultsCount()
        expect(numberProducts).toBeGreaterThan(0)

        const productsTitles = await productPage.getProductsTitles()
        expect(productsTitles.some(t => t.includes(keywordsProduct.existKeyword))).toBeTruthy()

    })

    test('Search inexist product', async ({ authenticatedPage }) => {

        const productPage = new ProductPage(authenticatedPage)


        await productPage.search(keywordsProduct.inexistKeyword)

        const resultMessage = await productPage.getResultMessage()
        expect(resultMessage).toContain('no product')

    })

    test('Navigate to exist product', async ({ authenticatedPage }) => {

        const productPage = new ProductPage(authenticatedPage)


        await productPage.search(keywordsProduct.existKeyword)
        const productName = await productPage.getFirstProductTitle()

        await productPage.openProductSheet()
        await expect(authenticatedPage).toHaveTitle(productName!)

    })


})