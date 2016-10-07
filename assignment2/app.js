(function(){
  'use strict';

  angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    ToBuyController.$inject['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService)
    {
      var toBuy = this;

      toBuy.shoppingList = ShoppingListCheckOffService.initializeToBuyItems();
      //toBuy.bought = ShoppingListCheckOffService.boughtItem(index);
    }

    AlreadyBoughtController.$inject['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService)
    {
      var alreadyBought = this;

    }

    function ShoppingListCheckOffService()
    {
      var service = this;

      var toBuyItems = [];
      var boughtItems = [];

      service.initializeToBuyItems = function()
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

          var item;
          for(item in defaultShoppingList)
          {
            toBuyItems.push(item);
          }
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
