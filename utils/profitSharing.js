"use strict";

(function (angular) {

    angular.module('salary-app').factory('ProfitSharing', ['TaxBrackets', ProfitSharing]);

    function ProfitSharing(taxBrackets) {

        var
            // http://www.receita.fazenda.gov.br/Aliquotas/ContribFont2012a2015.htm
            table2015 = [
                [0, 0],
                [627001, 0.075],
                [940501, 0.15],
                [1254001, 0.225],
                [1567501, 0.275]
            ];

        return {
            calculate: taxBrackets.bind(null, table2015)
        };
    }

})(angular);
