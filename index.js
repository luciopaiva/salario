"use strict";

(function(angular) {
    var
        app = angular.module('salary-app', []);

    function MainController(inssService, irpfService, psService, minWageService) {
        var
            vm = this;

        function sum(acc, cur) {
            return acc + cur;
        }

        function updateContractor() {
            var
                netContractorSalary,
                accountantCosts = Math.round(parseFloat(vm.accountantCosts) * 100),
                taxInPerc = parseFloat(vm.taxSimples) / 100;

            netContractorSalary = vm.totalByMonth;
            vm.grossContractorSalary = (accountantCosts + netContractorSalary) / (1 - taxInPerc);
        }

        function updateValues() {
            var
                FGTS_PERC = 0.08,
                grossVacationSalary,
                transportationVoucher = Math.round(parseFloat(vm.transportationVoucher) * 100),
                foodTicket = Math.round(parseFloat(vm.foodTicket) * 100),
                healthInsurance = Math.round(parseFloat(vm.healthInsurance) * 100),
                salaryInCents = Math.round(parseFloat(vm.salary) * 100),
                profitSharingInCents = Math.round(parseFloat(vm.profitSharing) * 100);

            vm.inss = inssService.calculate(salaryInCents);

            vm.baseIR = salaryInCents - vm.inss;
            vm.rangesIR = irpfService.calculate(vm.baseIR);
            vm.totalIR = vm.rangesIR.reduce(sum, 0);
            vm.totalIRPerc = (100 * (vm.totalIR / vm.baseIR)).toFixed(1);

            vm.netSalary = vm.baseIR - vm.totalIR;
            vm.fgts = FGTS_PERC * salaryInCents * (13 + 1/3);

            vm.thirteenthSalary = vm.netSalary;

            grossVacationSalary = Math.round(1/3 * salaryInCents);
            grossVacationSalary -= inssService.calculate(grossVacationSalary);
            grossVacationSalary -= irpfService.calculate(grossVacationSalary).reduce(sum, 0);
            vm.netVacationSalary = grossVacationSalary;

            vm.basePS = profitSharingInCents;
            vm.rangesPS = psService.calculate(vm.basePS);
            vm.totalPS = vm.rangesPS.reduce(sum, 0);
            if (vm.basePS) {
                vm.totalPSPerc = (100 * (vm.totalPS / vm.basePS)).toFixed(1);
            } else {
                vm.totalPSPerc = 0;
            }
            vm.netProfitSharing = vm.basePS - vm.totalPS;

            vm.benefits = transportationVoucher + foodTicket + healthInsurance;
            vm.total = 12 * vm.netSalary + vm.thirteenthSalary + vm.netVacationSalary +
                vm.netProfitSharing + 12 * vm.benefits + vm.fgts;

            vm.totalByMonth = Math.round(vm.total / 12);

            updateContractor();
        }

        function format(value) {
            var
                result = (value / 100).toFixed(2);

            while (/\d{4,}/.test(result)) {
                result = result.replace(/(\d)(\d{3}[,.])/, '$1,$2');
            }

            return result;
        }

        angular.extend(this, {
            salary: 1000,
            profitSharing: 0,
            thirteenthSalary: 0,
            netVacationSalary: 0,
            healthInsurance: 0,
            transportationVoucher: 0,
            foodTicket: 0,
            inss: 0,
            baseIR: 0,
            rangesIR: [],
            grossContractorSalary: 0,
            accountantCosts: Math.ceil(minWageService.get() / 200),
            taxSimples: 6,
            totalPS: 0,
            update: updateValues,
            updateContractor: updateContractor,
            format: format
        });

        updateValues();
    }

    app.controller('MainController', ['INSS', 'IRPF', 'ProfitSharing', 'MinimumWage', MainController]);

})(angular);
