angular.module("BookBuddiesMod")
    .controller("profileController", function($scope, apiService, dbService, $location, $rootScope){

        $scope.status = dbService.getStatus();

        if(!$scope.status) {
            $location.path('/login');
        }

    	$scope.user = $rootScope.user;

    	$scope.myLibrary = [];

    	$scope.myWatchlist = [];

    	$scope.getLibrary = function(){
    		dbService.getLibrary($scope.user).then(function(response){
    		$scope.myLibrary = response;
    		});
    	}

    	$scope.getWatchlist = function(){
    		dbService.getWatchlist($scope.user).then(function(response){
    		$scope.myWatchlist = response;
    		});
    	}

    	$scope.deleteWatchlist = function(id) {
			dbService.deleteWatchlist(id).then(function(){
                $scope.myWatchlist = [];
                $scope.getWatchlist();
			});
    	}

    	$scope.deleteLibrary = function(id) {
    		dbService.deleteLibrary(id).then(function(){
    	        $scope.myLibrary = [];
                $scope.getLibrary();
    		});
    	}

      $scope.getLibrary();
      $scope.getWatchlist();

      dbService.setMatches($scope.user).then(function(response) {
          $scope.matches = dbService.getMatches();
          $scope.numberOfMatches = $scope.matches.length;
          $scope.matches = dbService.getMatches();
          if($scope.matches.length === 1) {
            $scope.numberOfMatches = $scope.matches.length + " match";
          } else if($scope.matches.length > 1) {
            $scope.numberOfMatches = $scope.matches.length + " matches";
          }
      });

    });
