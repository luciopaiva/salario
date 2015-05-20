"use strict";

(function (angular) {

    angular.module('salary-app').factory('IRPF', ['TaxBrackets', IRPF]);

    function IRPF(taxBrackets) {

        var
            // http://www.receita.fazenda.gov.br/Aliquotas/ContribFont2012a2015.htm
            table2015 = [
                [0, 0],
                [190398, 0.075],
                [282665, 0.15],
                [375105, 0.225],
                [466468, 0.275]
            ];

        return {
            calculate: taxBrackets.bind(null, table2015)
        };
    }

})(angular);
