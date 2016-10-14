/// <reference path="../angular.js" />

angular.module("mainModule")
    .service("chatsApi", [

        "$http",
        "$q",
        function ($http, $q) {
            var api = "http://code.webonmaster.com/api";  //defining the API URL
            var channels = api + "/channels";            // Defining the channels api url



            //Get Channels
            this.getChannels = function () {
                var deferred = $q.defer();

                $http.get(channels)
                    .then(function (response) {
                        this.channels = response.data;
                        deferred.resolve(response.data);
                    }, function () {
                        deferred.resolve([]);

                    });

                return deferred.promise;
            };

        }


    ]);