import { APP_LAST_URI } from "../api";
import axios from 'axios'
import { APP_URL } from "../config";


export const ApiCall = async(uriName, data, type) => {
    if (APP_LAST_URI[type][uriName].isAuth = true) {
        const authToken = JSON.parse(window.localStorage.getItem("authToken"))
        axios.interceptors.request.use(
            config => {
                if (config.headers.authorization === undefined) {
                    config.headers.authorization = `Bearer ` + authToken
                }
                return config
            }
        )
    }
    if (APP_LAST_URI[type][uriName].method === "POST") {
        try {
            let response = await axios.post(APP_URL.BASE_URL + APP_LAST_URI[type][uriName].path, data)
            return response.data
        }
        catch (e) {
            if (e.response) {
                throw e.response
            }
            else {
                throw e
            }
            
        }
        
    }
    else {
        let response = axios.get(APP_URL.BASE_URL + APP_LAST_URI[type][uriName].path)
            .then(() => {
                return response
            }).catch(error => {
                console.log(error)
            })
    }   
}
