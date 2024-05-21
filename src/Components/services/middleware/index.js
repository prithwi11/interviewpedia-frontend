import { APP_LAST_URI } from "../api";
import axios from 'axios'
import { APP_URL } from "../config";


export const ApiCall = async(uriName, data, type) => {
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
// export function ApiCall(uriName, data, type) {
//     return new Promise(async function (resolved, reject) {
//         // try {
//             if (APP_LAST_URI[type][uriName].method === "POST") {
//                 axios.post(APP_URL.BASE_URL + APP_LAST_URI[type][uriName].path, data)
//                 .then(res => {
//                     let response = res.data;
//                     resolved(response)
//                 })
//                 // .catch(error => {
//                 //     reject(error)
//                 // })
//             }
//             else {
//                 axios.get(APP_URL.BASE_URL + APP_LAST_URI[type][uriName].path)
//                     .then(res => {
//                         let response = res.data
//                         resolved(response)
//                     })
//                     .catch(error => {
//                         reject(error)
//                     })
//             }
//         // }
//         // catch (e) {
//         //     reject(e)
//         // }
//     })
// }