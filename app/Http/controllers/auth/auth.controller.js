app.controller('AuthController', function ( $scope, AuthService, NavigationService, $http, $location, API_URL){
	
	$scope.navMenu = NavigationService.getNavigation();
	$scope.resp = {"message" : ""};
	$scope.userId = null;
	/**
	 * [register a new user]
	 * @return {[boolean]} [user create true or false]
	 */
	$scope.register = function () {

		// $scope.formData.profile_pic = document.getElementById('profile_pic').files[0];
		$http.post(API_URL + "/api/auth/register", $scope.formData).success(function (response) {

			if(response === "OK"){

				$scope.resp = {"message" : "User successfully registered"};
				// $scope.resp = AuthService.register($scope.file);
				// console.log($scope.resp);
				// if($scope.resp.success)
				$location.path('/login').replace();
			}
			else{
				
				$scope.resp = {"message" : response};
				$location.path('/register').replace();
			}
		});

	}

	/**
	 * [login description]
	 * @return {[type]} [description]
	 */ 
	$scope.login = function () {

		$http.post(API_URL + "/api/auth/login", JSON.stringify($scope.file)).success(function (response) {

			if(response._id){//check the user id exists or not

				localStorage.setItem('auth', JSON.stringify({"email":response.email, "auth" : true, "id" : response._id}));// set user value in session storage
				$scope.resp = {"message" : "Logged in successfully"};
				$location.path('users_personal/').replace();
			}else{

				$scope.resp = {"message" : response};
				$location.path('/login').search({id : response._id});
			}
			// return;
			// $scope.resp = AuthService.login($scope.file);
			// console.log($scope.resp);
			// if($scope.resp.success)
			// 	$location.path('/').replace();
			// else
			// 	$location.path('/login').replace();
		})
	}

	/**
	 * [logout description]
	 * @return {[type]} [description]
	 */
	$scope.logout = function () {

		$http.get(API_URL + "api/auth/logout").success(function (response) {

			sessionStorage.removeItem('auth')
			// console.log("logout");
			// $scope.resp = AuthService.logout();
			// console.log($scope.resp);
    		// FlashFactory.setMessage($scope.resp.message);
			$location.path('/login').replace();
		});
	}
	/**
	 * [checkLogin description]
	 * @return {[type]} [description]
	 */
	$scope.checkLogin = function () {
		
		$scope.resp = AuthService.checkLogin();
		console.log($scope.resp);
		FlashFactory.setMessage($scope.resp.message);
	}

});