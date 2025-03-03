import axios from "axios";

const baseUrl = 'http://localhost:8000'

export const storyUrl = {
    getStories: baseUrl + '/api/v1/story',
    getStory: baseUrl + '/api/v1/story/:id/detail',
    createStory: baseUrl + '/api/v1/story/create',
    updateStory: baseUrl + '/api/v1/story/:id/update',
    uploadStoryImage: baseUrl + '/api/v1/story/upload-file'
};

const storyApi = {
    getStories: async ({ keyword, page, pageSize, orderDirection, orderBy }) => {
        const response = await axios.get(storyUrl.getStories, {
            params: { keyword, page, pageSize, orderDirection, orderBy }
        });
        return response.data;
    },

    getStory: async (id) => {
        const trueUrl = storyUrl.getStory.replace(":id", id);
        const response = await axios.get(trueUrl);
        return response.data;
    },

    createStory: async (data) => {
        const response = await axios.post(storyUrl.createStory, data);
        return { ...response.data, isSuccess: true };
    },

    updateStory: async (id, data) => {
        const trueUrl = storyUrl.updateStory.replace(":id", id);
        const response = await axios.post(trueUrl, data);
        return { ...response.data, isSuccess: true };
    },

    uploadStoryImage: async (file, processCallback) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(storyUrl.uploadStoryImage, formData, {
            onUploadProgress: (event) => {
                console.log(event.progress);
            }
        });

        return { ...response.data, isSuccess: true };
    }
};

export default storyApi;