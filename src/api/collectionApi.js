import axios from "axios";

const baseUrl = 'http://localhost:8000'

const collectionUrl = {
    getCollections: baseUrl + '/api/v1/collection',
    createCollection: baseUrl + '/api/v1/collection/create',
};

const collectionApi = {
    getCollections: async () => {
        const response = await axios.get(collectionUrl.getCollections);
        return response.data;
    },

    createCollection: async (data) => {
        const response = await axios.post(collectionUrl.createCollection, data);
        return response.data;
    }
};

export default collectionApi;