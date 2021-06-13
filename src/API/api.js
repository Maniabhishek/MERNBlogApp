import axios from "axios";

const API = axios.create({baseURL:'https://bloggingapp1.herokuapp.com/'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPostAPI = () =>API.get('/posts');
export const createPostAPI = (newPost) =>API.post('/posts',newPost);
export const updatePostAPI = (updatedPost,id)=> API.patch(`/posts/${id}`,updatedPost);
export const deletePostAPI = (id) => API.delete(`/posts/${id}`);
export const likePostAPI = (id) => API.patch(`/posts/${id}/likepost`);

export const signinAPI = (userData) => API.post(`/user/signin`,userData);
export const signupAPI = (userData) => API.post(`/user/signup`,userData);