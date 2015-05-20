"use strict";

(function (angular) {

    angular.module('salary-app').factory('MinimumWage', function () {

        // http://www.guiatrabalhista.com.br/guia/salario_minimo.htm
        return {
            get: function () { return 78800; }
        };
    });

})(angular);
