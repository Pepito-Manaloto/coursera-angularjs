(function(){
  'use strict';

  angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService)
    {
      var toBuy = this;

      ShoppingListCheckOffService.initializeShoppingList();
      toBuy.shoppingList = ShoppingListCheckOffService.getToBuyItems();

      toBuy.resetShoppingList = function()
        {
          ShoppingListCheckOffService.initializeShoppingList();
        };

      toBuy.bought = function(index)
        {
          ShoppingListCheckOffService.boughtItem(index);
        };

      toBuy.isEmpty = function()
        {
          return ShoppingListCheckOffService.getToBuyItems().length <= 0;
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService)
    {
      var alreadyBought = this;

      alreadyBought.shoppedList = ShoppingListCheckOffService.getBoughtItems();
      alreadyBought.isEmpty = function()
        {
          return ShoppingListCheckOffService.getBoughtItems().length <= 0;
        };

      alreadyBought.resetShoppedList = function()
        {
          ShoppingListCheckOffService.resetShoppedList();
        };
    }

    function ShoppingListCheckOffService()
    {
      var service = this;

      var toBuyItems = [];
      var boughtItems = [];

      service.initializeShoppingList = function()
        {
          var defaultShoppingList =
            [
                { "name": "cookies", "quantity": 10 },
                { "name": "burgers", "quantity": 5 },
                { "name": "ice creams", "quantity": 8 },
                { "name": "pizzas", "quantity": 15 },
                { "name": "salads", "quantity": 20 },
                { "name": "steaks", "quantity": 3 },
                { "name": "sea bass", "quantity": 7 },
                { "name": "pumpkin soups", "quantity": 11 },
            ];

          var index;
          for(index in defaultShoppingList)
          {
            toBuyItems.push(defaultShoppingList[index]);
          }
        };

      service.resetShoppedList = function()
        {
          boughtItems.splice(0, boughtItems.length);
        };

      service.boughtItem = function(index)
        {
          boughtItems.push(toBuyItems[index]);
          toBuyItems.splice(index, 1);
        };

      service.getToBuyItems = function()
        {
          return toBuyItems;
        };
      service.getBoughtItems = function()
        {
          return boughtItems;
        };
    }
})();
