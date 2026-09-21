import { expect, test } from '@playwright/test'
import { LoginPage } from '@pages/LoginPage'
import { validCredentials, invalidCredentials, inexistUser } from '@fixtures/users'

test.describe('Login Feature Tests', () => {


    test.beforeEach(async ({ page }) => {
        await page.goto('')

    })


    test('Login with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.openLoginForm()

        await loginPage.login(validCredentials.email, validCredentials.password)
        await expect(page).toHaveURL(/account\/account/)
    })


    test('Login with invalid password', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.openLoginForm()

        await loginPage.login(invalidCredentials.email, invalidCredentials.password)
        const rawText = await loginPage.getErrorMessage()
        expect(rawText?.trim()).toContain('No match for E-Mail Address')

    })

    test('Login with non-existent email', async ({ page }) => {

        const loginPage = new LoginPage(page)
        await loginPage.openLoginForm()

        await loginPage.login(inexistUser.email, inexistUser.password)
        const rawText = await loginPage.getErrorMessage()
        expect(rawText?.trim()).toContain('No match for E-Mail Address')

    })
})
