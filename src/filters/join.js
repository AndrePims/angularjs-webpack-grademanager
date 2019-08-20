/**
 * @ngdoc filter
 * @name grademanagerApp.filter:htmlToPlaintext
 * @function
 * @description
 * # htmlToPlaintext
 * Filter in the grademanagerApp.
 */
export default function join() {
  'use strict';
  return function (array, char) {
    if (angular.isArray(array)) {
      return array.join(char);
    }
    return array;
  };
}
