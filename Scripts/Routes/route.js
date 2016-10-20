/// <reference path="../angular.js" />

angular.module("mainModule")
    .config([
        "$routeProvider",
        "$locationProvider",

        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider
                .when("/",
                {
                    templateUrl: "Views/Channels/Channels.html",
                    controller: "ChannelsController",
                    caseInsensitiveMatch: true,
                    activeTab: 'Channels'

                })

                .when("/Channel/:id",
                {
                    templateUrl: "Views/Channels/ChannelMessages.html",
                    controller: "ChannelController",
                    caseInsensitiveMatch: true,
                    activeTab: 'Channels'

                })
                .when("/Admin", {

                    templateUrl: "Views/Admin/Admin.html",
                    controller: "AdminController",
                    caseInsensitiveMatch: true,
                    activeTab:'Admin'
                })
                .otherwise({
                    redirectTo: "/"
                });


        }
    ]);