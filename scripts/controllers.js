
//实例一个模块，用来专门管理所有的控制器
angular.module('Controllers',[])

.controller('DemoController',['$scope',function($scope){
	console.log('测试controller代码');
}])

//导航菜单
.controller('NavController',['$scope',function($scope){
	$scope.navs=[
	{link:'#/today',text:'今日一刻',icon:'icon-home'},
	{link:'#/older',text:'往期内容',icon:'icon-file-empty'},
	{link:'#/author',text:'热门作者',icon:'icon-pencil'},
	{link:'#/category',text:'栏目浏览',icon:'icon-menu'},
	{link:'#/favourite',text:'我的喜欢',icon:'icon-heart'},
	{link:'#/settings',text:'设置',icon:'icon-cog'},
	]
}])

//今日一刻
.controller('TodayController',['$scope','$http','$filter','$rootScope',function($scope,$http,$filter,$rootScope){
	//获取计算机时间
	var today = $filter('date')(new Date,'yyyy-MM-dd');

	$rootScope.title = '今日一刻';
	$rootScope.index = 0;
	$rootScope.loaded = false;

	$http({
		url:'./api/today.php',
		method:'get',
		params:{today:today}
	}).success(function(info){
		$rootScope.loaded = true;
		//文章数据
		$scope.posts = info.posts;
		//日期
		$scope.date = info.date;
	});
}])
//往期内容
.controller('OlderController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '往期内容';
	$rootScope.index = 1;
	$rootScope.loaded = false;
	$http({
		url:'./api/older.php'
	}).success(function(info){
		$rootScope.loaded = true;
		//文章数据
		$scope.posts = info.posts;
		//日期
		$scope.date = info.date;
	});
}])

//热门作者
.controller('AuthorController',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
	$rootScope.title = '热门作者';
	$rootScope.index = 2;
	$rootScope.loaded = false;
	$http({
		url:'./api/author.php'
	}).success(function(info){
		$rootScope.loaded = true;
		//文章数据
		$scope.rec = info.rec;
		$scope.all = info.all;
		
	});

}]);