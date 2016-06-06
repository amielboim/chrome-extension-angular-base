angular.module('popup')
  .controller('MainController', ['$scope', function($scope) {
      $scope.welcomeMsg = "שיויתי - תוסף קדושה לאינטרנט!!";

      $scope.list = [];

      $scope.init = function(){
          chrome.storage.sync.get('current_list', function(){

          });
      }

      $scope.save_list = function(){
          chrome.storage.sync.set({'current_list':{name:'base', list:["שיויתי ה' לנגדי תמיד","לב טהור ברא לי אלוקים"]},
                                    'current_stat': "לב טהור ברא לי אלוקים",
                                    'current_key': 1}, function(){

          });
      }

      $scope.save_list();

  }])
;
