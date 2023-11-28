(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemListController', ItemListController);

ItemListController.$inject = ['items']
function ItemListController(items) {
  var itemsCtrl = this;
  itemsCtrl.items = items;
}

})();
