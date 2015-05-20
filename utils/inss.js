"use strict";

(function (angular) {

    angular.module('salary-app').factory('INSS', [INSS]);

    function INSS() {
        /**
         * Tabela do INSS para 2015.
         * A posição 0 é um limiar em centavos de reais e a posição 1 é o percentual a ser aplicado.
         * 
         * http://agencia.previdencia.gov.br/e-aps/servico/147
         **/
        var inssTable = [
            [139912, .08],
            [233188, .09],
            [466375, .11]
        ];

        // Teto a partir do qual a contribuição chega num limite.
        var ceiling = inssTable[inssTable.length - 1][0] * inssTable[inssTable.length - 1][1];
        var individual = Math.round(.20 * inssTable[inssTable.length - 1][0]);

        /**
         * Calcula a contribuição devida ao INSS (em centavos de reais) para um determinado salário passado como parâmetro.
         **/
        function inss(value) {
            var
                result = ceiling;

            inssTable.some(function (thres) {
                if (value < thres[0]) {
                    result = thres[1] * value;
                    return true;
                }
                return false;
            });
            /*
             table.forEach(function (thres) {
             if (value < thres[0]) {
             return thres[1] * value;
             }
             });
             */

            return Math.round(result);
        }

        /**
         * Retorna a contribuição devida ao INSS (em centavos de reais) para um contribuinte individual.
         **/
        function inssIndividual() {
            return individual;
        }

        return {
            calculate: inss
        };
    }

})(angular);
