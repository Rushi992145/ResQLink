import User from '../models/user.model.js';
import Fcm_Token from "../models/fcm_token.js"
import admin from '../config/firebaseadmin.js';
import fcm_token from '../models/fcm_token.js';
import DisasterRequest from '../models/report.model.js';

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
        const { title, body, longitude, lattitude, disasterId } = req.body;
 
        // Convert user-provided longitude and latitude to numbers
        const userLongitude = parseFloat(longitude);
        const userLatitude = parseFloat(lattitude);
        const earthRadius = 6371; // Earth's radius in kilometers

        console.log("Received data:", { title, body, longitude, lattitude, disasterId });

        // Fetch disaster details using the ID
        const disaster = await DisasterRequest.findById(disasterId);
        if (!disaster) {
            return res.status(404).json({
                success: false,
                message: "Disaster not found"
            });
        }

        // Update disaster status to active
        disaster.status = "approved";
        await disaster.save();

        // console.log("fcm_token_array",fcm_token_array);

        const fcm_token_array = await Fcm_Token.find({}, { fcm_token: 1, _id: 0 });

        

        console.log(fcm_token_array)
        for (const fcm_token_obj of fcm_token_array) {
            if(fcm_token_obj)
            {
                await notify(title, body, fcm_token_obj.fcm_token);
            }
        }

        return res.status(200).json({
            success: true,
            message: "Notifications sent successfully to devices within 50 km radius",
            disaster: disaster
        });
    } catch (error) {
        console.error("Error occurred:", error.message);

        return res.status(500).json({
            success: false,
            message: "Error occurred",
            error: error.message,
        });
    }
};


const saveUser = async (req,res) =>{
    try 
    {
        const { fcm_token,longitude,lattitude} = req.body;
        
        if(!fcm_token || fcm_token=='undefined')
        {
            return res.status(400).json({
                success : false,
                message : "No valid fcm token"
            })
        }

        console.log("here",fcm_token,longitude,lattitude)
        const fcm_token_exist = await Fcm_Token.find({fcm_token});

        if(fcm_token_exist.length>0)
        {
            return res.status(400).json({
                success : false,
                message : "Token already registered"
            })
        }

        const fcm_token_saved = await Fcm_Token.create({fcm_token : fcm_token});        

        // console.log(fcm_token_saved);
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

const updateUserFcmToken = async (req,res) =>{
    try 
    {
        const {fcm_token,longitude,lattitude} = req.body;
        
        console.log(fcm_token,longitude,lattitude);

        if(!longitude || !lattitude)
        {
            return res.status(400).json({
                success : false,
                message : "invalid longitude and lattitude"
            })
        }

        const response = await Fcm_Token.findOneAndUpdate({fcm_token : fcm_token},{longitude : longitude,lattitude : lattitude});
        
        return res.status(200).json({
            success : true,
            message : "location updated successfully",
            data : response
        })
    }
    catch(error)
    {
        console.log(error.message);
    }
}

export {sendNotification,saveUser,updateUserFcmToken};