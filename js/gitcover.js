'use strict';

var gitcover = angular.module('GitCover', ['ui.router']);

gitcover.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');

    $stateProvider
        
        .state('home', {
            url: '/',
    		templateUrl: 'templates/home.html',
    		controller: 'HomePageCtrl'
        })

        .state('view', {
            url: '/u/:username',
            templateUrl: 'templates/main-content.html',
            controller: 'MainContentCtrl'
        });
        
});




gitcover.controller('HomePageCtrl', function($scope, $state, DAO) {
	if(DAO.isLoggedIn()){
		$state.go('view', {username: DAO.getLoggedInUser().username});
	};
});



gitcover.controller('MainContentCtrl', function($scope, $window, $stateParams, DAO) {
	DAO.getUserByUsername($stateParams.username, function(user){
		$scope.u = user;
		$scope.tags = DAO.getTags();
		$scope.items = DAO.getItems();

		$scope.$apply();
	});

	
	var selectedTags = new Set(); // Keep track of selected tags 

	$scope.itemClicked = function(item){
		if(item.url){
			$window.open(item.url);
		}
	};

	$scope.shouldDisplayItem = function(item){
		var result = true;
		
		// If there are tags selected, we only show items that have ALL tags
		selectedTags.forEach(function(tag){ // FIXME: Short-circuit it
			result = result && item.tags && item.tags.indexOf(tag) > -1;
		});

		return result;
	};


	$scope.toggleTag = function(tag){
		if(selectedTags.has(tag.text)){
			selectedTags.delete(tag.text);
		} else {
			selectedTags.add(tag.text);
		}
	};


	$scope.tagIsOn = function(tag){
		return selectedTags.has(tag.text);
	};

});




gitcover.controller('HeaderCtrl', function($scope, $state, DAO) {	
	$scope.isLoggedIn = DAO.isLoggedIn;

	$scope.login = function(){
		if($scope.isLoggedIn()){
			console.log('WARN: login() was called while being logged in.');
			return;
		}


		DAO.login(
			function(user){
				$state.go('view', {username: user.username});	
			}, 
			function(user, error){
				console.log("ERROR: Cannot login", user, error);
			}
		);
		
	};

	$scope.logout = function(){
		if(! $scope.isLoggedIn()){
			console.log('WARN: logout() was called while not logged in.');
			return;
		}
		DAO.logout(function(){$state.go('home');});
	};
});


//=============================================================================
// Directives


gitcover.directive('header', function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'templates/header.html',
		controller: 'HeaderCtrl'
	};
});

gitcover.directive('mainContent', function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'templates/main-content.html',
	};
});

gitcover.directive('footer', function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'templates/footer.html',
	};
});


gitcover.directive('userInfo', function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'templates/user-info.html',
	};
});

gitcover.directive('gitcoverItem', function(){
	return {
		restrict: 'EA',
		replace: true,
		templateUrl: 'templates/gitcover-item.html',
	};
});