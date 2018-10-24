import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import '@uirouter/angularjs/lib/legacy/stateEvents.js';
import './css/style.css';
import ngResource from 'angular-resource';
import uiBootstrap from 'angular-bootstrap-npm';
import ngStorage from 'ngstorage';
import {AuthenticationController, RegisterController, ProfileController, JournalController} from './controllers/controller';
import {RegisterService, AuthenticationService, AccountService, JentryService} from './services/services';

  angular.module('backendPostman', [uirouter, ngResource, uiBootstrap, 'ngStorage', 'ui.router.state.events'])
  .service('RegisterService', RegisterService)
  .service('AuthenticationService', AuthenticationService)
  .service('AccountService', AccountService)
  .service('JentryService', JentryService)
  .controller('AuthenticationController', AuthenticationController)
  .controller('RegisterController', RegisterController)
  .controller('ProfileController', ProfileController)
  .controller('JournalController', JournalController)
  .config(routing)
  .run(($rootScope, $state, AccountService) => {
            $rootScope.$on('$stateChangeStart', (e, to) => {
                // protect non-public views
                if (to.data && to.data.requiresAuthentication) {
                    if (!AccountService.isLoggedIn()) {
                        e.preventDefault();
                        $state.go('login');
                    }
                }
            });
    });

  routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  function routing($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl:'./views/login.html',
        controller: AuthenticationController,
        controllerAs: 'Acontroller',
      })
      .state('register', {
        url: '/users/register',
        templateUrl:'./views/register.html',
        controller: RegisterController,
        controllerAs: 'Rcontroller'
      })
      .state('profile', {
        url: '/users/profile',
        templateUrl:'./views/profile.html',
        controller: ProfileController,
        controllerAs: 'Pcontroller',
        data: {
                  requiresAuthentication: true
              }
      })
      .state('journalentries', {
        url: '/users/journalentries',
        templateUrl:'./views/journalentries.html',
        controller: JournalController,
        controllerAs: 'Jcontroller',
        data: {
                  requiresAuthentication: true
              }
      })
      .state('notFound', {
        url: '/notFound',
        templateUrl: './views/notFound.html'
      });
      $urlRouterProvider.otherwise('/notFound');
      $locationProvider.html5Mode(true);
  }
