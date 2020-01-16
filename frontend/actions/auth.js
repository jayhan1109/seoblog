import axios from "axios";
import cookie from 'js-cookie';
import { API } from "../config";

export const signup = async user => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };  

  const body = JSON.stringify(user);
  try {
    const res = await axios.post(`${API}/signup`, body, config);    
    return res;
  } catch (err) {    
    return err.response.data
  }
};

export const signin = async user => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };  

  const body = JSON.stringify(user);
  try {
    const res = await axios.post(`${API}/signin`, body, config);    
    return res;
  } catch (err) {    
    return err.response.data
  }
};

export const signout =async next=>{
  removeCookie('token');
  removeLocalStorage('user');
  next();

  try {
    await axios.get(`${API}/signout`);
    console.log('Signout Sccess');
  } catch (err) {
    console.log(err);
  } 
}

// set cookie
export const setCookie=(key,value)=>{
  if(process.browser){
    cookie.set(key,value,{
      expires:1
    })
  }
}


export const removeCookie=(key)=>{
  if(process.browser){
    cookie.remove(key,{
      expires:1
    })
  }
}

// get cookie
export const getCookie=(key)=>{
  if(process.browser){
    return cookie.get(key);
  }
}
// localstorage
export const setLocalStorage=(key,value)=>{
  if(process.browser){
    localStorage.setItem(key,JSON.stringify(value))
  }
}

export const removeLocalStorage=(key)=>{
  if(process.browser){
    localStorage.removeItem(key)
  }
}

// authenticate user by pass data to cookie and localstorage
export const authenticate=(data,next)=>{
  setCookie('token',data.token);
  setLocalStorage('user',data.user);
  next();
}

export const isAuth=()=>{
  if(process.browser){
    const cookieChecked = getCookie('token');
    if(cookieChecked){
      if(localStorage.getItem('user')){
        return JSON.parse(localStorage.getItem('user'));
      }else{
        return false;
      }
    }
  }
}