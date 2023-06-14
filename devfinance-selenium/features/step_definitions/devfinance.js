const assert = require('assert');
const {Given, When, Then, Before, BeforeAll, AfterAll, After } = require('@cucumber/cucumber');
const DevFinanceHome = require('../Objects/devfinance')
const functionsDevfinance = require('../functions/functionsDevFinance')


BeforeAll(async function(){
    await DevFinanceHome.openPage()
})

AfterAll(async function(){
    await DevFinanceHome.closePage()
})

Before(async function(){
    await DevFinanceHome.refreshPage()
})

Given('Estou no site {}', async function (title) {
    await DevFinanceHome.getPageProperties()
    .then((pageProperties)=>{
        assert.strictEqual(title, pageProperties.title)
    })    
});

Given('Possuo as seguintes entradas cadastradas', async function (dataTable) {
    for(array in dataTable.rawTable){
        await DevFinanceHome.registerEntrance(dataTable.rawTable[array][0], dataTable.rawTable[array][1], dataTable.rawTable[array][2])   
    }
});

When('Cadastro uma entrada com descricao {}, valor R$ {} e data {}', async function (description, value, date) {
    await DevFinanceHome.registerEntrance(description, value, date)    
});

When('remover a ultima entrada', async function () {
    await DevFinanceHome.removeLastEntrance()
});

Then('O total geral deverá ser de R$ {float}', async function (value) {
    const returnTotalValueOf = await DevFinanceHome.returnTotalValueOf()
    assert.strictEqual(value, functionsDevfinance.convertStringNumberTo(returnTotalValueOf.entrance).float(), 
        `Era esperado R$ ${value} como valor total das entradas, mas obtivemos R$ ${functionsDevfinance.convertStringNumberTo(returnTotalValueOf.entrance).float()}`)
});

Then('O total positivo deverá ser de R$ {float}', async function (value) {
    const returnTotalValueOf = await DevFinanceHome.returnTotalValueOf()
    assert.strictEqual(value, functionsDevfinance.convertStringNumberTo(returnTotalValueOf.positiveEntrance).float(), 
        `Era esperado R$ ${value} como valor total das entradas positivas, mas obtivemos R$ ${functionsDevfinance.convertStringNumberTo(returnTotalValueOf.positiveEntrance).float()}`)
});

Then('O total negativo deverá ser de R$ {float}', async function (value) {
    const returnTotalValueOf = await DevFinanceHome.returnTotalValueOf()
    assert.strictEqual(value, functionsDevfinance.convertStringNumberTo(returnTotalValueOf.negativeEntrance).float(), 
        `Era esperado R$ ${value} como valor total das entradas negativas, mas obtivemos R$ ${functionsDevfinance.convertStringNumberTo(returnTotalValueOf.negativeEntrance).float()}`)
});

Then('Deverá existir apenas uma entrada com descricao igual a {}, valor R$ {float} e data {}', async function (description, value, date) {
    const dataOfRows = await DevFinanceHome.returnDataOfTableRows()
    let result = []
    for(data in dataOfRows){
        dataOfRows[data].description == description && dataOfRows[data].value == value && dataOfRows[data].date == date ? result.push(dataOfRows[data]) : ''
    }
    assert.strictEqual(result.length, 1, `Era esperado 1 registros, mas obtivemos ${result.length}`)
});