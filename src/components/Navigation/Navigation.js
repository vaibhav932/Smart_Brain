import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) =>{
    if(isSignedIn){
    return (
       <nav style = {{display: 'flex' , justifyContent: 'flex-end'}}>
           <p className= "f3 link black pointer dim underline pa3" onClick={() =>onRouteChange('signout')} >Sign Out</p>
       </nav>
    )
    } else {
        return (
        <nav style = {{display: 'flex' , justifyContent: 'flex-end'}}>
        <p className= "f3 link black pointer dim underline pa3" onClick={() =>onRouteChange('signin')} >SignIn</p>
        <p className= "f3 link black pointer dim underline pa3" onClick={() =>onRouteChange('register')} >Register</p>
    </nav>
        );
    }
}

export default Navigation;