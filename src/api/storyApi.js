import axios from "axios";

const baseUrl = 'http://localhost:8000'

const storyUrl = {
    getStories: baseUrl + '/api/v1/story',
};

const storyApi = {
    getStories: async ({ keyword, page, pageSize, orderDirection, orderBy }) => {
        const response = await axios.get(storyUrl.getStories, {
            params: { keyword, page, pageSize, orderDirection, orderBy }
        });
        console.log(response.data);
        return response.data;
    }
};

export default storyApi;