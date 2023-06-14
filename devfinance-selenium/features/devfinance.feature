Feature: Teste de cadastro de entradas na pagina DevFinance

    Background:
       Given Estou no site dev.finance$

    Scenario: Cadastrar Entrada positiva
        When Cadastro uma entrada com descricao <descricao>, valor R$ <valor> e data <data>
        Then O total geral deverá ser de R$ <valor>
        And O total positivo deverá ser de R$ <valorTotalEntradaPositiva>
        And O total negativo deverá ser de R$ <valorTotalEntradaNegativo>
        And Deverá existir apenas uma entrada com descricao igual a <descricao>, valor R$ <valor> e data <data> 
            
        Examples:
        |  descricao       | valor |   data     | valorTotalEntradaPositiva | valorTotalEntradaNegativo |
        | Entrada positiva | 10.63 | 01/03/2023 | 10.63                     | 0.00                      |

    
    Scenario: Cadastrar Entrada negativa
        When Cadastro uma entrada com descricao <descricao>, valor R$ <valor> e data <data>
        Then O total geral deverá ser de R$ <valor>
        And O total positivo deverá ser de R$ <valorTotalEntradaPositiva>
        And O total negativo deverá ser de R$ <valorTotalEntradaNegativo>
        And Deverá existir apenas uma entrada com descricao igual a <descricao>, valor R$ <valor> e data <data> 
            
        Examples:
        |  descricao       | valor |   data     | valorTotalEntradaPositiva | valorTotalEntradaNegativo |
        | Entrada negativa | -9    | 03/04/2023 | 0.00                      | -9                        |
        
    
    Scenario: Validaçao dos totais com multiplas entradas
        And Possuo as seguintes entradas cadastradas
            | Entrada positiva | 10.63 | 01/03/2023 |
            | Entrada negativa | -9    | 03/04/2023 |
        Then O total geral deverá ser de R$ 1.63
        And O total negativo deverá ser de R$ -9
        And O total positivo deverá ser de R$ 10.63


    Scenario: Remoção de entradas
        And Possuo as seguintes entradas cadastradas
            | Entrada positiva | 10.63 | 01/03/2023 |
            | Entrada negativa | -9    | 03/04/2023 |
        When remover a ultima entrada
        Then O total geral deverá ser de R$ 10.63
        And O total negativo deverá ser de R$ 0.00
        And O total positivo deverá ser de R$ 10.63
        And Deverá existir apenas uma entrada com descricao igual a Entrada positiva, valor R$ 10.63 e data 01/03/2023