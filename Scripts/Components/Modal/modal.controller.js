/// <reference path="../../angular.js" />

angular.module("mainModule")
    .controller("ModalController", [
        "$scope",
        "$uibModalInstance",
        function ($scope, $uibModalInstance) {
            $scope.ok = function () {
                $uibModalInstance.close();

            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');

            };
        }


    ]);