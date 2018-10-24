//Register New User
export class RegisterService {
  constructor($http) {
    this.$http = $http
  }
  newUser(user){
      this.$http.post('/users/register', user)
      .then((response) => {
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
RegisterService.$inject = ['$http']


// Authenticate Login and Save JWT + UserData to localStorage
export class AuthenticationService {
  constructor($http, $localStorage) {
    this.$http = $http;
    this.$localStorage = $localStorage;
}
    Login(username, password, callback) {
      this.$http.post('/users/login', {username: username, password: password})
      .then((res) => {
        if(res.data.success === true){
          this.$http.defaults.headers.common.Authorization = 'jwt ' + res.data.token;
          this.$localStorage.currentUser = {id: res.data.id, name: res.data.name, username: res.data.username, email: res.data.email, username: username, token: res.data.token};
          return callback(true)
        }else{
          console.log("Wrong username or Password")
          return callback(false)
        }
      });
    }

    Logout(callback) {
      delete this.$localStorage.currentUser;
      delete this.$localStorage.userData
      this.$http.defaults.headers.common.Authorization = '';
      callback();
    }
  }
AuthenticationService.$inject = ['$http', '$localStorage']


// Confirm if the User is logged in and parse Userdata to json
export class AccountService {
  constructor($localStorage, $http) {
    this.$localStorage = $localStorage;
    this.$http = $http
}
         isLoggedIn() {
           console.log('I was called')
           // var currentUser = this.$localStorage.currentUser
            if(localStorage.getItem('ngStorage-currentUser')){
              return true;
            }else{
            return false;
        }
      }

      parseUserData(){
          var userData = JSON.parse(localStorage.getItem('ngStorage-currentUser'))
          return userData;
      }
    }

AccountService.$inject = ['$localStorage', '$http']


export class JentryService {
  constructor($localStorage, $http, user){
    this.$http = $http;
    this.localStorage = $localStorage;
    this.data = JSON.parse(localStorage.getItem('ngStorage-currentUser'));
  }
  addjournalEntry(jentry){
    var str = this.data.token;
    var token = str.toString();
    // console.log(user)
    this.$http.post('/users/profile', jentry, {headers: {'Content-Type': 'application/json', 'Authorization': token }})
    .then((response) => {
      if(response){
      console.log(response)
    }
    })
    .catch((err) => {
      console.log(err)
    })
  }
  listJournalEntries(data){
    var str = this.data.token;
    var token = str.toString();
    var jentries
    this.$http.post('/users/journalentries', data, {headers: {'Content-Type': 'application/json', 'Authorization': token }})
    .then((res, err) => {
      if(res.data.success === true){
        jentries = JSON.stringify(res.data.jentry);
        var newArr = JSON.parse(jentries);
console.log(newArr);
      }else{
        console.log("error")
    }
    })
    .catch((res) => {
        console.log(res.data)
        return res;
    });
 }
}


JentryService.$inject = ['$localStorage', '$http']
