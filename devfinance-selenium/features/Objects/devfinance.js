const {By} = require('selenium-webdriver');
const Webpage = require('./webPage')
const functionsDevfinance = require('../functions/functionsDevFinance')

class DevFinanceHome extends Webpage{
    constructor(url){
        super(url)
    }
    
    // Page Locators
    cssSelectorCardTotalValueEntrance = By.css('#totalDisplay')
    cssSelectorCardTotalValueNegativeEntrance = By.css('#expenseDisplay')
    cssSelectorCardTotalPositiveValueEntrance = By.css('#incomeDisplay')
    cssSelectorRegisterEntranceButton = By.css('#transaction a[class="button new"]')
    cssSelectorDescriptionOfEntranceInRegisterFildset = By.css('#description')
    cssSelectorAmountOfEntranceInRegisterFildset = By.css('#amount')
    cssSelectorDateOfEntranceInRegisterFildset = By.css('#date')
    cssSelectorSaveEntranceButton = By.css('div.input-group.actions > button')
    xpathRowsOfEntranceTable = By.xpath('//*[@id="data-table"]/tbody/tr')

    async returnQtdRowsOfEntranceTable(){
        return (await this.findElements(this.xpathRowsOfEntranceTable)).length
    }

    async registerEntrance(description, amount, date){        
        await this.findElement(this.cssSelectorRegisterEntranceButton)
            .then(element=>{ element.click()})
        await this.findElement(this.cssSelectorDescriptionOfEntranceInRegisterFildset)
            .then(element=>{ element.sendKeys(description)})
        await this.findElement(this.cssSelectorAmountOfEntranceInRegisterFildset)
            .then(element=>{ element.sendKeys(amount)})
        await this.findElement(this.cssSelectorDateOfEntranceInRegisterFildset)
            .then(element=>{ element.sendKeys(date)})
        await this.findElement(this.cssSelectorSaveEntranceButton)
            .then(element=>{ element.click()})
    }

    async removeLastEntrance(){
        await (await this.findElement(By.css('#data-table > tbody > tr:nth-child(' + await this.returnQtdRowsOfEntranceTable() + ') img'))).click()
    }

    async returnTotalValueOf(){
        return {
            entrance : await (await this.findElement(this.cssSelectorCardTotalValueEntrance)).getText(),
            positiveEntrance: await (await this.findElement(this.cssSelectorCardTotalPositiveValueEntrance)).getText(),
            negativeEntrance: await (await this.findElement(this.cssSelectorCardTotalValueNegativeEntrance)).getText()
        }
    }

    async returnDataOfTableRows(){
        let numberOfRows = await this.returnQtdRowsOfEntranceTable()
        let arrayEntrances = []
        while (numberOfRows > 0) {
            let entrance = {}
            entrance.description  = await (await this.findElement(By.xpath('//*[@id="data-table"]/tbody/tr['+ numberOfRows +']/td[1]'))).getText()
            entrance.value = functionsDevfinance.convertStringNumberTo(
                    await (await this.findElement(By.xpath('//*[@id="data-table"]/tbody/tr['+ numberOfRows +']/td[2]'))).getText()
                ).float()
            entrance.date = await (await this.findElement(By.xpath('//*[@id="data-table"]/tbody/tr['+ numberOfRows +']/td[3]'))).getText()

            arrayEntrances.push(entrance)
            numberOfRows -= 1
        }
        return arrayEntrances
    }
}
module.exports = new DevFinanceHome('https://devfinance-agilizei.netlify.app')