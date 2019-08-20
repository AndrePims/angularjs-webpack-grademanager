/**
 * @ngdoc function
 * @name grademanagerApp.controller:AssociationCtrl
 * @description
 * # AssociationCtrl
 * Controller of the grademanagerApp
 */
export default function AssociationController($mdDialog, row, API, students, scores, unmatched, $stateParams, auth, $sce, $http) {
  'use strict';
  var ctrl = this;
  ctrl.scores = scores;
  ctrl.unmatched = unmatched;
  ctrl.students = students;

  ctrl.filterUnmatched = function (item) {
    return !ctrl.scores.hasOwnProperty(item.id);
  };

  ctrl.nameSrc = function () {
    if (ctrl.match && ctrl.match.image) {
      return $sce.trustAsResourceUrl(API.URL + '/project/' + $stateParams.project + '/static/cr/' + ctrl.match.image + '?token=' + auth.getToken());
    }
    return '';
  };

  function find(names, item) {
    for (var i = 0; i < names.length; i++) {
      if (names[i].student === item.student && names[i].copy === item.copy) {
        return names[i];
      }
    }
    return undefined;
  }

  $http.get(API.URL + '/project/' + $stateParams.project + '/names')
  .then(function (r) {
    var names = r.data;
    ctrl.names = names;
    ctrl.match = find(names, row) || ctrl.nextUnmatched();
  });

  ctrl.unmatchedRemaining = Object.keys(ctrl.unmatched).length;

  ctrl.nextUnmatched = function () {
    return ctrl.names.filter(function (item) {
      return !item.auto && !item.manual && !item.skip;
    }).pop();
  };

  ctrl.selectedItemChange = function (item) {
    if (item && item.id) {
      ctrl.match.manual = item.id;
      var key = ctrl.match.student + ':' + ctrl.match.copy;
      var score = ctrl.unmatched[key];
      if (score) {
        score.id = item.id;
        ctrl.scores[score.id] = score;
        delete ctrl.unmatched[key];
        $http.post(API.URL + '/project/' + $stateParams.project + '/association/manual', {
          student: score.student,
          copy: score.copy,
          id: score.id
        });
      }
      ctrl.match = ctrl.nextUnmatched();
      ctrl.searchText = '';
      ctrl.selectedItem = undefined;
      ctrl.unmatchedRemaining = Object.keys(ctrl.unmatched).length;
    }
  };

  ctrl.skip = function () {
    ctrl.match.skip = true;
    ctrl.match = ctrl.nextUnmatched();
  };

  ctrl.closeDialog = function () {
    $mdDialog.hide();
  };

}
