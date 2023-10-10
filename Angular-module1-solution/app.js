(function () {
    'use strict';
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController ($scope) {
        $scope.message = '';
        $scope.calculateNum = function () {
            if ($scope.lunchInput === '' || $scope.lunchInput === undefined) {
                $scope.message = 'Please enter data first';
                $scope.inputBorder = "redBorder";
                $scope.messageColor = "redText";
                return;
            }
            // This line excludes empty item
            var dishArr = $scope.lunchInput.split(',').filter(dish => dish.trim() !== '');
            if (dishArr.length > 3) {
                $scope.message = 'Too much!';
            } else {
                $scope.message = 'Enjoy!';
            }
            $scope.inputBorder = "greenBorder";
            $scope.messageColor = "greenText";
        }
    }
})();