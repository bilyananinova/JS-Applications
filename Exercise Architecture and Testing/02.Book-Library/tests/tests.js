const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables

describe('E2E tests', function () {
    this.timeout(60000)

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

    it('Testing: load books', async () => {
        await page.goto('http://localhost:3000/');
        await page.click('id=loadBooks')
        await page.waitForLoadState('domcontentloaded');

        let table = await page.isVisible('tr');
        expect(await table).to.be.true;
    });

    it('Testing: add book', async () => {
        await page.goto('http://localhost:3000/');

        await page.click('id=loadBooks');
        await page.waitForLoadState('domcontentloaded');

        await page.fill('[placeholder="Title..."]', 'New book');
        await page.fill('[placeholder="Author..."]', 'New author');

        let [request] = await Promise.all([
            page.waitForRequest(request => request.url().includes('jsonstore/collections/books') && request.method() == 'POST'),
            page.click('text=Submit')
        ])

        await page.click('id=loadBooks');
        await page.waitForLoadState('domcontentloaded');

        let postData = JSON.parse(request.postData());
        expect(postData.author).to.equal('New author');
        expect(postData.title).to.equal('New book');

    });

    it('Testing: edit book', async () => {
        await page.goto('http://localhost:3000/');

        await page.click('id=loadBooks')
        await page.waitForLoadState('domcontentloaded');
        await page.click('.editBtn')
        await page.waitForSelector('#editForm');

        await page.fill('#editForm input[name=title]', 'Edit title');
        await page.fill('#editForm input[name=author]', 'Edit author');
        await page.click('text=Save')

        await page.click('id=loadBooks');

        let content = await page.content();
        expect(content).to.contains('Edit title');
        expect(content).to.contains('Edit author');
    });

    it('Testing: delete book', async () => {
        await page.goto('http://localhost:3000/');

        await page.click('id=loadBooks')
        await page.waitForLoadState('domcontentloaded');
        
        page.on('dialog', dialog => { dialog.accept() })
        await page.click('text=Delete')

        await page.click('id=loadBooks')
        await page.waitForLoadState('domcontentloaded');

        let content = await page.content();
        expect(content).to.not.contain('Edit title');
        expect(content).to.not.contain('Edit author');
    });

});
