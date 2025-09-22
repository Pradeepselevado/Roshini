const axios = require('axios');
const { logErrorToFile } = require('../ErrorLog');
const NotifModel = require('../models/notifModel')


async function sendNotification(newsfeed_title, category_name,newsfeed_image,newsfeed_id,deviceId) {
    const fcmNotificationSetting = {
        //GTSA 
        // SenderId: '504492068615',
        // ServerKey: 'AAAAdXYSDwc:APA91bHfUkt6q69tdD_H5nGLJPP3GSrOnRC5LVaM-yeOdSnBiCMWrzrKGiPbYzoY52ir2o3YNHJkcM-cjmIX4akOOMi2R-O3G6QZom976620OLswRYwQ9_KFYsZ2ugnMTkzGwBlo_Gnz',
       
        SenderId: '479133361545',
        ServerKey: 'AAAAb46S5Yk:APA91bFbonJVgZhrJFb5bUilMgbMP5JqzZ7q8sQRXk1Da-m478KU6-ztzL1mGZJuUXpSFPW4yVP-YCYRYwBkeUar4yYPcSqkIM0F2SstajEdncrP5nxqIRh7coClS_21S6KhFeIDY5sH',

    };
    try {
            const settings = {
                SenderId: fcmNotificationSetting.SenderId,
                ServerKey: fcmNotificationSetting.ServerKey,
            };

            const authorizationKey = settings.ServerKey;
            const deviceToken = deviceId;

            const httpClient = axios.create({
                headers: {
                    'Authorization': `key=${authorizationKey}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log(httpClient,+"httpClient");
            logErrorToFile(httpClient)
            const dataPayload = {
                to: deviceToken,
                priority: 'high',
                data: {
                    Title: newsfeed_title,
                    Body: category_name,
                },
                notification: {
                    title: newsfeed_title,
                    body: category_name,
                },
            };

            const response = await sendToFcm(dataPayload, httpClient);
            
            if (response.isSuccess) {
                console.log(response, "if1");
                await NotifModel.create({ newsfeed_title, category_name,newsfeed_image,newsfeed_id,deviceId })
                console.log("Sent");
                return {
                    isSuccess: true,
                    message: 'Notification Sent Successfully',
                };
            } else {
                console.log(response, "else1");
                logErrorToFile(response);
                return {
                    isSuccess: false,
                    message: 'Notification Not Sent',
                };
            }
        } 
     catch (error) {
        logErrorToFile(error);
        console.log("catch1", error);
    }
}

async function sendToFcm(notification, httpClient) {
    const url = 'https://fcm.googleapis.com/fcm/send';

    try {
        const responseSendToFcm = await httpClient.post(url, notification);
        // console.log(responseSendToFcm, "try2");
        return {
            isSuccess: responseSendToFcm.data.success == 0 ? false : true,
            message: responseSendToFcm.data.results[0]?.error,
        };
    } catch (error) {
        console.log("catch2", error.response?.data);
        logErrorToFile(error);
        return {
            isSuccess: false,
            message: 'Failed to send notification to FCM',
        };
    }
}
module.exports = {
    sendNotification
};