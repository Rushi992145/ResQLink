import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";

const firebaseConfig = { 
    apiKey: "AIzaSyCK8TcarwLuLAMt9usvddHibKTpwXqBt8g",
    authDomain: "resqlink-5f958.firebaseapp.com",
    projectId: "resqlink-5f958",
    storageBucket: "resqlink-5f958.firebasestorage.app",
    messagingSenderId: "756618073535",
    appId: "1:756618073535:web:d7a2f6d8d219ebfc27bd0a"
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
            const token = await getToken(messaging, {vapidKey : "BMnapeQOzeeydZuy6keuDA3ZSTV4lhzGmrKNAeDwlmdU_5o90XHT-15fEtGx_4HP1u6-Nz9wJVej5ZUANLIi20s"});
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