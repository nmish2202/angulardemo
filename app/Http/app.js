var app = angular.module('angulardemo', ['ngRoute', 'ngCookies'])
		.constant('API_URL', 'http://34.209.107.197:8001')
		.config(function ($routeProvider, $locationProvider, $httpProvider) {
			
			$httpProvider.defaults.headers.common = {'Content-Type' : 'application/json'};
			$httpProvider.defaults.headers.post = {};
			$httpProvider.defaults.headers.put = {};
			$httpProvider.defaults.headers.patch = {};

			/**
			 * 
			 * Checks for url access
			 */
			resolver = function (access){

				return {
					load: function($q, AuthService, $location){
						if(access){

							return true
						}else{

							if(AuthService.checkLogin()){

								return true;
							}
							else{

								$location.path("/login");
							}
						}
					}
				}
				
			}

			$routeProvider
			.when('/', {

				templateUrl : "/view/home.html",
				controller : 'PagesController'
			})
			.when('/home', {

				templateUrl : "/view/home.html",
				controller : 'PagesController'
			})
			.when('/about', {

				templateUrl : "/view/about.html",
				controller : 'PagesController'
			})
			.when('/team', {

				templateUrl : "/view/team.html",
				controller : 'PagesController'
			})
			.when('/work', {

				templateUrl : "/view/work.html",
				controller : 'PagesController'
			})
			.when('/price', {

				templateUrl : "/view/price.html",
				controller : 'PagesController'
			})
			.when('/users/:user_type', {

				templateUrl : "/view/developers.html",
				controller : 'UsersController'
			})
			.when('/user/show/:id', {

				templateUrl : "/view/user.details.html",
				controller : 'UsersController'
			})
			.when('/contact', {

				templateUrl : "/view/contact.html",
				controller : 'PagesController'
			})
	        .when('/register', {

	            controller: 'AuthController',
	            templateUrl: '/view/auth/register.html',
				resolve:{

					loggedIn: function(AuthService, $location){
						
						if(!AuthService.checkLogin())
							return true;
						else
							$location.path("/home");
					}
				}

	        })
	        .when('/login', {

	            controller: 'AuthController',
	            templateUrl: '/view/auth/login.html',
				resolve:{

					loggedIn: function(AuthService, $location){
						
						if(!AuthService.checkLogin())
							return true;
						else
							$location.path("/home");
					}
				}

	        })
			.when('/users_personal/:id', {

	            controller: 'UsersController',
	            templateUrl: '/view/users/personal.html',
				pageTitle: 'personal_details',
				resolve:resolver(false)
			})
			.when('/users_edu/:id', {

	            controller: 'UsersController',
	            templateUrl: '/view/users/edu.html',
				pageTitle: 'edu_details',
				resolve:resolver(false)
			})
			.when('/users_contact/:id', {

	            controller: 'UsersController',
	            templateUrl: '/view/users/contact.html',
				pageTitle: 'contact_details',
				resolve:resolver(false)
			})
			.when('/users_other/:id', {

	            controller: 'UsersController',
	            templateUrl: '/view/users/other.html',
				pageTitle: 'other_details',
				resolve:resolver(false)
			})
			.when('/dashboard', {

	            controller: 'DashboardController',
	            template: ' ',
				pageTitle: 'dashboard',
			})
			// .when('/dashboard/user/personal/:id', {

	        //     controller: 'UsersController',
	        //     templateUrl: '/view/dashboard/users/personal.html',
			// 	pageTitle: 'personal_details',
			// 	resolve:resolver(false)
			// })
			// .when('/dashboard/user/edu/:id', {

	        //     controller: 'UsersController',
	        //     templateUrl: '/view/dashboard/users/edu.html',
			// 	pageTitle: 'edu_details',
			// 	resolve:resolver(false)
			// })
			// .when('/dashboard/user/contact/:id', {

	        //     controller: 'UsersController',
	        //     templateUrl: '/view/dashboard/users/contact.html',
			// 	pageTitle: 'contact_details',
			// 	resolve:resolver(false)
			// })
			// .when('/dashboard/user/other/:id', {

	        //     controller: 'UsersController',
	        //     templateUrl: '/view/dashboard/users/other.html',
			// 	pageTitle: 'other_details',
			// 	resolve:resolver(false)
			// })
	        .when('/logout', {
				
				resolve : {
	            	logout: function ($routeParams, $location, $http, API_URL){
						$http.get(API_URL + "/api/auth/logout").success(function (response) {

							if(response === "OK"){
								
								localStorage.removeItem('auth');
								$location.path('/login').replace();
							}
						})
 	            	}
	            }
	        })
			.otherwise({
            	redirectTo: '/',
    		}); 
    		$locationProvider.html5Mode({
			 	enabled: true,
			  	requireBase: false
			});
		}).run(['$http', '$cookies', function($http, $cookies) {

			$http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
		}]);