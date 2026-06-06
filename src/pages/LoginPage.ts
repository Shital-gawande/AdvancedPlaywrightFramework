import { Page,Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    static readonly PATH = '/playwright/ttacart/index.html';

    private readonly userName :Locator;
    private readonly password :Locator;
    private readonly loginButton : Locator;
    private readonly errorMsg: Locator;
    private readonly securityHint: Locator;

    constructor(page: Page) {
        super(page, 'LoginPage');
        this.userName = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMsg = page.locator('[data-test="error"]');
        this.securityHint = page.locator('.login-hint');
    }
     async open(): Promise<void> {
        await this.goto(LoginPage.PATH);}

     async loginAs(username: string, password: string): Promise<void> {
        this.log.info(`loginAs ${username}`);
        await this.el.fill(this.userName, username);
        await this.el.fill(this.password, password);
        await this.el.click(this.loginButton);
    }
}