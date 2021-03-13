const { chromium } = require('playwright-chromium');
const { expect } = require('chai');
let browser, page; // Declare reusable variables
describe('E2E tests', function () {
    this.timeout(6000)

    before(async () => {
        // browser = await chromium.launch({ headless: false, slowMo: 500 });
        browser = await chromium.launch();
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

    it('loads static page', async () => {
        await page.goto('http://localhost:3000/');

        let content = await page.content();
        expect(content).to.contains('Scalable Vector Graphics')
        expect(content).to.contains('Open standard')
        expect(content).to.contains('Unix')
        expect(content).to.contains('ALGOL')
    });

    it('loads static page', async () => {
        await page.goto('http://localhost:3000/');

        let content = await page.textContent('.accordion .head span');
        expect(content).to.contains('Scalable Vector Graphics')
    });

    it('loads static page', async () => {
        await page.goto('http://localhost:3000/');

        let titles = await page.$$eval('.accordion .head span', (spans) => 
           spans.map(span => span.textContent)
        )

        expect(titles).to.includes('Scalable Vector Graphics')
        expect(titles).to.includes('Open standard')
        expect(titles).to.includes('Unix')
        expect(titles).to.includes('ALGOL')
    });

    it('toggles content', async () => {
        await page.goto('http://localhost:3000/');

        await page.click('text=More');

        await page.waitForSelector('.extra p');

        let visible = await page.isVisible('.extra p');
        expect(visible).to.be.true;
    });

    it('toggles content', async () => {
        await page.goto('http://localhost:3000/');

        await page.click('#main>.accordion:first-child >> text=More');

        await page.waitForSelector('#main >> .accordion:first-child >> .extra p');

        let visible = await page.isVisible('.extra p');
        expect(visible).to.be.true;
    });

    it('hide it', async () => {
        await page.goto('http://localhost:3000/');

        await page.click('#main>.accordion:first-child >> text=More');
        await page.waitForSelector('#main >> .accordion:first-child >> .extra p');

        await page.click('#main>.accordion:first-child >> text=Less');

        let visible = await page.isVisible('.extra p');
        expect(visible).to.be.false;
    });

});
