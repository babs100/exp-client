import {routeConstants, userConstants } from "../constants";
import {  useSelector, useDispatch, useStore } from "react-redux";
import App from "next/app";
import store from "../store";
import Cookies from "universal-cookie";
import Cryptr from "cryptr";
import { encrypt, decrypt } from "../utils/crypt";
export default class AuthService {
    constructor() {
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.cookie = new Cookies()
        this.token = null
        //this.cryptr = new Cryptr(process.env.ACCESS_TOKEN_ENC_KEY || "ty#eyrbdy8937b@Ja")
        
    }

    login(email, password) {
        // Get a token
        return this.fetch(routeConstants.ADMIN_LOGIN, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(res => {
            this.setToken(res)
            // return this.fetch(`${this.domain}/api/user`, {
            //     method: 'GET'
            // })
            return Promise.resolve(res)
        })
        // .then(res => {
        //     this.setProfile(res)
        //     return Promise.resolve(res)
        // })
        .catch(error => {
            console.log(error)
            return Promise.resolve(error)
        })
        
    }

    loginAdmin(email, password) {
        // Get a token
        return this.fetch(routeConstants.ADMIN_LOGIN, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            this.setToken(res.data.token)
            //console.log(res)
            return Promise.resolve(res)
        })
    }

    changeAdminPassword(data, token) {
        const {password} = data
        // Get a token
        return this.fetch(routeConstants.CHANGE_ADMIN_PASSWORD, {
            method: 'POST',
            body: JSON.stringify({
                password
            }, token)
        }).then(res => {
            return Promise.resolve(res)
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        // return !!token && !isTokenExpired(token) // handwaiving here
        return !!token // handwaiving here
    }

    setProfile(profile) {
        // Saves profile data to redux store
        console.log(`profile is ${profile}`)
        dispatch({type: userConstants.USER_PROFILE, profile})
    }

    getProfile() {
        // Retrieves the profile data from redux state
        //return useSelector(state => state.authentication?.profile)
    }

    async setToken(token) {
        
        this.token = token
        const encryptedToken = encrypt(token)
        this.cookie.set('atk', encryptedToken)
    }

    getToken() {

        if (this.token){
            //console.log("Token available")
            return this.token
        }
        
        const encryptedToken = this.cookie.get('atk')
        if(!encryptedToken){
            return ""
        }

        const accessToken = decrypt(encryptedToken)


        // const accessToken = this.cryptr.decrypt(encyptedToken)
        // console.log('At getToken, token = ' + accessToken)
        return accessToken
    }

    logout() {
        // Clear user token and profile data from cookie

        const cookie = new Cookies();
        cookie.set("atk","");

        

    }

    async _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {

            const resp = await response.json()
            console.log(resp)
            //var error = new Error(response.statusText)
            var error = new Error(resp.message)
            error.response = resp
           
            throw error
        }
    }

    fetch(url, options, token=null) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // if (this.loggedIn()) {
        //     headers['Authorization'] = 'Bearer ' + this.getToken()
        // }

        if (token) {
                headers['Authorization'] = 'Bearer ' + token
        }

        return fetch(url, {
                headers,
                ...options
            })
            .then(this._checkStatus)
            .then(response => response.json())
    }
}