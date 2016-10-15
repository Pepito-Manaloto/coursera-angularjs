(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
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
            searched: '&',
            onRemove: '&'
          },
          controller: NarrowItDownController,
          controllerAs: 'list',
          bindToController: true
        };

      return ddo;
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
            MenuSearchService.getMatchedMenuItems(keyword)
              .then(function(response)
              {
                narrowItDown.items = response;

                if(narrowItDown.items.length <= 0)
                {
                  narrowItDown.title = "Nothing Found.";
                }
                else
                {
                  narrowItDown.title = "Searched Items: (" + narrowItDown.items.length + ")";
                }
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

        narrowItDown.removeItem = function(index)
          {
            narrowItDown.items.splice(index, 1);
            if(narrowItDown.items.length <= 0)
            {
              narrowItDown.myTitle = "";
            }
            else
            {
              narrowItDown.myTitle = "Searched Items: (" + narrowItDown.items.length + ")";
            }
          };
    }

    MenuSearchService.$inject = ['$http', 'MenuItemsUrl'];
    function MenuSearchService($http, MenuItemsUrl)
    {
      var menuSearch = this;

      menuSearch.getMatchedMenuItems = function(keyword)
        {
          return $http(
            {
              method: 'GET',
              url: MenuItemsUrl,
            }).then(function(response)
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

                return result;
              });
        };
    }
})();
