Feature: Teste da pagina DevFinance

    Background:
       Given Estou no site dev.finance$

    Scenario: Cadastrar transacao
        When Cadastro uma entrada com descricao <descricao>, valor R$ <valor> e data <data>
        Then O valor total deverá ser R$ <valorTotal>
        And O valor total de entradas deverá ser R$ <valorTotalEntrada>
        And O valor total de saidas deverá ser R$ <valorTotalSaida>
        And Deverá existir <qtdRows> lancamento(s), o ultimo lancamento terá descricao igual a <descricao>, valor R$ <valor> e data <data> 
    
        Examples:
        |  descricao       | valor |   data     | valorTotalEntrada | valorTotalSaida | valorTotal | qtdRows |
        | Entrada positiva | 10.63 | 01/03/2023 | 10.63             | 0.00            | 10.63      | 1       |
        | Entrada negativa | -9    | 03/04/2023 | 10.63             | -9              | 1.63       | 2       |

    Scenario: Contagem de linhas
        Given Exista 2 entradas
        When Remover a ultima linha
        Then Deverá restar 1 entrada
        And O valor total deverá ser R$ 10.63