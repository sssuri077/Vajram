import React from "react";
import Axios from 'axios';
import toast from 'react-hot-toast';


const Apifunction = {


    
 tosterDisplay : function(type, text) {

    if (text.length > 0) {

        toast.dismiss();

        (type === 'success') ? toast.success(<div dangerouslySetInnerHTML={{ __html: text }} />) : toast.error(<div dangerouslySetInnerHTML={{ __html: text }} />);
    }
},

    ApiHelper: async function (serviceName, payload = {}, method = 'POST') {
        const baseHeadersConfig = {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "true",
            "deviceType": "website",
            'Cache-Control': 'public, max-age=31536000',  
        };
        const headersConfig = baseHeadersConfig;

        try {
            const result = await Axios({
                url: `http://localhost:8080/${serviceName}`,
                method: method,
                data: payload,
                headers: headersConfig,
            });

            console.log(result,"trest");
            if (result && result.data) {
                if (result.status === 200) {
                    let responseData = result.data;
                    console.log(responseData,"responseDataresponseData");

                    if (responseData.status) {
                        let payloadData = responseData.details;
                        (responseData.message) && this.tosterDisplay('success', responseData.message);

                        if (payloadData) {
                            return payloadData;
                        } else {
                            return responseData;
                        }
                    } else {
                        (responseData.message) && this.tosterDisplay('error', responseData.message);
                    }
                } else {
                    this.tosterDisplay('error', 'Connection timed out.');
                    return false;
                }
            } else {
                this.tosterDisplay('error', 'Invalid request data.');
                return false;
            }
        } catch (error) {
            if (error.code !== "ERR_CANCELED") {
                this.tosterDisplay('error', 'Server Busy !');
            }
            console.error(error);
            return false;
        }
    }
}

export default Apifunction;


