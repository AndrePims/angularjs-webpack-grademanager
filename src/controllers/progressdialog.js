/**
 * @ngdoc function
 * @name grademanagerApp.controller:ProgressdialogCtrl
 * @description
 * # ProgressdialogCtrl
 * Controller of the grademanagerApp
 */
export default function ProgressDialogController($mdDialog, API) {
  'use strict';
  var ctrl = this;
  ctrl.api = API;

  ctrl.closeDialog = function () {
    $mdDialog.hide();
  };
}
