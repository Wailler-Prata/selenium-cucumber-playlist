const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const driver = new Builder().forBrowser('MicrosoftEdge').build();

class DevFinanceHome{

    constructor(){
        global.driver = driver
        driver.get('https://devfinance-agilizei.netlify.app')
    }

    // Page Locators
    cssSelectorCardTotalValueEntrance = '#totalDisplay'
    cssselectorCardTotalValueNegativeEntrance = '#expenseDisplay'
    cssSelectorCardTotalPositiveValueEntrance = '#incomeDisplay'
    cssSelectorRegisterEntranceButton = '#transaction a[class="button new"]'
    cssSelectorDescriptionOfEntranceInRegisterFildset = '#description'
    cssSelectorAmountOfEntranceInRegisterFildset = '#amount'
    cssSelectorDateOfEntranceInRegisterFildset = '#date'
    cssSelectorSaveEntranceButton = 'div.input-group.actions > button'

    async registerEntrance(description, amount, date){
        await driver.findElement(By.css(this.cssSelectorSaveEntranceButton)).click()
        await driver.findElement(By.css(this.cssSelectorDescriptionOfEntranceInRegisterFildset)).sendKeys(description)
        await driver.findElement(By.css(this.cssSelectorAmountOfEntranceInRegisterFildset)).sendKeys(amount)
        await driver.findElement(By.css(this.cssSelectorDateOfEntranceInRegisterFildset)).sendKeys(date)
        await driver.findElement(By.css(this.cssSelectorSaveEntranceButton)).click()
    }
}

module.exports = DevFinanceHome