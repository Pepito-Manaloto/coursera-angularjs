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
            items: '<',
            myTitle: '@title',
            searched: '&'
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

          if(MenuSearchService.getMatchedItems().length <= 0)
          {
            list.myTitle = "";
          }
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService)
    {
      var narrowItDown = this;

      narrowItDown.items = [];
      narrowItDown.message = "";
      narrowItDown.title = "";

      var doneSearching = false;
      narrowItDown.search = function(keyword)
        {
          if(keyword == null || keyword.trim().length <= 0)
          {
            narrowItDown.items = [];
            narrowItDown.title = "Nothing Found.";
          }
          else
          {
            var promise = MenuSearchService.getMatchedMenuItems();

            promise.then(function(response)
              {
                MenuSearchService.resetMatchedItems();
                var menuItems = response.data.menu_items;
                var length = menuItems.length;
                for (var i = 0; i < length; i++)
                {
                    var description = menuItems[i]['description'];

                    if(description.includes(keyword))
                    {
                      MenuSearchService.addItem(menuItems[i]);
                    }
                }

                if(MenuSearchService.getMatchedItems().length <= 0)
                {
                  narrowItDown.title = "Nothing Found.";
                }
                else
                {
                  narrowItDown.title = "Searched Items:"
                }

                narrowItDown.items = MenuSearchService.getMatchedItems();
              })
            .catch(function (error)
              {
                console.log(error);
              });
          }

          doneSearching = true;
        };

        narrowItDown.searched = function()
          {
            return doneSearching;
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

      menuSearch.resetMatchedItems = function()
        {
          matchedItems = [];
        };

      menuSearch.addItem = function(item)
        {
          matchedItems.push(item);
        };

      menuSearch.getMatchedItems = function()
        {
          return matchedItems;
        };

      menuSearch.removeMatchedItem = function(index)
        {
         console.log(index);
          matchedItems.splice(index, 1);
        };
    }
})();
