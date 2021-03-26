var app = angular.module('app', ['ui.mask']);


app.directive('tcNoValidation', function () {
    function getLastChar(val) {
        val = String(val);

        var tpl = 0;

        for (var i = 0; i < 10; i++) {
            tpl += parseInt(val.substr(i, 1));
        }

        var tplStr = String(tpl),
            tplLen = tplStr.length,
            tplLastChar = tplStr.substr((tplLen - 1), 1);

        return tplLastChar;
    }

    function tenthValue(val) {
        var returnValue,
            tckn = val.substr(0, 9),
            map = Array.prototype.map,
            stringToArray = map.call(tckn, function (x) {
                return x.split('');
            });

        var stringToArrayObj = JSON.parse("[" + stringToArray + "]"),
            oddNumberTotal = 0,
            evenNumberTotal = 0;

        var tenthValue = stringToArrayObj.reduce(function (previousValue, currentValue, currentIndex, array) {
            // 1,3,5,7,9
            if (currentIndex % 2 == 0) {
                oddNumberTotal = parseInt(oddNumberTotal) + parseInt(currentValue);
            } // 2,4,6,8
            else {
                evenNumberTotal = parseInt(evenNumberTotal) + parseInt(currentValue);
            }

            if ((((oddNumberTotal * 7) - evenNumberTotal) % 10) < 0) {
                returnValue = (((oddNumberTotal * 7) - evenNumberTotal) % 10) + 10;
            } else {
                returnValue = ((oddNumberTotal * 7) - evenNumberTotal) % 10;
            }

            return returnValue;
        }, 0);

        return tenthValue;
    }

    function vlidateTcNo(value) {
        var result = {
            isValid: true,
            message: null
        };

        // prevent ui-mask masks
        value = value.replace(/\D/g, '');
        
        if (value.length === 0) {
            result = {
                isValid: false,
                message: ''
            };
        }
        
        if (value.length > 0 && value.length !== 11) {
            result = {
                isValid: false,
                message: 'TC Kimlik No 11 karakter olmalıdır.'
            };
        } 
        
        if (value.length > 9) {
            if (tenthValue(value) != value.substr(9, 1)) {
                result = {
                    isValid: false,
                    message: 'Geçerli bir TC Kimlik No giriniz.'
                };
            }
        }
        
        if (value.length === 11) {
            if (getLastChar(value) !== String(value).substr(10, 1)) {
                result = {
                    isValid: false,
                    message: 'Geçerli bir TC Kimlik No giriniz.'
                };
            }
        }
        
        if (value.substr(0, 1) === '0') {
            result = {
                isValid: false,
                message: 'TC Kimlik Numarasının ilk karakteri 0 (Sıfır) olamaz.'
            };
        }

        return result;
    }

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                var ngModelNameFull = attrs.ngModel,
                    ngModelName = ngModelNameFull.split('.'),
                    result = vlidateTcNo(element.val());

                scope[ngModelName[0]].isValid = result.isValid;
                scope[ngModelName[0]].message = result.message;
            });
        }
    };
});


app.controller('exampleController', function exampleController($scope, $http) {
    $scope.tcNo = {
        isValid: true,
        message: null
    };

    /**
     * Generate random TC No
     * 
     * @source https://gist.github.com/canerbasaran/9440338
     */
    $scope.tcNoGenerate = function tcNoGenerate() {
        var tcno = '' + Math.floor(900000001 * Math.random() + 1e8),
            list = tcno.split('').map(function (t) {
                return parseInt(t, 10)
            }),
            odd = list[0] + list[2] + list[4] + list[6] + list[8],
            even = list[1] + list[3] + list[5] + list[7],
            tc10 = (7 * odd - even) % 10;

        $scope.tcNo.text = tcno + ('' + tc10) + ('' + (even + odd + tc10) % 10);
    };
});