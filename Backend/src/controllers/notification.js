import User from '../models/user.model.js';
import Fcm_Token from "../models/fcm_token.js"
import admin from '../config/firebaseadmin.js';

async function notify(title,body,fcm_token)
{
    const message = {
        notification : {
            title,body
        },
        token : fcm_token
    }

    try 
    {
        const response = await admin.messaging().send(message);
        return response;
    }
    catch(error)
    {
        console.log(error.message);
    }
}

const sendNotification = async (req, res) => {
    try {
        const { title, body } = req.body;
        const fcm_token_array = await Fcm_Token.find({}, { fcm_token: 1, _id: 0 });
        
        console.log("fcm_token is ",fcm_token_array)

        for (const fcm_token_obj of fcm_token_array) {
            await notify(title, body, fcm_token_obj.fcm_token);
        }

        return res.status(200).json({
            success: true,
            message: "Notifications sent successfully",
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: "Error occurred",
            error: error.message
        });
    }
};
 

const saveUser = async (req,res) =>{
    try 
    {
        const { fcm_token} = req.body;
        
        const fcm_token_exist = await Fcm_Token.find({fcm_token});

        console.log(fcm_token_exist.length)
        if(fcm_token_exist.length>0)
        {
            return res.status(400).json({
                success : false,
                message : "Token already registered"
            })
        }

        const fcm_token_saved = await Fcm_Token.create({fcm_token : fcm_token});        

        console.log(fcm_token_saved);
        return res.status(200).json({
            success : true,
            message : "fcm_token saved successfully",
            data : fcm_token_saved
        })
    }
    catch(error)
    {
        console.log(error.message);
    }
}

export {sendNotification,saveUser};