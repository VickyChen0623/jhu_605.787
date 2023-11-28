(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryListController', CategoryListController);

// categories passed in from resolver
CategoryListController.$inject = ['categories'];
function CategoryListController(categories) {
  var categoriesCtrl = this;
  categoriesCtrl.items = categories;
}

})();
