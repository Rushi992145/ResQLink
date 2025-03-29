import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyB0eQJD0sBLaFI447U3fzHz8J3vrL1yXcg",
    authDomain: "disaster-relief-22af7.firebaseapp.com",
    projectId: "disaster-relief-22af7",
    storageBucket: "disaster-relief-22af7.firebasestorage.app",
    messagingSenderId: "405605884653",
    appId: "1:405605884653:web:c27c03b0db0541d27322e4"
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
            const token = await getToken(messaging, {vapidKey : "BBWzt30wOxipq63aog-BJXopwzofNE3InEkNQxa2PhBaDvFiyOO2vrmpdoqC9H9JXWYunLOc5SRhSiWmCht1IIWXnXDaYCFbmA4bCGOCkA-hbS9nb6_bfPYtCeAwA"});
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