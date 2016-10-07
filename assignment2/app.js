(function(){
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckControllerImpl);

  LunchCheckControllerImpl.$inject = ['$scope'];
  function LunchCheckControllerImpl($scope)
  {
    function filterEmptyString(e)
    {
      return e.trim().length > 0;
    }

    $scope.checkIfTooMuch = function()
    {
      var input = $scope.dishes;
      var good = false;

      if(input != null)
      {
        var dishes = input.split(',').filter(filterEmptyString);
        var numOfDishes = dishes.length;

        // Check if empty
        if(numOfDishes <= 0 || (numOfDishes == 1 && dishes[0].length <= 0))
        {
          good = false;
          $scope.checkIfTooMuchMsg = "Please enter data first";
        }
        else if(numOfDishes <= 3)
        {
          good = true;
          $scope.checkIfTooMuchMsg = "Enjoy!";
        }
        else
        {
          good = true;
          $scope.checkIfTooMuchMsg = "Too much!";
        }
      }
      else
      {
        good = false;
        $scope.checkIfTooMuchMsg = "Please enter data first";
      }

      if(good)
      {
        $scope.lunchMenuStyle = {"border-color": "green"};
        $scope.messageStyle = {"color": "green"};
      }
      else
      {
        $scope.lunchMenuStyle = {"border-color": "red"};
        $scope.messageStyle = {"color": "red"};
      }

    };

  }
})();
