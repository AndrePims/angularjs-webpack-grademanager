/**
 * @ngdoc function
 * @name grademanagerApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the grademanagerApp
 */
export default function AppController($scope, $state, $stateParams, $timeout, $window, $location, auth, API) {
  'use strict';
  var _this = this;
  this.tabIndex = 0;
  this.tabInit = false;
  this.hideTabs = true;
  this.api = API;

  this.project = function () {
    return $stateParams.project;
  };

  this.getUsername = function () {
    return auth.getUsername();
  };

  this.getUser = function () {
    return auth.getUser();
  };

  this.isAuthed = function () {
    var authed = auth.isAuthed();
    if (!authed && !$state.is('home')) {
      $timeout(function () {
        $state.go('home');
      });
    }
    return authed;
  };

  this.logout = function () {
    auth.logout();
    _this.go('home');
  };

  this.go = function (state) {
    if (_this.tabInit && !$state.includes(state)) {
      $state.go(state, { project: $stateParams.project });
    } else {
      _this.tabInit = true;
    }
  };

  this.linkTo = function (file) {
    return API.URL + '/project/' + $stateParams.project + '/static/' + file + '?token=' + auth.getToken();
  };

  $scope.$on('$stateChangeSuccess', function () {
    if ($window.ga) {
      $window.ga('send', 'pageview', $location.path());
    }
    _this.hideTabs = true;
    if ($state.includes('edit')) {
      _this.tabIndex = 0;
      _this.hideTabs = false;
    }
    if ($state.includes('scan')) {
      _this.tabIndex = 1;
      _this.hideTabs = false;
    }
    if ($state.includes('grade')) {
      _this.tabIndex = 2;
      _this.hideTabs = false;
    }
    if ($state.includes('options')) {
      _this.tabIndex = 3;
      _this.hideTabs = false;
    }
    if ($state.includes('history')) {
      _this.tabIndex = 4;
      _this.hideTabs = false;
    }
  });
}
