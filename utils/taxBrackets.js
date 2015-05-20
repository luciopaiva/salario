"use strict";

(function (angular) {

    angular.module('salary-app').factory('TaxBrackets', [TaxBrackets]);

    function TaxBrackets() {

        var
            POS_FLOOR = 0,
            POS_PERC = 1;

        /**
         * @param table the table to be used for calculation
         * @param base the base value that will be taxed
         */
        function brackets(table, base) {
            var
                i,
                values = Array(table.length),
                remaining = base,
                floor, perc;

            for (i = table.length-1; i >= 0; i--) {
                floor = table[i][POS_FLOOR];
                if (remaining <= floor) {
                    values[i] = 0;
                } else {
                    perc = table[i][POS_PERC];
                    values[i] = Math.round((remaining - floor) * perc);
                    remaining = floor;
                }
            }

            return values;
        }

        return brackets;
    }

})(angular);
