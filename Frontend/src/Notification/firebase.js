import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyD9NQWsWTfaULAj5Hpxv3k6XvOM-XRQg5I",
    authDomain: "disaster-relief-37cdd.firebaseapp.com",
    projectId: "disaster-relief-37cdd",
    storageBucket: "disaster-relief-37cdd.firebasestorage.app",
    messagingSenderId: "439591138753",
    appId: "1:439591138753:web:1086fd068290817f80ab40"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async() =>{
    const permission = await Notification.requestPermission();
    console.log("permission is :",permission);
    try 
    {
        if(permission=='granted')
        {
            const token = await getToken(messaging, {vapidKey : "BBWzt30wOxipq63aog-ABg282aLFW1zZ0Gu4jFqFJ6oJtKgNy_pPcVwcC169ei9JcdDa-hbS9nb6_bfPYtCeAwA"});
            console.log("token is :",token);
            return token;
        }
        else
        {
            console.log("Notification access is required");
        }
    }
    catch(error)
    {
        console.log(error.message);
    }
}