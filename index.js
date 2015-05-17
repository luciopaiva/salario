"use strict";

(function(angular) {
    var
        app = angular.module('salary-app', []);

    function MainController(inssService) {
        var
            vm = this;

        function updateValues() {
            var
                salaryInCents = Math.round(parseFloat(vm.salary) * 100);

            vm.inss = inssService.calculate(salaryInCents);
            vm.baseIR = salaryInCents + vm.inss;
        }

        function format(value) {
            return (value / 100).toFixed(2);
        }

        angular.extend(this, {
            salary: 10000,
            inss: 0,
            update: updateValues,
            baseIR: 0,
            format: format
        });

        updateValues();
    }

    app.controller('MainController', ['INSS', MainController]);

})(angular);
