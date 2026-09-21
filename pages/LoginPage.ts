import { Locator, Page } from "@playwright/test";


export class LoginPage {

    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly btnLogin: Locator;
    readonly errorMessage: Locator;
    readonly myAccountBtn: Locator;
    readonly loginMenuBtn: Locator;


    constructor(page: Page) {
        this.page = page;
        this.email = page.getByPlaceholder('E-Mail Address');
        this.password = page.getByPlaceholder('Password');
        this.btnLogin = page.getByRole('button', {
            name: 'Login'
        })
        this.errorMessage = page.locator('.alert.alert-danger.alert-dismissible');
        this.myAccountBtn = page.getByRole('button', {
            name: ' My account'
        })

        this.loginMenuBtn = page.getByRole('link', { name: 'Login',exact:true })

    }

    async openLoginForm() {

        await this.myAccountBtn.hover();
        await this.loginMenuBtn.click()

    }

    async login(email: string, password: string) {

        await this.email.fill(email)
        await this.password.fill(password)
        await this.btnLogin.click()

    }


    async getErrorMessage() {

        return this.errorMessage.textContent()
    }

}