var app = angular.module('app', ['ui.mask']);

app.controller('exampleController', function exampleController($scope, $http) {
    // only directive example model
    $scope.tcNo = {
        $valid: true,
        message: null
    };

    // with ui-mask example model
    $scope.tcNo2 = {
        $valid: true,
        message: null
    };

    // nested example model
    $scope.form = {
        customers: [
            {
                name: null,
                surname: null,
                birtDae: null,
                tcNo: {
                    $valid: true,
                    message: null
                }
            },
            {
                name: null,
                surname: null,
                birtDae: null,
                tcNo: {
                    $valid: true,
                    message: null
                }
            },
            {
                name: null,
                surname: null,
                birtDae: null,
                tcNo: {
                    $valid: true,
                    message: null
                }
            },
            {
                name: null,
                surname: null,
                birtDae: null,
                tcNo: {
                    $valid: true,
                    message: null
                }
            },
        ]
    };

    /**
     * Generate random TC No
     * 
     * @source https://gist.github.com/canerbasaran/9440338
     */
    $scope.tcNoGenerate = function tcNoGenerate(model) {
        var tcno = '' + Math.floor(900000001 * Math.random() + 1e8),
            list = tcno.split('').map(function (t) {
                return parseInt(t, 10)
            }),
            odd = list[0] + list[2] + list[4] + list[6] + list[8],
            even = list[1] + list[3] + list[5] + list[7],
            tc10 = (7 * odd - even) % 10;

        model.text = tcno + ('' + tc10) + ('' + (even + odd + tc10) % 10);
    };
});