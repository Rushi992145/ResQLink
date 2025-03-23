import { createSlice } from "@reduxjs/toolkit";

const getToken = ()=>{
  const token = localStorage.getItem("token");
  try 
  {
    return token ? token : null;
  }
  catch(error)
  {
    console.log("error is parsing or getting token from local storage",error.message);
    return null;
  }
}

const getRole = ()=>{
  const role = localStorage.getItem("role");
  try 
  {
    return role ? role : null;
  }
  catch(error)
  {
    console.log("error is parsing or getting role from local storage",error.message);
    return null;
  }
}

const getEmail = ()=>{
  const email = localStorage.getItem("email");
  try 
  {
    return email ? email : null;
  }
  catch(error)
  {
    console.log("error is parsing or getting email from local storage",error.message);
    return null;
  }
}

const getName = ()=>{
  const name = localStorage.getItem("name");
  try 
  {
    return name ? name : null;
  }
  catch(error)
  {
    console.log("error is parsing or getting name from local storage",error.message);
    return null;
  }
}

const getId = ()=>{
  const id = localStorage.getItem("id");
  try 
  {
    return id ? id : null;
  }
  catch(error)
  {
    console.log("error is parsing or getting id from local storage",error.message);
    return null;
  }
}

const getFcmToken = ()=>{
  const fcm_token = localStorage.getItem("fcm_token");
  try 
  {
    return fcm_token ? fcm_token : null;
  }
  catch(error)
  {
    console.log("error is parsing or getting fcm_token from local storage",error.message);
    return null;
  }
}

const getLongitude = ()=>{
  const longitude = localStorage.getItem("longitude");
  try 
  {
    return longitude ? longitude : null;
  }
  catch(error)
  {
    console.log("error is parsing or getting longitude from local storage",error.message);
    return null;
  }
}

const getLattitude = ()=>{
  const lattitude = localStorage.getItem("lattitude");
  try 
  {
    return lattitude ? lattitude : null;
  }
  catch(error)
  {
    console.log("error is parsing or getting lattitude from local storage",error.message);
    return null;
  }
}




const initialState = {
    token : getToken(),
    role : getRole(),
    email : getEmail(),
    name : getName(),
    id : getId(),
    fcm_token : getFcmToken(),
    longitude : getLongitude(),
    lattitude : getLattitude()
}


const authSlice = createSlice({
   name : "auth",
   initialState : initialState,
   reducers : {
    setToken(state,value){
        state.token = value.payload;
    },
    setRole(state,value){
      state.role = value.payload;
    },
    setEmail(state,value){
      state.email = value.payload;
    },
    setName(state,value){
        state.name = value.payload;
    },
    setId(state,value){
        state.id = value.payload;
    },
    setFcmToken(state,value){
      state.fcm_token = value.payload;
    },
    setLongitude(state,value){
      state.longitude = value.payload;
    },
    setLattitude(state,value){
      state.lattitude = value.payload;
    },
   }
})

export const {setToken,setRole,setEmail,setName,setId,setFcmToken,setLongitude,setLattitude} = authSlice.actions;
export const authReducer = authSlice.reducer;