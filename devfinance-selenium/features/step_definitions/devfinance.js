const assert = require('assert');
const { Given, When, Then, Before,  BeforeEach , After, AfterEach, AfterAll, BeforeAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');

const driver = new Builder().forBrowser('MicrosoftEdge').build();

const retornaInteiroOrFloat = (text, integer=false) => {
    let textWithDot = text.replace(',', '.')
    let resultCaracters = textWithDot.match(/-|[0-9|.|,]/g)
    if(integer==true){
       return Number.parseInt(resultCaracters.join(''))
    }else{
        return Number.parseFloat(resultCaracters.join(''))
    }        
} 


const convetTextDateToRightFormat = (text) => {
    let dateSplited = text.split("/")
    return dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0]
}

// Implementado para sempre entrar no site antes de um teste
BeforeAll(async function () {
    await driver.get('https://devfinance-agilizei.netlify.app')
});

// Implementado para recarregar a página a cada cenário executado
AfterAll( async function (){
    await driver.quit()
});



// Implementação do Background
Given('Estou no site {}', async function (site) {
    const title = await driver.getTitle()
    assert.strictEqual(title, site);
});


//  ############################################## Cenário ############################################## 
When('Cadastro uma entrada com descricao {}, valor R$ {} e data {}', async function (description, value, date) {
    const sectionButtonNewTransaction = await driver.findElement(By.id('transaction'))
    await sectionButtonNewTransaction.findElement(By.className('button new')).click()

    await driver.findElement(By.id('description')).sendKeys(description)
    await driver.findElement(By.id('amount')).sendKeys(value)
    await driver.findElement(By.id('date')).sendKeys(date)
    
    const divButtonSaveTransaction = await driver.findElement(By.className('input-group actions'))
    const buttons = await divButtonSaveTransaction.findElements(By.tagName('button'))
    await buttons[0].click()
});

Then('O valor total deverá ser R$ {float}', async function (value) {
    let totalValue = await driver.findElement(By.id('totalDisplay')).getText()
    assert.strictEqual(value, retornaInteiroOrFloat(totalValue), 'Era esperado como valor total R$ ' + value + ', mas obtivemos R$' + retornaInteiroOrFloat(totalValue));
});

Then('O valor total de entradas deverá ser R$ {float}', async function (value) {
    let totalValue = await driver.findElement(By.id('incomeDisplay')).getText()
    assert.strictEqual(value, retornaInteiroOrFloat(totalValue), 'Era esperado como valor total das entradas R$ ' + value + ', mas obtivemos R$' + retornaInteiroOrFloat(totalValue));
});

Then('O valor total de saidas deverá ser R$ {float}', async function (value) {
    let totalValue = await driver.findElement(By.id('expenseDisplay')).getText()
    assert.strictEqual(value, retornaInteiroOrFloat(totalValue), 'Era esperado como valor total das saídas R$ ' + value + ', mas obtivemos R$' + retornaInteiroOrFloat(totalValue));
});
  
Then('Deverá existir {int} lancamento\\(s), o ultimo lancamento terá descricao igual a {}, valor R$ {} e data {}', async function (rows, description, value, date) {
    const rowsTable = await driver.findElements(By.css('#data-table tbody tr'))
    const collunslastRow = await driver.findElement(By.css('#data-table tbody tr:last-child'))
                                    .findElements(By.css('td'))
    
    const descriptionLastRow = await collunslastRow[0].getText()
    const valueLastRow = await collunslastRow[1].getText()
    const dateLastRow = await collunslastRow[2].getText()

    assert.strictEqual(rowsTable.length, rows, 'É esperado ' + rows + ' entradas, mas encontramos ' + rowsTable.length)
    assert.strictEqual(descriptionLastRow, description, 'Era esperado que a descrição da ultima entrada fosse igual a ' + description + ', mas encontramos ' + descriptionLastRow)
    assert.strictEqual(retornaInteiroOrFloat(valueLastRow), retornaInteiroOrFloat(value), 'Era esperado que o valor da ultima entrada fosse igual a R$ ' + retornaInteiroOrFloat(value) + ', mas foi encontrado R$ ' + retornaInteiroOrFloat(valueLastRow))
    assert.strictEqual(dateLastRow, date, 'Era esperado que a data da ultima entrada fosse igual a ' + date + ', mas encontramos ' + dateLastRow)
});


//  ############################################## Cenário ############################################## 

Given('Exista {int} entradas', async function (rows) {
    const rowsTable = await driver.findElements(By.css('#data-table tbody tr'))
    assert.strictEqual(rowsTable.length, rows, 'É esperado ' + rows + ' entradas, mas encontramos ' + rowsTable.length)
});

When('Remover a ultima linha', async function () {
    const lastRow = await driver.findElement(By.css('#data-table tr:last-child td img')).click()
});

Then('Deverá restar {int} entrada', async function (rows) {
    const rowsTable = await driver.findElements(By.css('#data-table tbody tr'))
    assert.strictEqual(rowsTable.length, rows, 'É esperado ' + rows + ' entradas, mas encontramos ' + rowsTable.length)
});
