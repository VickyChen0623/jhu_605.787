(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

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

  service.getMenuItem = function (itemShortName) {
    const [category_short_name, menu_number] = itemShortName.match(/[a-z]+|[^a-z]+/gi);
    return $http.get(`https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${category_short_name}/menu_items/${menu_number-1}.json`)
        .then(function (response) {
      return response.data;
    })
  }
}

})();
