import angular from 'angular';
import style from './assets/scss/main.scss';

//Packages
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngMessages from 'angular-messages';
import ngRoute from 'angular-route';
import uiTree from 'angular-ui-tree';
import uiRouter from '@uirouter/angularjs/release/angular-ui-router.js';
import uiRouterStateEvents from '@uirouter/angularjs/release/stateEvents.js';
import ngFileUpload from 'ng-file-upload';
import uiCodeMirror from 'angular-ui-codemirror/src/ui-codemirror.js';
import validationmatch from 'angular-validation-match';
import duScroll from 'angular-scroll';
import mddatatable from 'angular-material-data-table';
import PDFJS from 'pdfjs-dist';

//Factory
import authInterceptor from "./services/authinterceptor";
//Services
import API from "./services/api";
import auth from "./services/auth";
import exam from "./services/exam";
import myPdfViewer from "./directives/mypdfviewer";
import panZoom from "./directives/panzoom";
import stringToNumber from "./directives/stringtonumber";
import join from "./filters/join";
import unique from "./filters/unique";
import htmlToPlaintext from "./filters/htmltoplaintext";
import AppController from './controllers/app';
import HomeController from './controllers/home';
import EditController from "./controllers/edit";
import myRichTextEditor from "./directives/myrichtexteditor";
import GradeController from "./controllers/grade";
import OptionsController from "./controllers/options";
import HistoryController from "./controllers/history";
import ProgressDialogController from "./controllers/progressdialog";
import ProfileController from "./controllers/profile";
import PromptDialogController from "./controllers/promptdialog";
import EditPreviewController from "./controllers/editpreview";
import PropertiesManagerController from "./controllers/propertiesmanager";
import AssociationController from "./controllers/association";
import CodeEditorController from "./controllers/codeeditor";
import GraphicsManagerController from "./controllers/graphicsmanager";
import ScanController from "./controllers/scan";
import ScanPreviewController from "./controllers/scanpreview";
var Raven = require('raven-js');

if (window.hasOwnProperty('Raven')) {
  Raven.config('https://1e8632b672284ea09d094bcf0670addf@sentry.j42.org/6', {
    // we highly recommend restricting exceptions to a domain in order to filter out clutter
    whitelistUrls: [/amcui.ig.he-arc.ch/, /localhost/]
  }).addPlugin(require('raven-js/plugins/angular'), angular).install();
} else {
  Raven = false;
}


if (ON_TEST) {
  require('angular-mocks/angular-mocks');
}

angular.module('grademanagerApp', [
  'ngRaven',
  'ngAnimate',
  'ngMessages',
  'ngRoute',
  'ngSanitize',
  'ngMaterial',
  'ui.tree',
  'ui.router',
  'ui.router.state.events',
  'IeHelper',
  'ngFileUpload',
  'ui.codemirror',
  'validation.match',
  'duScroll',
  'md.data.table'
  //  'PDFJS'
]).config(function ($stateProvider, $urlRouterProvider) {
  'use strict';
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home'
    })
  .state('profile', {
    url: '/profile',
    templateUrl: 'src/views/profile.html',
    controller: 'ProfileCtrl',
    controllerAs: 'profile'
  })
  .state('edit', {
    url: '/:project/edit',
    templateUrl: 'src/views/edit.html',
    controller: 'EditCtrl',
    controllerAs: 'editor',
    reloadOnSearch: false
  })
  .state('scan', {
    url: '/:project/scan',
    templateUrl: 'src/views/scan.html',
    controller: 'ScanCtrl',
    controllerAs: 'scan'
  })
  .state('scan.manual', {
    url: '/:student/:page\::copy',
    templateUrl: 'src/views/scan.preview.html',
    controller: 'ScanPreviewCtrl',
    controllerAs: 'preview'
  })
  .state('grade', {
    url: '/:project/grade',
    templateUrl: 'src/views/grade.html',
    controller: 'GradeCtrl',
    controllerAs: 'grade'
  })
  .state('options', {
    url: '/:project/options',
    templateUrl: 'src/views/options.html',
    controller: 'OptionsCtrl',
    controllerAs: 'ctrl'
  })
  .state('history', {
    url: '/:project/history',
    templateUrl: 'src/views/history.html',
    controller: 'HistoryCtrl',
    controllerAs: 'ctrl'
  })
  .state('admin_stats', {
    url: '/admin/stats',
    templateUrl: 'src/views/admin/stats.html',
    controller: 'AdminStatsCtrl',
    controllerAs: 'ctrl'
  });
})
.config(function ($mdIconProvider) {
  'use strict';
  $mdIconProvider.defaultFontSet('mdi');
})
.config(function ($mdThemingProvider) {
  'use strict';
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('grey', {
    default: '200'
  });
})
.config(function ($httpProvider) {
   'use strict';
   $httpProvider.interceptors.push('authInterceptor');
})
.value('duScrollGreedy', true)
.value('duScrollBottomSpy', true)
.controller('AppCtrl', AppController)
.controller('HomeCtrl', HomeController)
.controller('EditCtrl', EditController)
.controller('GradeCtrl', GradeController)
.controller('OptionsCtrl', OptionsController)
.controller('HistoryCtrl', HistoryController)
.controller('ProgressDialogCtrl', ProgressDialogController)
.controller('ProfileCtrl', ProfileController)
.controller('PromptDialogCtrl', PromptDialogController)
.controller('EditPreviewCtrl', EditPreviewController)
.controller('PropertiesManagerCtrl', PropertiesManagerController)
.controller('AssociationCtrl', AssociationController)
.controller('CodeEditorCtrl', CodeEditorController)
.controller('GraphicsManagerCtrl', GraphicsManagerController)
.controller('ScanCtrl', ScanController)
.controller('ScanPreviewCtrl', ScanPreviewController)
.directive('panZoom', panZoom)
.directive('myRichTextEditor', myRichTextEditor)
.directive('myPdfViewer', myPdfViewer)
.directive('stringToNumber', stringToNumber)
.service('API', API)
.factory('authInterceptor', authInterceptor)
.service('auth', auth)
.service('exam', exam)
.filter('htmlToPlaintext', htmlToPlaintext)
.filter('join', join)
.filter('unique', unique)

//http://stackoverflow.com/questions/15895483/angular-ng-href-and-svg-xlink
angular.forEach([
  { ngAttrName: 'ngXlinkHref', attrName: 'xlink:href' }
], function (pair) {
  'use strict';
  var ngAttrName = pair.ngAttrName;
  var attrName = pair.attrName;

  angular.module('grademanagerApp').directive(ngAttrName, ['IeHelperSrv', function (IeHelperSrv) {
    return {
      priority: 99,
      link: function (scope, element, attrs) {
        attrs.$observe(ngAttrName, function (value) {
          if (!value) {
            return;
          }
          attrs.$set(attrName, value);
          if (IeHelperSrv.isIE) {
            element.prop(attrName, value);
          }
        });
      }
    };
  }]);
});

var checkForIE = {
  init: function () {
    'use strict';
    this.isIE = (navigator.userAgent.indexOf('MSIE') !== -1);
  }
};

angular.module('IeHelper', []).factory('IeHelperSrv', function () {
  'use strict';

  return {
    isIE: checkForIE.isIE
  };
});

checkForIE.init();