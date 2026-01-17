import { api } from "../utils/axiosRequest";

export const getBanner = async (language: string) => {
    const lang = language.split('-')[0];
    const response = await api.get(`/api/Banner?language=${lang}`);
    return response.data;
}

export const getChooseUs = async (language: string) => {
    const lang = language.split('-')[0];
    const response = await api.get(`/api/ChooseUs?language=${lang}`);
    return response.data;
}


export const getVideo = async () => {
    const response = await api.get(`/api/Gallery`);
    return response.data;
}

export const getCourses = async (language: string) => {
    const lang = language.split('-')[0];
    const response = await api.get(`/api/Course?language=${lang}`);
    return response.data;
}

export const getCoursesById = async ({ id, language }: { id: number, language: string }) => {
    const lang = language.split('-')[0];
    const response = await api.get(`/api/Course/${id}?language=${lang}`);
    return response.data;
}

export const getVideoReview = async (language: string) => {
    const lang = language.split('-')[0];
    const response = await api.get(`/api/VideoReview?language=${lang}`);
    return response.data;
}

export const postRequest = async (data: any) => {
    const response = await api.post('/api/Request', data);
    return response.data;
}

export const getFeedBack = async (language: string) => {
    const lang = language.split('-')[0];
    const response = await api.get(`/api/Feedback?language=${lang}`);
    return response.data;
}

export const postFeedBack = async (data: any) => {
    const response = await api.post('/api/Feedback', data);
    return response.data;
}


export const getNews = async (language: string) => {
    const lang = language.split('-')[0];
    const response = await api.get(`/api/News?language=${lang}`);
    return response.data;
}

export const getNewsById = async ({ id, language }: { id: number, language: string }) => {
    const lang = language.split('-')[0];
    const response = await api.get(`/api/News/id?id=${id}&language=${lang}`);
    return response.data;
}


export const getLibraryBook = async () => {
    const response = await api.get(`/api/Book`);
    return response.data;
}

export const getLibraryBookById = async (id: number) => {
    const response = await api.get(`/api/Book/${id}`);
    return response.data;
}

export const downloadBook = async (id: number) => {
    const response = await api.get(`/api/Book/download/${id}`);
    return response.data;
}

export const colleague = async (language: string) => {
    const response = await api.get(`/api/Colleague/colleagueWithIcons?language=${language}`);
    return response.data;
}

export const getColleagueById = async ({ id, language }: { id: number, language: string }) => {
    const lang = language.split('-')[0];
    const response = await api.get(`/api/Colleague/colleagueWithIcon/${id}?language=${lang}`);
    return response.data;
}


