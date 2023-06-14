
const functionsDevfinance = {
    convertStringNumberTo(number){
        const resultCaracters = number.replace(',', '.').match(/-|[0-9|.|,]/g).join('') 
        return {
            float(){ return Number.parseFloat(resultCaracters) },
            integer(){ return Number.parseInt(resultCaracters) }
        }                
    },
    convetTextDateToRightFormatForBrowser(text){
        const dateSplited = text.split("/")
        return dateSplited[2] + '-' + dateSplited[1] + '-' + dateSplited[0]
    }
}
module.exports = functionsDevfinance