const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

const serviceBuilder = new chrome.ServiceBuilder(path.join(__dirname, '../../chromedriver'));

async function example() {
  let driver;
  try {
    driver = await new Builder()
      .forBrowser(Browser.CHROME)
      .setChromeService(serviceBuilder)
      .build();
    await driver.get('https://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 3000);
  } catch (error) {
    console.error('测试执行出错:', error);
  } finally {
    await driver.quit();
  }
}

example();
