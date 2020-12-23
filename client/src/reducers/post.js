//import { initParams } from "request"
import {
    DELETE_POST,
    GET_POSTS,
    POST_ERROR,
    ADD_POST,
    GET_POST,
    UPDATE_POST
} from "../actions/types"

const inititalState = {
    posts: [],
    post: [],
    loading: true,
    error: {}
}

export default function(state= inititalState, action) {
    const { type, payload } = action

    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.id ? { ...post, url: payload.url } : post),
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}
