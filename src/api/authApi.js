import axios from "axios";

const baseUrl = 'http://localhost:8000'

const authUrl = {
    login: baseUrl + '/api/v1/auth/login',
    register: baseUrl + '/api/v1/auth/register',
    forgotPassword: baseUrl + '/api/v1/auth/forgot-password'
};

const authApi = {
    login: async ({ email, password }) => {
        try {
            const data = { email, password };
            const response = await axios.post(authUrl.login, data);

            return { isSuccess: true, message: "OK", data: response.data };
        } catch (error) {
            return { isSuccess: false, message: error.response.data.message };
        }
    },

    register: () => {

    },

    forgotPassword: () => {

    },

    getProfile: () => {

    }
}

export default authApi;