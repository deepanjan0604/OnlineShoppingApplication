var app = angular.module('app', ['ngRoute']);

app.config([
		'$httpProvider',
		function($httpProvider) {
			$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		} ]);
app.config(['$routeProvider',
         function($routeProvider) {
           $routeProvider
           
              .when('/view', {
               templateUrl: 'viewprofile.html',
               controller: 'viewprofilectrl'
             })
             .when('/edit', {
                 templateUrl: 'edit.html',
                 controller: 'editprofiectrl'
               })
			    .when('/addshipping', {
                 templateUrl: 'addshipping.html',
                 controller: 'addshippingctrl'
               })
               
         }]);
		 
		 
		 
app.controller('viewprofilectrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
	     function($scope,$route,$routeParams,$rootScope, $http)
	     {
			 $scope.title="msgggggg";
			  }]);
			  
			  
			  
			  app.controller('editprofilectrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
	     function($scope,$route,$routeParams,$rootScope, $http)
	     {
			  }]);
			  
			  
			  
			    app.controller('addshippingctrl',[ '$scope','$route','$routeParams', '$rootScope','$http',
	     function($scope,$route,$routeParams,$rootScope, $http)
	     {
			  }]);