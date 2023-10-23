 (function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .filter('totalPrice', TotalPriceFilter)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController (ShoppingListCheckOffService) {
        var buyCtrl = this;

        buyCtrl.toBuyArr = ShoppingListCheckOffService.getToBuyArr();
        buyCtrl.boughtItem = function (itemIdx) {
            ShoppingListCheckOffService.bought(itemIdx);
        }
    }

     AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
     function AlreadyBoughtController (ShoppingListCheckOffService) {
         var boughtCtrl = this;

         boughtCtrl.boughtArr = ShoppingListCheckOffService.getBoughtArr();
     }

     function TotalPriceFilter() {
         return function (input, quantity, unitPrice) {
             return '$$$'+(quantity*unitPrice).toFixed(2);
         }
     }

    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyArr = [{ name: "cookies", quantity: 9, pricePerItem: 1}, { name: "bananas", quantity: 8, pricePerItem: 2 }, { name: "pears", quantity: 7, pricePerItem: 3 }, { name: "apples", quantity: 6, pricePerItem: 4 }, { name: "chips", quantity: 5, pricePerItem: 5 }];
        var boughtArr = [];

        service.bought = function (itemIdx) {
            var boughtItem = toBuyArr[itemIdx];
            toBuyArr.splice(itemIdx, 1);
            boughtArr.push(boughtItem);
        }
        service.getToBuyArr = function () {
            return toBuyArr;
        }
        service.getBoughtArr = function () {
            return boughtArr;
        }
    }
 })();