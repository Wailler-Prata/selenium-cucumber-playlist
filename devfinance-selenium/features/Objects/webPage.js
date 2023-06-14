const { Builder, WebStorage} = require('selenium-webdriver');

module.exports = class WebPage{
    
    constructor(url){
        this.url = url
    }
    driver = new Builder().forBrowser('MicrosoftEdge').build();
    

    async openPage(){
        await this.driver.get(this.url)
    }

    async refreshPage(){
        await this.driver.executeScript("window.localStorage.clear()")
        await this.driver.navigate().refresh()
    }

    async getPageProperties(){
        return {
            title: await this.driver.getTitle()
        }
    }
    
    async findElement(element){
        return await this.driver.findElement(element)
    }

    async findElements(element){
        return await this.driver.findElements(element)
    }

    async closePage(){        
        await this.driver.close()
    }

    async quitWebDriver(){
        await this.driver.quit()
    }
}