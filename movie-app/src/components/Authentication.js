class Authentication{
    registerSuccessfulLogin(username, password){

        //console.log('registerSuccessful')
        sessionStorage.setItem('authenticatedUser',username);
        //this.isUserLoggedIn();

    }

    logout(){
        //console.log('logoutSuccessful')
        sessionStorage.removeItem('authenticatedUser');
        //this.isUserLoggedIn();
    }

    // review(){
    //     console.log('reviewpage')
        
        
    // }

    isUserLoggedIn(){
        //console.log('isuserloggedIn')
        let user=sessionStorage.getItem('authenticatedUser')
        if(user===null) return false
        return true
    }

    getLoggedInUserName(){
        //console.log('getloggedInUsername')
        let user=sessionStorage.getItem('authenticatedUser')
        if(user===null) return ''
        return user
    }

}
export default new Authentication()