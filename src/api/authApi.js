import axios from "axios";

const baseUrl = 'http://localhost:8000'

const authUrl = {
    login: baseUrl + '/api/v1/auth/login',
    register: baseUrl + '/api/v1/auth/register',
    forgotPassword: baseUrl + '/api/v1/auth/forgot-password',
    getProfile: baseUrl + '/api/v1/auth/get-profile'
};

const authApi = {
    login: async ({ email, password }) => {
        try {
            const data = { email, password };
            const response = await axios.post(authUrl.login, data);

            // lưu lại access token & refresh token vào localstorage
            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);

            // lưu lại access token vào header mặc định của axios
            axios.defaults.headers["Authorization"] = "Bearer " + response.data.data.accessToken;

            return { isSuccess: true, message: "OK", data: response.data };
        } catch (error) {
            return { isSuccess: false, message: error.response.data.message };
        }
    },

    register: () => {

    },

    forgotPassword: () => {

    },

    getProfile: async () => {
        try {
            const response = await axios.get(authUrl.getProfile);
            return { isSuccess: true, message: "OK", data: response.data.data }
        } catch (error) {
            return { isSuccess: false, message: error.response.data.message };
        }
    }
}

export default authApi;