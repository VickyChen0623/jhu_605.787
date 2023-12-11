(function () {
    "use strict";

    angular.module('common')
        .service('UserService', UserService);

    UserService.$inject = ['$http', 'ApiPath'];
    function UserService($http, ApiPath) {
        var service = this;

        service.setUserInfo = function (userInput) {
            service.userInfo = userInput;
        };

        service.getUserInfo = function () {
            return service.userInfo;
        };

        service.getCategories = function () {
            return $http.get(ApiPath + '/categories.json').then(function (response) {
                return response.data;
            });
        };


        service.getMenuItems = function (category) {
            return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
                return response.data;
            });
        };

    }



})();
