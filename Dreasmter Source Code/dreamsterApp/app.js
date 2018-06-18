//DreamsterApp Module
var dreamster = angular.module("dreamster",['ngRoute']);

dreamster.run(function($rootScope){
	$rootScope.id = 0;
	$rootScope.username = "";
	$rootScope.userImage = "";
	$rootScope.post_page = "";
	$rootScope.name = "";
	$rootScope.getData;
   });

	 //Routing of different views
dreamster.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/login',{
        templateUrl : 'login.html',
        controller : 'LoginController'
    })
	.when('/register', {
        templateUrl : 'register.html',
        controller : 'UserRegistration1Controller'
	})
	.when('/register2', {
        templateUrl : 'register2.html',
        controller : 'Registration3Controller'
	})
	.when('/register3', {
        templateUrl : 'register3_user.html',
        controller : 'UserRegistration3Controller'
	})
	.when('/customerDash', {
        templateUrl : 'dash_customer_home.html',
        controller : 'CDC'
	})
	.when('/userDash', {
        templateUrl : 'dash_user_home.html',
        controller : 'UDC'
	})
	.when('/scroll-tab-2', {
		templateUrl : 'dash_user_home.html',
		controller : 'UDC'
	})
	.otherwise({
        redirectTo : '/login'
    });
}]);

//Login Contoller
dreamster.controller("LoginController", function($location,$scope,$http,$rootScope){
	var count =0;
	 $scope.username = "";
	 $scope.password = "";
	$scope.login = function(){
	
   $http({
      method: 'GET',
      url: 'http://dreamster/api/users'
   }).then(function (success){
   	$scope.use = success.data;
	
   	
		   console.log($scope.username);
		   
   	for(i in $scope.use){
   		if($scope.username==$scope.use[i].username && $scope.password==$scope.use[i].password){
		
			$rootScope.id = $scope.use[i].id;
			
			
			   alert("Welcome User continoue your Dreams");
			 
			   
   			$scope.username = "";
			$scope.password = "";
			$location.path('/userDash');  
   			break;
   		}else{
   			count++;
   		}
   	}
   	if(count==$scope.use.length){
   		count=0;
		   
		   $http({
			   method : 'GET',
			   url : 'http://dreamster/api/customers'
		   }).then(function(success){
			$scope.use = success.data;
			
			for(i in $scope.use){
				if($scope.username==$scope.use[i].username && $scope.password==$scope.use[i].password){
					alert("Welcome Customer Explore new Talents");
					
					$rootScope.id = $scope.use[i].id;
				
					$scope.username = "";
					$scope.password = "";
					$location.path('/customerDash'); 
					break;
				}else{
					count++;
				}
			}
			if(count==$scope.use.length){
				count=0;
				
				if($scope.username==""&&$scope.password==""){
					alert("please enter the Username And Password ");
				}else{
					alert("invalid username and password");
				}
				   $("#sample3").val("");
				   $("#sample4").val("");
			}


		   },function(error){
			console.log(error);
		   });
   	}
   
   	
   },function (error){
   	console.log(error);
   });
}
});

//User Dashboard Contoller
dreamster.controller("UDC", function($scope,$rootScope,$http,$location){
    console.log("ye to chal raha hai");

	$scope.post = function(){
		console.log("post change");
		$("#post").addClass('is-active faltu');
		$("#home").removeClass('is-active faltu');
		$("#course").removeClass('is-active faltu');
		$("#profile").removeClass('is-active faltu');
		 $("#scroll-tab-2").show();
		 $("#scroll-tab-1").hide();
		 $("#scroll-tab-4").hide();
		 $("#scroll-tab-3").hide();
		 $("#scroll-tab-2_1").hide();
	
	  }
	  $scope.home = function(){
		console.log("home change");
		$("#home").addClass('is-active faltu');
		$("#post").removeClass('is-active faltu');
		$("#course").removeClass('is-active faltu');
		$("#profile").removeClass('is-active faltu');
		$("#scroll-tab-2").hide();
		$("#scroll-tab-1").show();
		$("#scroll-tab-4").hide();
		$("#scroll-tab-3").hide();
		$("#scroll-tab-2_1").hide();
	  }
	  $scope.course = function(){
		console.log("course change");
		$("#course").addClass('is-active faltu');
		$("#home").removeClass('is-active faltu');
		$("#post").removeClass('is-active faltu');
		$("#profile").removeClass('is-active faltu');
		$("#scroll-tab-2").hide();
		$("#scroll-tab-1").hide();
		$("#scroll-tab-4").hide();
		$("#scroll-tab-3").show();
		$("#scroll-tab-2_1").hide();
	  }
	  $scope.profile = function(){
		console.log("profile change");
		$("#profile").addClass('is-active faltu');
		$("#home").removeClass('is-active faltu');
		$("#course").removeClass('is-active faltu');
		$("#post").removeClass('is-active faltu');
		$("#scroll-tab-2").hide();
		$("#scroll-tab-1").hide();
		$("#scroll-tab-4").show();
		$("#scroll-tab-3").hide();
		$("#scroll-tab-2_1").hide();
	  }
	
		$scope.logout = function(){
			console.log("logout");
			var logout = confirm("Are you sure, logout");
			if(logout){
				$location.path("/login");
			}
			
		}

	  $scope.path = {
		"home":"dash_home.html",
		"post":"dash_post.html",
		"postpage" : "postpage.html",
		"course" : "dash_course.html",
		"profile" : "dash_profile.html"
	  }
	
});

//User Dashboard Home Contoller
dreamster.controller("UDHC", function($scope,$rootScope,$http){
	console.log("home");

	if($rootScope.username==""){
		$scope.username = "prople";
		$scope.name = "Prateek Patel";
		$scope.profilePic = "img/disc-jockey.svg";
	}else{
		$scope.username = $rootScope.username;
		$scope.name = $rootScope.name;
		$scope.profilePic = $rootScope.userImage;
	}
		
	
	$http({
		method : 'GET',
		url : 'http://dreamster/api/posts'
	}).then(function(success){
			 $scope.posts = success.data;
			 console.log($scope.posts);
	},function(error){
			 console.log(error);
	}); 
    
});

//Dashboard Post Contoller
dreamster.controller("DPC", function($scope,$http,$rootScope){
	$scope.message = "this is dashPost.";
    console.log("post");



    $scope.interest = [{
      "name" : "Fashion Designing",
      "img" : "img/F.jpg"
    },{
      "name" : "Graphic Designing",
      "img" : "img/G.jpg"
    },{
      "name" : "Music",
      "img" : "img/M.jpg"
		}];


		$scope.go = function(test){
			
			$rootScope.post_page = test;
				$("#scroll-tab-2").hide();
				$("#scroll-tab-2_1").show();
				$scope.name = $rootScope.post_page;
		}
});

//Dashboard Course Contoller
dreamster.controller("DCC", function($scope){
   
});

//Dashboard Profile Contoller
dreamster.controller("DProC", function($scope,$http,$rootScope){
	console.log("profile");
	if($rootScope.username==""){
  $scope.profilePic = "img/disc-jockey.svg";
  $scope.username = "Prople";
  $scope.password = "12345";
  $scope.name = "Prateek Patel";
  $scope.email = "abc@gmail.com";
  $scope.mobile = "8695745968";
  $scope.option1 = "BE";
  $scope.option2 = "20";
  $scope.interest = "FD";
  $scope.option1_label = "Qualification";
  $scope.option2_label = "Age";
	}else{
		$scope.profilePic = "img/disc-jockey.svg";
		$scope.username = $rootScope.getData.username;
		$scope.password = $rootScope.getData.password;
		$scope.name = $rootScope.getData.name;
		$scope.email = $rootScope.getData.email;
		$scope.mobile = $rootScope.getData.mobile;
		$scope.option1 = $rootScope.getData.qualification;
		$scope.option2 = $rootScope.getData.age;
		$scope.interest = $rootScope.getData.interest;
		$scope.option1_label = "Qualification";
		$scope.option2_label = "Age";
	}

	$scope.update = function(){
		$("#update_div").show();
		$("#show_div").hide();
	}

	$scope.done = function(){
		$("#update_div").hide();
		$("#show_div").show();
		$scope.password = $scope.U_password;
		$scope.email = $scope.U_email;
		$scope.mobile = $scope.U_mobile;
		$scope.qualification = $scope.U_qualification;
		$scope.age = $scope.U_age;
		var URL = "http://dreamster/api/user/update/"+$rootScope.id;
		$http({
			url: URL,
			method: "PUT",
			data: {
				
				"username": $scope.username,
				"password": $scope.password,
				"name": $scope.name,
				"age" : $scope.age,
				"mobile": $scope.mobile,
				"email" : $scope.email,
				"qualification": $scope.qualification,
				"interest":$scope.interest,
				"userImg": $scope.profilePic
				
				}
			})
			.then(function(response) {
				console.log("data send to user");
			
			}, 
			function(response) { // optional
				console.log("data not send to user");
			alert("data updated");
			});

	}


	$scope.delete = function(){
		var URL = "http://dreamster/api/user/delete/"+$rootScope.id;
		$http({
			url: URL,
			method: "DELETE",
			})
			.then(function(response) {
				console.log("data deleted");
			
			}, 
			function(response) { // optional
				console.log("data not deleted");
			
			});
	}
});


dreamster.controller("PPC", function($scope,$http,$rootScope){
		console.log("PPC works");
		$scope.name = $rootScope.post_page;
		
		$http({
			method : 'GET',
			url : 'http://dreamster/api/posts'
		}).then(function(success){
				 $scope.stories = success.data;
				 
		},function(error){
	 			console.log(error);
		}); 
			
    $scope.post = function(){

      console.log("posting....");
      if($("#post_dialog").css("opacity")=="1"){
        console.log("true");
        $("#post_dialog").css("opacity","0");
      }else{
        console.log("false");
        $("#post_dialog").css("opacity","1");
			}
			document.getElementById("inputFile").value= "";
			$("#inputFile").change(function(){
				var fileSelected = document.getElementById("inputFile").files;
				if(fileSelected.length >0){
					var fileToLoad = fileSelected[0];
					var fileReader = new FileReader();
					fileReader.onload = function(fileLoadedEvent){
						var base64value = fileLoadedEvent.target.result;
						console.log(base64value);
						
					
						$scope.img = base64value;
						$("#pic_viewer").show();
						$("#pic_viewer").attr('src',base64value);
						base64value="";
						document.getElementById("inputFile").value= "";
					};
					fileReader.readAsDataURL(fileToLoad);
				
				}
			});   
    }

		$scope.postImageToServer = function(){

			$scope.pagename = "";
			$scope.postUserImg  = "";
			$scope.postUserUsername = "";

			if($scope.pagename==""&&$scope.postUserImg==""&&$scope.postUserUsername==""){
			$scope.pagename = "Fashion Designing";
			$scope.postUserImg = "img/disc-jockey.svg";
			$scope.postUserUsername = "kindle";
			$scope.postHits = 0;
			}

			$http({
				url: 'http://dreamster/api/post/add',
				method: "POST",
				data: {
				  "pagename":$scope.pagename,
					"postUserImg":$scope.postUserImg,
					"postUserUsername":$scope.postUserUsername,
					"postHits":$scope.postHits,
					"postImg":$scope.img
					}
				})
				.then(function(response) {
					console.log("data send to user");
					$scope.pagename = "";
					$scope.postUserImg = "";
					$scope.postUserUsername = "";
					$scope.img = "";
					document.getElementById("inputFile").value= "";
				}, 
				function(response) { // optional
					console.log("data not send to user");
					alert("Your Post is posted");
					$scope.pagename = "";
					$scope.postUserImg = "";
					$scope.postUserUsername = "";
					$scope.img = "";
					document.getElementById("inputFile").value= "";
				});
	
				$("#pic_viewer").hide();
				$("#post_dialog").css("opacity","0");
		}

		$scope.cancel = function(){
			$scope.pagename = "";
			$scope.postUserImg = "";
			$scope.postUserUsername = "";
			$scope.img = "";
			$("#post_dialog").css("opacity","0");
			document.getElementById("inputFile").value= "";
		}

		$scope.hitLike = function(id){
			var currentHits = 0;
			var updateUrl = 'http://dreamster/api/post/update/'+id;
			
			for(i in $scope.stories){
				if($scope.stories[i].postid==id){
					currentHits = $scope.stories[i].postHits;
				}
			}
			
			updateHits(updateUrl,parseInt(currentHits));

		}

		//method for update hits
		var updateHits = function(URL,Hits){
			$http({
				url: URL,
				method: "PUT",
				data: {
					
					"postHits":Hits+1,
					
					}
				})
				.then(function(response) {
					console.log("data send to user");
				
				}, 
				function(response) { // optional
					console.log("data not send to user");
				
				});
		}

});




dreamster.controller("CDC", function($scope){
	
		console.log("cutomer Dashboard");

		$scope.post = function(){
			console.log("post change");
			$("#post").addClass('is-active faltu');
			$("#home").removeClass('is-active faltu');
			$("#course").removeClass('is-active faltu');
			$("#profile").removeClass('is-active faltu');
			 $("#scroll-tab-2").show();
			 $("#scroll-tab-1").hide();
			 $("#scroll-tab-4").hide();
			 $("#scroll-tab-3").hide();
			 $("#scroll-tab-2_1").hide();
		
			}
			$scope.home = function(){
			console.log("home change");
			$("#home").addClass('is-active faltu');
			$("#post").removeClass('is-active faltu');
			$("#course").removeClass('is-active faltu');
			$("#profile").removeClass('is-active faltu');
			$("#scroll-tab-2").hide();
			$("#scroll-tab-1").show();
			$("#scroll-tab-4").hide();
			$("#scroll-tab-3").hide();
			$("#scroll-tab-2_1").hide();
			}
			$scope.profile = function(){
			console.log("profile change");
			$("#profile").addClass('is-active faltu');
			$("#home").removeClass('is-active faltu');
			$("#course").removeClass('is-active faltu');
			$("#post").removeClass('is-active faltu');
			$("#scroll-tab-2").hide();
			$("#scroll-tab-1").hide();
			$("#scroll-tab-4").show();
			$("#scroll-tab-3").hide();
			$("#scroll-tab-2_1").hide();
			}
		
			$scope.path = {
			"home":"customer_dash.html",
			"post":"dash_post.html",
			"postpage" : "postpage.html",
			"profile" : "dash_profile.html"
			}
		
});

dreamster.controller("CDHC", function($scope,$rootScope,$http){
		$scope.message = "this is dash_learn.";
		
	if($rootScope.username==""){
		$scope.username = "googler";
		$scope.name = "googler corp";
		$scope.profilePic = "img/disc-jockey.svg";
	}else{
		$scope.username = $rootScope.username;
		$scope.name = $rootScope.name;
		$scope.profilePic = $rootScope.userImage;
	}
		
	
	$http({
		method : 'GET',
		url : 'http://dreamster/api/posts'
	}).then(function(success){
			 $scope.posts = success.data;
			 console.log($scope.posts);
	},function(error){
			 console.log(error);
	}); 

});
/*
dreamster.controller("PostpageController", function($scope){
    $scope.message = "this is postpage.";
}); */

// Registration 1 Contoller
dreamster.controller("UserRegistration1Controller", function($rootScope,$scope,$http,$location){
	var count = 0;
	$scope.logout = function(){
		console.log("logout");
		var logout = confirm("Are you returning");
		if(logout){
			$location.path("/login");
		}
		
	}
	
	$scope.next = function(){
	$http({
      method: 'GET',
      url: 'http://dreamster/api/users'
   	}).then(function (success){
   	$scope.use = success.data;

   	

   	console.log(success);

		if($scope.name=="" || $scope.username=="" || $scope.email=="" || $scope.mobile=="" || $scope.password=="" || $scope.Cpassword==""){
			alert("please fill all fields");
		}else{
		   //for verifying the username confirmation
   		for(i in $scope.use){
   			if($scope.username==$scope.use[i].username){
   				alert("username already exist");
   				count =0;
   				break;
   			}else{
   				count++;
   			}
		   }
		   
		  //for verifying the password confirmation 
   		if(count==$scope.use.length){
			   count =0;
			   $http({
				method: 'GET',
				url: 'http://dreamster/api/customers'
				 }).then(function (success){
				 $scope.use = success.data;
		  
				 
		  
				 console.log(success);
		  
				
					 //for verifying the username confirmation
					 for(i in $scope.use){
						 if($scope.username==$scope.use[i].username){
							 alert("username already exist");
							 count =0;
							 break;
						 }else{
							 count++;
						 }
					 }
					 
					//for verifying the password confirmation 
					 if(count==$scope.use.length){
						 count =0;
						 if($scope.password==$scope.Cpassword){
							 alert("Password match ready to go");
							 
							 //code if user choosen
							 if($scope.userOption){
								 $scope.userOption = false;
								 $scope.choosen = "user";
								 $("#section1").css("display","none");
								 $("#section2").css("display","block");
		  
							 }else if($scope.cstOption){
								 //code if customer choosen
								 $scope.cstOption = false;
							  $scope.choosen = "customer";
								 $("#section1").css("display","none");
								 $("#section3").css("display","block");
		  
							 }else{
								 alert("please select any of two User/Customer");
							 }
							 
							 //passing the input object to user or customer.
							 $scope.passObj = {
							  "name" : $scope.name,
							  "username" : $scope.username,
							  "password" : $scope.password,
							  "email" : $scope.email,
							  "mobile" : $scope.mobile,
							  "user_customer" : $scope.choosen
						  };
						  $rootScope.newData = $scope.passObj;
						  $scope.$broadcast("passObjEvent",$scope.passObj);
		  
						 }else{
							 alert("Password don't match");
						 }
					 }
	 
			 },function (error){
				 console.log(error);
			 }); 
   		}
	}
	
   },function (error){
   	console.log(error);
   });
	   }
});

//User Registration 2 Contoller
dreamster.controller("UserRegistration2Controller", function($rootScope,$scope,$http,$location){
	$scope.logout = function(){
		console.log("logout");
		var logout = confirm("Are you returning");
		if(logout){
			$location.path("/login");
		}
		
	}

	$scope.userSubmit = function(){
		
		$scope.newObj = {
			"name" : $rootScope.newData.name,
			"username" : $rootScope.newData.username,
			"password" : $rootScope.newData.password,
			"email" : $rootScope.newData.email,
			"mobile" : $rootScope.newData.mobile,
			"user_customer" : $rootScope.newData.user_customer,
			"qualification" : $scope.qualification,
			"age" : $scope.age
		};

		$rootScope.newData = $scope.newObj;
		
	}

});

//Registration 3 Contoller
dreamster.controller("Registration3Controller", function($rootScope,$scope,$http,$location){
	$scope.logout = function(){
		console.log("logout");
		var logout = confirm("Are you returning");
		if(logout){
			$location.path("/login");
		}
		
	}
	
	$scope.cards = [
		{
	  id : "1",
		  name:"Fashion Design",
		  image:"img/F.jpg"
		},
		{
	  id : "2",
		  name:"Graphic Design",
		  image:"img/G.jpg"
		},
		{
	  id : "3",
		  name:"Musical",
		  image:"img/M.jpg"
		},
		{
	  id : "4",
		  name:"Artistry",
		  image:"img/A.jpg"
		},
		{
	  id : "5",
		  name:"Dance",
		  image:"img/D.png"
		},
		{
	  id : "6", 
		  name:"Photography",
		  image:"img/P.jpg"
		}
	  ];


	$scope.intrestArr = [];

    $scope.toggle = function(test){
      console.log("click to ho raha hai");
      for(i in $scope.cards){
        console.log($scope.cards[i].id);
        if($scope.cards[i].id==test){
          if($("#"+test).css("opacity").toLowerCase() == "1"){
              $scope.intrestArr[i] = $scope.cards[i].name;
              $("#"+test).css("opacity","0.4");

          }else{
              var index = $scope.intrestArr.indexOf($scope.intrestArr[i]);
              $scope.intrestArr.splice(index,1);
              $("#"+test).css("opacity","1");
          }
          
          break;
        
        }
      }
    console.log($scope.intrestArr);
    }


    $scope.final  = function(){
      $scope.arr = $scope.intrestArr;
      $scope.arr = $scope.arr.filter(function(x){
        return (x !== (undefined || null || ''));
	  });

	  $scope.intrestStr = $scope.arr.toString();
	  
	  if($rootScope.newData.user_customer=="user"){
		
		$location.path('/register3');
		$http({
            url: 'http://dreamster/api/user/add',
            method: "POST",
            data: {
            "username":$rootScope.newData.username,
              "password":$rootScope.newData.password,
              "name":$rootScope.newData.name,
              "age":$rootScope.newData.age,
              "mobile":$rootScope.newData.mobile,
                "email":$rootScope.newData.email,
                "qualification":$rootScope.newData.qualification,
                  "intrest": $scope.intrestStr
				}
		})
		.then(function(response) {
				console.log("data send to user");
		}, 
		function(response) { // optional
				console.log("data not send to user");
		});

	  }else if($rootScope.newData.user_customer=="customer"){

		$location.path('/customerHome');
		$http({
            url: 'http://dreamster/api/customer/add',
            method: "POST",
            data: {
            "username":$rootScope.newData.username,
              "password":$rootScope.newData.password,
              "name":$rootScope.newData.name,
              "designation":$rootScope.newData.designation,
              "mobile":$rootScope.newData.mobile,
                "email":$rootScope.newData.email,
                "brandname":$rootScope.newData.brand,
                  "intrest": $scope.intrestStr
				}
		})
		.then(function(response) {
				console.log("data send to customer");
		}, 
		function(response) { // optional
				console.log("data not send to customer");
		});

	  }

      
    }
});

//Customer Registration 2 Contoller
dreamster.controller("CustomerRegistration2Controller", function($rootScope,$scope,$http){
	
	$scope.cstSubmit = function(){
		$scope.newObj = {
			"name" : $rootScope.newData.name,
			"username" : $rootScope.newData.username,
			"password" : $rootScope.newData.password,
			"email" : $rootScope.newData.email,
			"mobile" : $rootScope.newData.mobile,
			"user_customer" : $rootScope.newData.user_customer,
			"brand" : $scope.brand,
			"designation" : $scope.designation
		};

		$rootScope.newData = $scope.newObj;
	}

}); 

//User Registration 3 Contoller
dreamster.controller("UserRegistration3Controller", function($scope,$location){
    $scope.journing = function(){
		$location.path('/userDash');
	}
	$scope.learning = function(){
		$location.path('/userDash');
	}
}); 