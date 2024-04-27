import { REGEX } from "../services/config";
import { AlertMessage } from "../enums";

const emailValidator = (email) => {
    if (email === undefined || email === null) {
        return ({status : false, message : AlertMessage.MESSAGE.EMAIL.EMAIL_EMPTY})
    }
    else {
        if (email.length === 0) {
            return ({status : false, message : AlertMessage.MESSAGE.EMAIL.EMAIL_EMPTY})
        }
        else {
            if (REGEX.EMAIL_REGEX.test(email)) {
                return ({status : true, message : ''})
            }
            else {
                return ({status : false, message : AlertMessage.MESSAGE.EMAIL.EMAIL_INVALID})
            }
        }
    }
}

const passwordValidator = (password) => {
    if (password === undefined || password === null) {
        return ({status : false, message : AlertMessage.MESSAGE.PASSWORD.PASSWORD_EMPTY})
    }
    else {
        if (password.length === 0) {
            return ({status : false, message : AlertMessage.MESSAGE.PASSWORD.PASSWORD_EMPTY})
        }
        else {
            // if (REGEX.PASS_REGEX.test(password)) {
                return ({status : true, message : ''})
            // }
            // else {
            //     return ({status : false, message : AlertMessage.MESSAGE.PASSWORD.PASSWORD_NOT_VALID})
            // }
        }
    }
}

export {
    emailValidator,
    passwordValidator
}