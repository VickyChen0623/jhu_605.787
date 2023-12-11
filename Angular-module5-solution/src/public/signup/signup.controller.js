(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', 'MenuService', 'UserService'];
    function SignUpController($scope, MenuService, UserService) {
        var $ctrl = this;

        $ctrl.checkExistence = function () {
            if ($ctrl.user.menuItem) {
                MenuService.getMenuItem($ctrl.user.menuItem).then(function (response) {
                    $scope.signUpForm.menuItem.$setValidity("itemExists", !!response)
                });
            }
        };

        $ctrl.submit = function () {
            const favItem = {};
            const category_short_name = $ctrl.user.menuItem.match(/[a-z]+|[^a-z]+/gi)[0];
            MenuService.getMenuItem($ctrl.user.menuItem).then(function (response) {
                favItem.name = response.name;
                favItem.description = response.description;
                favItem.categoryShortName = category_short_name;
                UserService.setUserInfo({...$ctrl.user, favItem});

                $ctrl.submitted = true;
            });;
        };
    }


})();
