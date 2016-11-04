/// <reference path="../../angular.js" />

angular.module("mainModule")
	.controller("AdminController", [
		"$scope",

		function ($scope) {
		    $scope.title = "Administration";

		}
	]);