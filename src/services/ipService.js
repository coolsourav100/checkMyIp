import axios from 'axios';

export const getIpData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/ip');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch IP data');
    }
};

export const getGeoData = async (ip) => {
    try {
        const response = await axios.get(`/api/geo?ip=${ip}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch geo data');
    }
};
