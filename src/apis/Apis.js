import axios from "axios";

export const postApi = async (url, data, customHeader) => {
    let header = {
        "Content-Type": "application/json"
    }
    if (customHeader) {
        header = customHeader;
    }
    return await axios.post(url, data, header);
}

export const getApi = async (url, data, customHeader) => {
    let header = {
        "Content-Type": "application/json"
    }
    if (customHeader) {
        header = customHeader;
    }
    return await axios.get(url, data, header);
}