// const { chromium } = require('playwright-chromium');
// (async () => {
//     // const browser = await chromium.launch();
//     const browser = await chromium.launch({ headless: false, slowMo: 2000 });
//     const page = await browser.newPage();
//     await page.goto('https://google.com/');
//     await page.screenshot({ path: `example.png` });
//     await browser.close();
// })();


const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


let browser, page; // Declare reusable variables


describe('E2E tests', async function () {

    this.timeout(5000);

    before(async () => { browser = await chromium.launch({ headless:false, slowMo: 350}); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });


    it('loads article title correctly', async () => {

        await page.goto('http://localhost:5500');
        // await page.screenshot({ path: 'page.png' });
        // we have to await for everything to load
        await page.waitForSelector('.accordion div.head>span');

        const content = await page.textContent('#main');

        expect(content).to.contain('Scalable Vector Graphics');
        expect(content).to.contain('Open standard');
        expect(content).to.contain('Unix');
        expect(content).to.contain('ALGOL');

    })

    it('has working MORE button', async () => {

        await page.goto('http://localhost:5500');

        // we do not have to wait here, since click is waiting by default for the button to load.
        await page.click('text=More');
        await page.waitForSelector('.extra p');

        const text = await page.textContent('.extra p');
        const visible = await page.isVisible('.extra p')

        expect(text).to.contain('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based')
        expect(visible).to.be.true;

    });

    it('has working LESS button', async () => {

        await page.goto('http://localhost:5500');

        await page.click('text=More');
        await page.waitForSelector('.extra p');

        // we have to do this test again, since it could never be shown and the hide functionality will be a 
        // false positive
        let visible = await page.isVisible('.extra p')
        expect(visible).to.be.true;

        await page.click('text=Less');
        visible = await page.isVisible('.extra p')
        expect(visible).to.be.false;

    });

});
