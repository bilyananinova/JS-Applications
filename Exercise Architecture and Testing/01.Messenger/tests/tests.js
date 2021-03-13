const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables

describe('E2E tests', function () {
    this.timeout(120000)

    before(async () => {
        browser = await chromium.launch({ headless: false, slowMo: 1500 });
        // browser = await chromium.launch();
    });
    after(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });

    it('Testing: load messages', async () => {
        await page.goto('http://localhost:3000/');
        await page.click('text=Refresh');
        await page.waitForSelector('#messages');

        let content = 'Spami: Hello, are you there?';
        expect(content).to.contains('Spami: Hello, are you there?')

    });

    it('Testing: send message', async () => {
        await page.goto('http://localhost:3000/');

        await page.fill('id=author', 'George');
        await page.fill('id=content', 'Hello');
        
        let [request] = await Promise.all([
            page.waitForRequest(request => request.url().includes('jsonstore/messenger') && request.method() == 'POST'),
            page.click('id=submit')
        ])

        let postData = JSON.parse(request.postData())
        console.log(postData);
        expect(postData.author).to.equal('George')
        expect(postData.content).to.equal('Hello')

    });

});
