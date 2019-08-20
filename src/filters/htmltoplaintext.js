/**
 * @ngdoc filter
 * @name grademanagerApp.filter:htmlToPlaintext
 * @function
 * @description
 * # htmlToPlaintext
 * Filter in the grademanagerApp.
 */
export default function htmlToPlaintext() {
  'use strict';
  return function (text) {
    return String(text).replace(/<[^>]+>/gm, '').replace(/&nbsp;/gm, ' ');
  };
}
