import puppeteer from 'puppeteer';
// import { saveAssetFile } from './githubAPIV2';

// import * as fs from 'fs/promises';
// import * as fs2 from 'fs';

async function main() {
  try {
    const browser = await puppeteer.launch({ timeout: 60_000 });
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;', // You can set your preferred languages here
    });


    try {
      await page.goto(`https://end-gfw.com/tweet-page-7`);

      const searchResultSelector = '.max-w-full';
      await page.waitForSelector(searchResultSelector);

      await page.pdf({
        path: 'last7days.pdf',
        width: 1440,
        height: 1200,
      });

      // const yesterdayPDF = await fs.readFile('test.pdf');
      // const fileSize = fs2.statSync('test.pdf').size;

      // const base64String = yesterdayPDF.toString('base64');

      // await saveAssetFile(
      //   base64String,
      //   'resource',
      //   162922055,
      //   'test.pdf',
      //   fileSize
      // );
    } catch (err) {
      console.log(`Error gen last 7 days pdf: `, err);
    }

    await browser.close();
  } catch (err) {
    console.log('Main error: ', err);
  }
}

main();
