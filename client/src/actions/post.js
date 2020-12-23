import axios from "axios"
import {
    DELETE_POST,
    GET_POSTS,
    POST_ERROR,
    ADD_POST,
    GET_POST,
    UPDATE_POST
} from "./types"

//Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get("/api/posts")

        dispatch({ 
            type: GET_POSTS,
            payload: res.data
         })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`)

        dispatch({ 
            type: DELETE_POST,
            payload: id
         })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Add post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    try {
        console.log("Form submit ", formData)
        let post = await axios.post("/api/posts/", { 
            tittle: formData.tittle, 
            text: formData.text, 
            itemLocation: formData.itemLocation,
            number: formData.number,
            category: formData.category,
        }, config)

        if (formData.image) {
          const data = new FormData()
          data.append("file",formData.image)
          data.append("upload_preset","zavrsni-rad")
          data.append("cloud_name","ddauabmg9")
          const imageUploadResponse = await fetch("https://api.cloudinary.com/v1_1/ddauabmg9/image/upload", {
            method:"post",
            body: data
          })
          .then(res => res.json())

          const updateForm = { id: post.data._id, imageUrl: imageUploadResponse.url }
          post = await axios.put(`/api/posts`, updateForm, config)
        }
        
        dispatch({ 
            type: ADD_POST,
            payload: post.data
         })

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Update post
export const updatePost = id => async dispatch => {

    try {
        const res = await axios.put(`/api/posts/${id}`)

        dispatch({ 
            type: UPDATE_POST,
            payload: res.data
         })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//Get post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)

        dispatch({ 
            type: GET_POST,
            payload: res.data
         })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
