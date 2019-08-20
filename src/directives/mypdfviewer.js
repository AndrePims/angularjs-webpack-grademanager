 /**
 * @ngdoc directive
 * @name grademanagerApp.directive:myPdfViewer
 * @description
 * # myPdfViewer
 */
//import pdflib from 'pdfjs-dist';
//require('pdfjs-dist/web/pdf_viewer');

 //import PDFJS from 'pdfjs-dist';


 import PDFJS from 'pdfjs-dist/web/pdf_viewer';
 //PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker');

//require('pdfjs-dist/lib/display/node_stream')
// require('pdfjs-dist/build/pdf.js');
//  require('pdfjs-dist/web/pdf_viewer.js');

export default function myPdfViewer() {
  'use strict';
  return {
    template: '<div class="pdfViewer"></div>',
    restrict: 'E',
    scope: {
      src: '@pdf',
      viewer: '='
    },
    link: function postLink(scope, element) {
      PDFJS.disableStream = true;
      var container = element[0];
      var pdfViewer = new PDFJS.PDFViewer({
        container: container
      });

      scope.viewer = pdfViewer;

      container.addEventListener('pagesinit', function () {
        // we can use pdfViewer now, e.g. let's change default scale.
        pdfViewer.currentScaleValue = 'page-width';
      });

      container.addEventListener('scroll', function () {
        // we can use pdfViewer now, e.g. let's change default scale.
        scope.$apply();
      });

      scope.$watch('src', function (newValue) {
        // Loading document.
        if (newValue) {
          PDFJS.getDocument(newValue).then(function (pdfDocument) {
            // Document loaded, specifying document for the viewer.
            pdfViewer.setDocument(pdfDocument);
          });
        }
      });
    }
  };
}
