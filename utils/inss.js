"use strict";

(function (angular) {

    angular.module('salary-app').factory('INSS', [INSS]);

    function INSS() {
        /**
         * Tabela do INSS para 2014.
         * A posição 0 é um limiar em centavos de reais e a posição 1 é o percentual a ser aplicado.
         **/
        var inssTable2014 = [
            [131707, .08],
            [219512, .09],
            [439024, .11]
        ];

        // Teto a partir do qual a contribuição chega num limite.
        var ceiling = inssTable2014[inssTable2014.length - 1][0] * inssTable2014[inssTable2014.length - 1][1];
        var individual = Math.round(.20 * inssTable2014[inssTable2014.length - 1][0]);

        /**
         * Calcula a contribuição devida ao INSS (em centavos de reais) para um determinado salário passado como parâmetro.
         **/
        function inss2014(value) {
            var
                result = ceiling;

            inssTable2014.some(function (thres) {
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
        function inss2014individual() {
            return individual;
        }

        return {
            calculate: inss2014
        };
    }

})(angular);
