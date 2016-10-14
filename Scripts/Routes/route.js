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
                    templateUrl: "Views/Home.html",
                    controller: "HomeController",
                    caseInsensitiveMatch: true,
                    activeTab: 'Home'

                })
                .when("/Channels",
                {
                    templateUrl: "Views/Channels/Channels.html",
                    controller: "ChannelsController",
                    caseInsensitiveMatch: true,
                    activeTab: 'Channels'

                })
                .when("/Channel/:id/Messages",
                {
                    templateUrl: "Views/Channels/ChannelMessages.html",
                    controller: "ChannelController",
                    caseInsensitiveMatch: true,
                    activeTab: 'Channels'

                })
                .otherwise({
                    redirectTo: "/"
                });


        }
    ]);