export class RegisterController {
  constructor($location, RegisterService) {
    this.RegisterService = RegisterService;
    this.$location = $location;
  }
  addUser(err){
    this.RegisterService.newUser(this.user)
    if(err){
      console.log(err)
    }else{
      this.$location.path('/login');
    }
  }
}
RegisterController.$inject = ['$location', 'RegisterService'];

export class AuthenticationController {
  constructor($location, AuthenticationService, AccountService, $scope) {
    this.AuthenticationService = AuthenticationService;
    this.AccountService = AccountService;
    this.userData = AccountService.parseUserData();
    this.$location = $location;
  }

  login() {
    this.loading = true;
    this.AuthenticationService.Login(this.username, this.password, (result) => {
      if (result === true) {
        this.$location.path('/users/profile')
      }else{
        this.error = "Username or Password is Incorrect";
        this.loading = false;
      }
    })
  };
};

AuthenticationController.$inject = ['$location', 'AuthenticationService', 'AccountService'];

export class ProfileController {
  constructor($location, AuthenticationService, AccountService, $scope, JentryService, $state) {
this.AuthenticationService = AuthenticationService;
this.AccountService = AccountService;
this.JentryService = JentryService;
this.$location = $location;
this.$state = $state;
this.currentUser = AccountService.parseUserData();
$scope.name = this.currentUser.name;

}

  addJentry(){
    this.JentryService.addjournalEntry(this.jentry)
    let journalEntry = this.jentry.journalEntry;
    let mood = this.jentry.mood;

    let jEntry = {
      'journalEntry': this.jentry.journalEntry,
      'mood': this.jentry.mood,
    }
    // console.log(jEntry)

  }
  logout() {
    this.AuthenticationService.Logout((result) => {
      this.$location.path('/login');
    })
  };
 }
ProfileController.$inject = ['$location', 'AuthenticationService', 'AccountService', '$scope', 'JentryService', '$state'];

export class JournalController {
  constructor(AccountService, $scope, AuthenticationService, $location, JentryService) {
    this.AuthenticationService = AuthenticationService;
    this.JentryService = JentryService;
    this.currentUser = AccountService.parseUserData();
    this.$location = $location;
    $scope.name = this.currentUser.name;
    this.jentries = JentryService.listJournalEntries();


  }

  showJentries(){
    this.JentryService.listJournalEntries()
    this.jentries
   console.log(this.jentries);
  }


  logout() {
    this.AuthenticationService.Logout((result) => {
      this.$location.path('/login');
    })
  };
 }

JournalController.$inject = ['AccountService', '$scope', 'AuthenticationService', '$location', 'JentryService'];
