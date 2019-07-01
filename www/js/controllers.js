var url = 'https://lantang.herokuapp.com'
var post = {}
var lapor = {}
var postL = {}
var user = {}

var resizer = function(base64, maxWidth, maxHeight){


	// Max size for thumbnail
	  if(typeof(maxWidth) === 'undefined')  maxWidth = 500;
	  if(typeof(maxHeight) === 'undefined')  maxHeight = 500;
	
	  // Create and initialize two canvas
	  var canvas = document.createElement("canvas");
	  var ctx = canvas.getContext("2d");
	  var canvasCopy = document.createElement("canvas");
	  var copyContext = canvasCopy.getContext("2d");
	
	  // Create original image
	  var img = new Image();
	  img.src = base64;
	
	  // Determine new ratio based on max size
	  var ratio = 1;
	  if(img.width > maxWidth)
		ratio = maxWidth / img.width;
	  else if(img.height > maxHeight)
		ratio = maxHeight / img.height;
	
	  // Draw original image in second canvas
	  canvasCopy.width = img.width;
	  canvasCopy.height = img.height;
	  copyContext.drawImage(img, 0, 0);
	
	  // Copy and resize second canvas to first canvas
	  canvas.width = img.width * ratio;
	  canvas.height = img.height * ratio;
	  ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
	
	  return canvas.toDataURL();
	
	
	
	}

var load = function(a,b) {
	if(post.image){
		document.getElementById(a).style.backgroundImage = 'url(' + post.image + ')'
		document.getElementById(b).style.color = "transparent"
	}

}

var loadL = function(a,b,image) {
	if(image){
		postL.image_done = image
		document.getElementById(a).style.backgroundImage = 'url(' + image + ')'
		document.getElementById(b).style.color = "transparent"
	}
	else{
		//alert("Gambar gagal dimuat")
	}

}


angular.module('app.controllers', [])

.controller('homeCtrl', ['$scope', '$stateParams','$http','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$ionicPopup) {

			
	user.avatar = localStorage.getItem("avatar")
	user.username = localStorage.getItem("username")
	user.email = localStorage.getItem("email")
	user.id = localStorage.getItem("id")
	
	$scope.user = user;
	$scope.post = []

	$scope.like=function(){
		
		$http({
			method: "GET",
			url: url+"/v1/user/"+$scope.post[index].id_user
		})
		.success(function(data) {
		
			$scope.post[index].user = data
		})
		.error(function (errResponse, status) {
			$ionicPopup.alert({
					title: 'Tidak tersambung'
			});
		});
	}

	$scope.decode = function(s){
		return decodeURIComponent(s)
	}
	
	if(localStorage.getItem("id")=="undefined")
	{
		location.href = '/#/login';
	}

	$scope.$on('$ionicView.enter', function () { 
		$scope.load()
	});


	$scope.getDetailUser = function(index) {
		
		$http({
			method: "GET",
			url: url+"/v1/user/"+$scope.post[index].id_user
		})
		.success(function(data) {
		
			$scope.post[index].user = data
		})
		.error(function (errResponse, status) {
			$ionicPopup.alert({
					title: 'Tidak tersambung'
			});
		});
	}
	$scope.camera = function(){


		function onSuccess(imageData) {
		  
			post.image =  resizer("data:image/jpeg;base64," + imageData);

			
			
			setTimeout(function(){
				window.location = "/#/laporkan2"
			},0)
		}

		function onFail(message) {
		    alert('Failed because: ' + message);
		}
				/**
		 * Warning: Using DATA_URL is not recommended! The DATA_URL destination
		 * type is very memory intensive, even with a low quality setting. Using it
		 * can result in out of memory errors and application crashes. Use FILE_URI
		 * or NATIVE_URI instead.
		 */

		 console.log("camera clicked")
		navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
		    destinationType: Camera.DestinationType.DATA_URL
		});
	}



	$scope.load = function(){
		
		$http({
			method: "GET",
			url: url+"/v1/post/"
		})
		.success(function(data) {
			$scope.post = data
			console.log(data)
			for(x in $scope.post){
				$scope.getDetailUser(x)
			}
		})
		.error(function (errResponse, status) {
		$ionicPopup.alert({
				title: 'Tidak tersambung'
		});
		});
	}

	$scope.load()
	

}])

.controller('laporkanCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	
	$scope.obj = []
	$scope.addData = function(dt){
		$scope.obj.push(dt)
	}

	$scope.requestAuthorization = function () {

		if(cordova.plugins)
		cordova.plugins.photoLibrary.requestAuthorization(
		  function () {
			// Retry
			$scope.load();
		  },
		  function (err) {
			console.log('Error in requestAuthorization: ' + err);
	
			// TODO: explain to user why you need the permission, and continue when he agrees
	
			// Ask user again
			$scope.requestAuthorization();
	
		  }, {
			read: true,
			write: false
		  }
		);
	
	  }

	  $scope.load = function(){
				$scope.obj = []
				cordova.plugins.photoLibrary.getLibrary(
					function (result) {
						$scope.library = result.library;
					  // Here we have the library as array
				  
					  $scope.library.forEach(function(libraryItem) {
						$scope.addData(libraryItem)
					  });
				  
					},
					function (err) {
					  alert('Error occured');
					},
					{ // optional options
					  thumbnailWidth: 512,
					  thumbnailHeight: 384,
					  quality: 0.8,
					  includeAlbumData: false // default
					}
				  );			
		
	}

	$scope.requestAuthorization()

	
	$scope.camera = function(){


		function onSuccess(imageData) {
		  
			post.image =  "data:image/jpeg;base64," + imageData;
			
			setTimeout(function(){
				window.location = "/#/laporkan2"
			},0)
		}

		function onFail(message) {
		    alert('Failed because: ' + message);
		}
				/**
		 * Warning: Using DATA_URL is not recommended! The DATA_URL destination
		 * type is very memory intensive, even with a low quality setting. Using it
		 * can result in out of memory errors and application crashes. Use FILE_URI
		 * or NATIVE_URI instead.
		 */

		 console.log("camera clicked")
		navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
		    destinationType: Camera.DestinationType.DATA_URL
		});
	}


}])

.controller('bLONTANGCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('pesananCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('keluarCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 
.controller('lOGINCtrl', ['$scope', '$stateParams','$http','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$ionicPopup) {

	$scope.user ={};


	if(localStorage.getItem("id")!="undefined" && localStorage.getItem("id"))
	{
		if(localStorage.getItem("role")=="0"){
			location.href = '/#/home';
		}
		else if(localStorage.getItem("role")=="1"){
			location.href = '/#/adminhome';
		}
	
	}

	$scope.login = function(){
		$http({
	        method: "POST",
	        url: url+"/v1/login",
	        data: JSON.stringify($scope.user)
	    })
	    .success(function(data) {
	    	console.log(data)
		  localStorage.setItem("id",data.data.id)
		  localStorage.setItem("username",data.data.username)
		  localStorage.setItem("avatar",data.data.avatar)
		  localStorage.setItem("email",data.data.id)
		  localStorage.setItem("role",data.data.role)
	
		  if(data.message=="login user")
			  location.href = '/#/home'
		  else if(data.message=="login admin")
		      location.href = '/#/adminhome'
	    })
	    .error(function (errResponse, status) {
	       $ionicPopup.alert({
	            title: 'Salah email atau password'
	       });
	    });
	}



}])
   
.controller('lokasiCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('editorBajuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('editorTopiCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('editorMugCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('editorCaseHPCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('tersimpanCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('chatLangsungCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('chatCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('pILIHMEDIACtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('cHECKOUTCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('privacyPolicyCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('maafYaCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('detailPesananCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('mediaSosialCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('pendaftaranCtrl', ['$scope', '$stateParams','$http','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$ionicPopup) {

	scope=$scope;
	$scope.user ={};

	$scope.register = function(){

		if($scope.user.password==$scope.user.cpassword)
		{
			$http({
	        method: "POST",
	        url: url+"/v1/user/add",
	        data: JSON.stringify($scope.user)
		    })
		    .success(function(data) {
		   	  if(data.status=="gagal")
		   	  {
		   	  	 $ionicPopup.alert({
		            title: data.message
		       });
		   	  }
		   	  else{
				localStorage.setItem("id",data.data.id)
				localStorage.setItem("username",data.data.username)
				localStorage.setItem("avatar",data.data.avatar)
				localStorage.setItem("email",data.data.id)
				localStorage.setItem("role",data.data.role)
			      location.href = '/#/home';
		   	  }
		
		    })
		    .error(function (errResponse, status) {
		       $ionicPopup.alert({
		            title: 'Username atau email sudah dipakai'
		       });
		    });
		}
		else
		{
			$ionicPopup.alert({
		            title: 'Konfirmasi password salah'
		    });
		}

		
	}



}])
 
.controller('laporkan2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

    $scope.$on('$ionicView.enter', function () { 
		load('myImage','icon-gambar')
	});

}])
   
.controller('laporkan3Ctrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {
	
	$scope.post = post;

	$scope.$on('$ionicView.enter', function () { 
		$scope.post = post;
		load('myImage2','icon-gambar2')
	});

	$scope.submit = function(){
		post.description = document.getElementById("isi").value
		post.id_user = localStorage.getItem("id")

		console.log(post)
		$http({
	        method: "POST",
	        url: url+"/v1/post/add",
	        data: JSON.stringify(post)
	    })
	    .success(function(data) {
	       location.href = '/#/home';
	    })
	    .error(function (errResponse, status) {
	       $ionicPopup.alert({
	            title: 'Terjadi kesalahan, coba kembali'
	       });
	    });
	}
	
}])
   
.controller('lapokan4Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('ulasBisnisCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('reviewCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('pilihFotoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('profilCtrl', ['$scope', '$stateParams','$http','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$ionicPopup) {


	$scope.getStatus = function(s)
	{
		var x =0;
		for(i in $scope.post)
		{
			if($scope.post[i].status==s)
			{
				x++
			}
		}

		return x
	}

				
	user.avatar = localStorage.getItem("avatar")
	user.username = localStorage.getItem("username")
	user.email = localStorage.getItem("email")
	user.id = localStorage.getItem("id")
	
	$scope.user = user;

	$scope.post = []


	
	$scope.$on('$ionicView.enter', function () { 
		$scope.load()
	});

	$scope.load = function(){
		
		$http({
			method: "GET",
			url: url+"/v1/post_user/"+user.id
		})
		.success(function(data) {

			console.log(data)
			$scope.post = data
		
		})
		.error(function (errResponse, status) {
		$ionicPopup.alert({
				title: 'Tidak tersambung'
		});
		});
	}

	$scope.load()

}])
   
.controller('profilDetaileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {

	$scope.logout = function(){
		localStorage.setItem('id',undefined)
		window.location="/#/login"
	}
}])
   
.controller('adminCtrl', ['$scope', '$stateParams', '$http','$ionicPopup',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http,$ionicPopup) {


			
	user.avatar = localStorage.getItem("avatar")
	user.username = localStorage.getItem("username")
	user.email = localStorage.getItem("email")
	user.id = localStorage.getItem("id")
	
	$scope.user = user;
	$scope.post = []

	$scope.decode = function(s){
		return decodeURIComponent(s)
	}
	
	if(localStorage.getItem("id")=="undefined")
	{
		location.href = '/#/login';
	}

	$scope.$on('$ionicView.enter', function () { 
		$scope.load()
	});


	$scope.getDetailUser = function(index) {
		
		$http({
			method: "GET",
			url: url+"/v1/user/"+$scope.post[index].id_user
		})
		.success(function(data) {
		
			$scope.post[index].user = data
		})
		.error(function (errResponse, status) {
			$ionicPopup.alert({
					title: 'Tidak tersambung'
			});
		});
	}
	$scope.camera = function(){


		function onSuccess(imageData) {
		  
			post.image =  resizer("data:image/jpeg;base64," + imageData);

			
			
			setTimeout(function(){
				window.location = "/#/laporkan2"
			},0)
		}

		function onFail(message) {
		    alert('Failed because: ' + message);
		}
				/**
		 * Warning: Using DATA_URL is not recommended! The DATA_URL destination
		 * type is very memory intensive, even with a low quality setting. Using it
		 * can result in out of memory errors and application crashes. Use FILE_URI
		 * or NATIVE_URI instead.
		 */

		 console.log("camera clicked")
		navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
		    destinationType: Camera.DestinationType.DATA_URL
		});
	}



	$scope.load = function(){
		
		$http({
			method: "GET",
			url: url+"/v1/post/"
		})
		.success(function(data) {
			$scope.post = data
			console.log(data)
			for(x in $scope.post){
				$scope.getDetailUser(x)
			}
		})
		.error(function (errResponse, status) {
		$ionicPopup.alert({
				title: 'Tidak tersambung'
		});
		});
	}

	$scope.load()
}])
   
.controller('laporanCtrl', ['$scope', '$stateParams','$http','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$ionicPopup) {


	
	$scope.lapor = function(l){
		
		lapor = l;
		localStorage.setItem("idlapor",lapor._id)
		localStorage.setItem("glapor",lapor.image)
		localStorage.setItem("klapor",lapor.description)
		window.location = "/#/Admindetail"
	}


	$scope.cdate = function(d){
		date = new Date(d);
		year = date.getFullYear();
		month = date.getMonth()+1;
		dt = date.getDate();
		
		if (dt < 10) {
		  dt = '0' + dt;
		}
		if (month < 10) {
		  month = '0' + month;
		}
		
		return new Date(d).toDateString();	
	}
			
	user.avatar = localStorage.getItem("avatar")
	user.username = localStorage.getItem("username")
	user.email = localStorage.getItem("email")
	user.id = localStorage.getItem("id")
	
	$scope.user = user;
	$scope.post = []

	$scope.decode = function(s){
		return decodeURIComponent(s)
	}
	
	if(localStorage.getItem("id")==undefined)
	{
		location.href = '/#/login';
	}

	$scope.$on('$ionicView.enter', function () { 
		$scope.load()
	});


	$scope.getDetailUser = function(index) {
		
		$http({
			method: "GET",
			url: url+"/v1/user/"+$scope.post[index].id_user
		})
		.success(function(data) {
		
			$scope.post[index].user = data
		})
		.error(function (errResponse, status) {
			$ionicPopup.alert({
					title: 'Tidak tersambung'
			});
		});
	}
	$scope.camera = function(){


		function onSuccess(imageData) {
		  
			post.image =  resizer("data:image/jpeg;base64," + imageData);

			
			
			setTimeout(function(){
				window.location = "/#/laporkan2"
			},0)
		}

		function onFail(message) {
		    alert('Failed because: ' + message);
		}
				/**
		 * Warning: Using DATA_URL is not recommended! The DATA_URL destination
		 * type is very memory intensive, even with a low quality setting. Using it
		 * can result in out of memory errors and application crashes. Use FILE_URI
		 * or NATIVE_URI instead.
		 */

		 console.log("camera clicked")
		navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
		    destinationType: Camera.DestinationType.DATA_URL
		});
	}



	$scope.load = function(){
		
		$http({
			method: "GET",
			url: url+"/v1/post/"
		})
		.success(function(data) {
			$scope.post = data
			console.log(data)
			for(x in $scope.post){
				$scope.getDetailUser(x)
			}
		})
		.error(function (errResponse, status) {
		$ionicPopup.alert({
				title: 'Tidak tersambung'
		});
		});
	}

	$scope.load()
	
}])
   
.controller('pageCtrl', ['$scope', '$stateParams','$ionicPopup','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup,$http) {

	$scope.tolak = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: 'Tolak Laporan',
			template: 'Apakah anda yakin?',
			cancelText: 'Tidak',
			okText: 'Iya'
		}).then(function(res) {
			if (res) {
				console.log(res)
				$http({
					method: "PUT",
					url: url+"/v1/post/status/"+localStorage.getItem("idlapor"),
					data: JSON.stringify({status:"Ditolak"})
				})
				.success(function(data) {
				location.href = '/#/laporanadmin';

				})
				.error(function (errResponse, status) {
				$ionicPopup.alert({
						title: 'Terjadi kesalahan, coba kembali'
				});
				});
			}
		});
	}
		$scope.proses = function(){
			var confirmPopup = $ionicPopup.confirm({
				title: 'Proses Laporan',
				template: 'Apakah anda yakin?',
				cancelText: 'Tidak',
				okText: 'Iya'
			}).then(function(res) {
				if (res) {
					console.log(res)
					$http({
						method: "PUT",
						url: url+"/v1/post/status/"+localStorage.getItem("idlapor"),
						data: JSON.stringify({status:"Diproses"})
					})
					.success(function(data) {
					location.href = '/#/laporanadmin';
					
					})
					.error(function (errResponse, status) {
					$ionicPopup.alert({
							title: 'Terjadi kesalahan, coba kembali'
					});
					});
				}
			});


	}
	
	$scope.$on('$ionicView.enter', function () {
		$scope.lapor = lapor;
		$scope.lapor.image = 	localStorage.getItem("glapor")
		$scope.lapor.description = 	localStorage.getItem("klapor");
	});

}])
   
.controller('page2Ctrl', ['$scope', '$stateParams','$ionicPopup','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicPopup,$http) {


	$scope.$on('$ionicView.enter', function () { 
		$scope.postL = postL;
		loadL('myImage3','icon-gambar3',postL.image)
	});

	$scope.upload = function(){

		postL.description_done = document.getElementById("isi").value

		$http({
	        method: "PUT",
	        url: url+"/v1/post/done/"+localStorage.getItem("idlapor"),
	        data: JSON.stringify(postL)
	    })
	    .success(function(data) {
	       location.href = '/#/laporanadmin';
	    })
	    .error(function (errResponse, status) {
	       $ionicPopup.alert({
	            title: 'Terjadi kesalahan, coba kembali'
	       });
	    });
	}

	$scope.camera = function(){


		function onSuccess(imageData) {
		  
			loadL('myImage3','icon-gambar3',"data:image/jpeg;base64," + imageData)

		}

		function onFail(message) {
		    alert('Failed because: ' + message);
		}
				/**
		 * Warning: Using DATA_URL is not recommended! The DATA_URL destination
		 * type is very memory intensive, even with a low quality setting. Using it
		 * can result in out of memory errors and application crashes. Use FILE_URI
		 * or NATIVE_URI instead.
		 */

		navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
		    destinationType: Camera.DestinationType.DATA_URL
		});
	}


}])
 