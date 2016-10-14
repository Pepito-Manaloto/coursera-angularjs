(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .controller('FoundItemsController', FoundItemsController)
    .service('MenuSearchService', MenuSearchService)
    .constant('MenuItemsUrl',"https://davids-restaurant.herokuapp.com/menu_items.json")
    .directive('foundItems', FoundItems);

    function FoundItems()
    {
      var ddo =
        {
          templateUrl: 'foundItems.html',
          scope: {
            foundItems: '<items',
            onRemove: '&'
          },
          controller: FoundItemsController,
          controllerAs: 'list',
          bindToController: true
        };

      return ddo;
    }

    FoundItemsController.$inject = ['MenuSearchService'];
    function FoundItemsController(MenuSearchService)
    {
      var list = this;

      list.removeItem = function(index)
        {
          MenuSearchService.removeMatchedItem(index);
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService)
    {
      var narrowItDown = this;

      narrowItDown.items = [];
      narrowItDown.message = "";

      narrowItDown.search = function(keyword)
        {
          var promise = MenuSearchService.getMatchedMenuItems();

          promise.then(function(response)
            {
              var result = [];
              var menuItems = response.data.menu_items;
              var length = menuItems.length;
              for (var i = 0; i < length; i++)
              {
                  var description = menuItems[i]['description'];
                  if(description.includes(keyword))
                  {
                    result.push(menuItems[i]);
                  }
              }
              MenuSearchService.setMatchedItems(result);
              narrowItDown.items = MenuSearchService.getMatchedMenuItems();
            })
          .catch(function (error)
            {
              console.log(error);
            });
        };
    }

    MenuSearchService.$inject = ['$http', 'MenuItemsUrl'];
    function MenuSearchService($http, MenuItemsUrl)
    {
      var menuSearch = this;
      var matchedItems = [];

      menuSearch.getMatchedMenuItems = function()
        {
          return $http(
            {
              method: 'GET',
              url: MenuItemsUrl,
            });
        };

      menuSearch.setMatchedItems = function(items)
        {
          matchedItems = items;
        };

      menuSearch.getMatchedItems = function()
        {
          return matchedItems;
        };

      menuSearch.removeMatchedItem = function(index)
        {
          matchedItems.splice(itemIndex, 1);
        };
    }
})();
