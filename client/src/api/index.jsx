import axios from 'axios';
import jwt_decode from 'jwt-decode';
//https://podstream.onrender.com/api
const API = axios.create({ baseURL: `https://podstream.onrender.com/api` }); 

//auth
export const signIn = async ({ email, password }) => await API.post('/auth/signin', { email, password });
export const signUp = async ({
    name,
    email,
    password,
}) => await API.post('/auth/signup', {
    name,
    email,
    password,
});
export const googleSignIn = async ({
    name,
    email,
    img,
}) => await API.post('/auth/google', {
    name,
    email,
    img,
});
export const findUserByEmail = async (email) => await API.get(`/auth/findbyemail?email=${email}`);
export const generateOtp = async (email,name,reason) => await API.get(`/auth/generateotp?email=${email}&name=${name}&reason=${reason}`);
export const verifyOtp = async (otp) => await API.get(`/auth/verifyotp?code=${otp}`);
export const resetPassword = async (email,password) => await API.put(`/auth/forgetpassword`,{email,password});

//user api
export const getUsers = async (token) => await API.get('/user', { headers: { "Authorization" : `Bearer ${token}` }},{
    withCredentials: true
    });
export const searchUsers = async (search,token) => await API.get(`users/search/${search}`,{ headers: { "Authorization" : `Bearer ${token}` }},{ withCredentials: true });


//casting api
export const createCasting = async (casting,token) => await API.post('/castings', casting, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getcastings = async () => await API.get('/castings');
export const addEpisodes = async (casting,token) => await API.post('/castings/episode', casting, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const favoriteCasting = async (id,token) => await API.post(`/castings/favorit`,{id: id}, { headers: { "Authorization" : `Bearer ${token}` } },{ withCredentials: true });
export const getRandomCasting = async () => await API.get('/castings/random');
export const getcastingByTags = async (tags) => await API.get(`/castings/tags?tags=${tags}`);
export const getcastingByCategory = async (category) => await API.get(`/castings/category?q=${category}`);
export const getMostPopularCasting = async () => await API.get('/castings/mostpopular');
export const getcastingById = async (id) => await API.get(`/castings/get/${id}`);
export const addView = async (id) => await API.post(`/castings/addview/${id}`);
export const searchCasting = async (search) => await API.get(`/castings/search?q=${search}`);
