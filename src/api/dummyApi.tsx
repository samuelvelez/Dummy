import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = 'https://dummyjson.com';

const dummyApi = axios.create({ baseURL });

dummyApi.interceptors.request.use(

    async (config) => {
        config.headers['Content-Type'] = 'application/json';
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers['x-token'] = token;
        }
        return config;
    }
);

export default dummyApi;
