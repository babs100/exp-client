import {routeConstants, userConstants } from "../constants";

export default class UserService {
    constructor() {
        this.fetch = this.fetch.bind(this)
    }

    addUser(data, token) {
        return this.fetch(routeConstants.ADD_USER, {
            method: 'POST',
            body: JSON.stringify(data)
        },
        token
        ).then(res => {
            return Promise.resolve(res)
        })
    }

    updateUser(data, token) {
        return this.fetch(routeConstants.UPDATE_USER, {
            method: 'POST',
            body: JSON.stringify(data)
        },
        token
        ).then(res => {
            return Promise.resolve(res)
        })
    }

    getUserReport(data, token) {
        return this.fetch(routeConstants.GET_USER_REPORT, {
            method: 'POST',
            body: JSON.stringify(data)
        },
        token
        ).then(res => {
            //console.log(JSON.stringify(res))
            return Promise.resolve(res)
        })
    }

    uploadReport(data, token) {
        return this.fetch(routeConstants.UPLOAD_REPORT, {
            method: 'POST',
            body: JSON.stringify(data)
        },
        token
        ).then(res => {
            return Promise.resolve(res)
        })
    }

    uploadImage(data, token) {
        return this.fetch(routeConstants.UPLOAD_IMAGE, {
            method: 'POST',
            body: JSON.stringify(data)
        },
        token
        ).then(res => {
            return Promise.resolve(res)
        })
    }


    getAllUser(token) {
        return this.fetch(routeConstants.ALL_USER, {
            method: 'GET',
        },
        token
        ).then(res => {
            //console.log(JSON.stringify(res))
            return Promise.resolve(res)
        })
    }


    async _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {

            const resp = await response.json()
            //var error = new Error(response.statusText)
            var error = new Error(resp.message)
            error.response = resp
            console.log(JSON.stringify(resp.message))
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