import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";
import { onMessage } from "firebase/messaging";
import { toast } from "react-hot-toast";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log("permission is :", permission);
  try {
    if (permission == 'granted') {
      const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
      console.log("token is :", token);
      return token;
    }
    else {
      console.log("Notification access is required");
    }
  }
  catch (error) {
    console.log(error.message);
  }
}

onMessage(messaging, (payload) => {
  console.log("FCM foreground payload:", payload);

  const title = payload?.notification?.title || "Notification";
  const body = payload?.notification?.body || payload?.data?.body || "";

  // in-app toast (avoid relative positioning)
  toast(body, {
    style: {
      zIndex: 999999
    }
  });

  // show a system notification when permission is granted
  if (typeof window !== "undefined" && "Notification" in window) {
    if (Notification.permission === "granted") {
      try {
        new Notification(title, { body });
      } catch (e) {
        console.warn("System Notification failed:", e);
      }
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((perm) => {
        if (perm === "granted") {
          try {
            new Notification(title, { body });
          } catch (e) {
            console.warn("System Notification failed:", e);
          }
        }
      });
    }
  }
});