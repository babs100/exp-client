
const API_PORT = parseInt(process.env.API_PORT) || 4000;
const API_HOST = process.env.API_HOST || "http://localhost"

let domain = API_HOST + ':' + API_PORT
domain = "https://exp-server.azurewebsites.net"

export const routeConstants = {
    ADMIN_LOGIN : `${domain}/api/v1/man/login`,
    ADMIN_PROFILE : `${domain}/api/v1/man/profile`,
    REFRESH_TOKEN : `${domain}/api/v1/man/refresh_token`,
    CHANGE_ADMIN_PASSWORD : `${domain}/api/v1/man/change_password`,
    ADD_USER : `${domain}/api/v1/man/add_user`,
    UPDATE_USER : `${domain}/api/v1/man/update_user`,
    ALL_USER : `${domain}/api/v1/man/all_user`,
    UPLOAD_REPORT : `${domain}/api/v1/man/report`,
    GET_USER_REPORT : `${domain}/api/v1/man/get_report`,
}