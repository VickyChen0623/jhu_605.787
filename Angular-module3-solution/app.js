 (function () {
    'use strict';
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    MenuSearchService.$inject = ['$http'];

     function NarrowItDownController (MenuSearchService) {
        var narrow = this;

         narrow.searchAndFilter = function (searchTerm) {
             if (searchTerm === "") {
                 narrow.found = [];
                 return
             }
            MenuSearchService.getMatchedMenuItems(searchTerm).then(function (foundItems) {
                narrow.found = foundItems;
            })
        }
        narrow.removeItem = function (itemIndex) {
             narrow.found.splice(itemIndex, 1);
        }
     }

     function MenuSearchService ($http) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: 'GET',
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
            }).then(function (response) {
                const data = response.data;
                var allItems = [];
                for (const key in data) {
                    allItems.push(...data[key].menu_items);
                }
                return allItems.filter(function (item) {
                    return item.description.indexOf(searchTerm) > -1;
                });
            })
        }
     }
     function FoundItems () {
         var ddo = {
             templateUrl: 'foundItemList.html',
             scope: {
                 items: '<',
                 onRemove: '&'
             },
             controller: FoundItemsController,
             controllerAs: 'foundItems',
             bindToController: true
         }

         return ddo;
     }
     function FoundItemsController () {

     }
 })();