import {
    IMAGE_LIST_REQUEST,
    IMAGE_LIST_SUCCESS,
    IMAGE_LIST_FAIL,
    IMAGE_DELETE_REQUEST,
    IMAGE_DELETE_SUCCESS,
    IMAGE_DELETE_FAIL,
    IMAGE_CLEANUP_REQUEST,
    IMAGE_CLEANUP_SUCCESS,
    IMAGE_CLEANUP_FAIL,
} from '../constants/imageConstants';

export const imageListReducer = (state = { images: [] }, action) => {
    switch (action.type) {
        case IMAGE_LIST_REQUEST:
            return { loading: true, images: [] };
        case IMAGE_LIST_SUCCESS:
            return { loading: false, images: action.payload };
        case IMAGE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const imageDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case IMAGE_DELETE_REQUEST:
            return { loading: true };
        case IMAGE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case IMAGE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const imageCleanupReducer = (state = {}, action) => {
    switch (action.type) {
        case IMAGE_CLEANUP_REQUEST:
            return { loading: true };
        case IMAGE_CLEANUP_SUCCESS:
            return { loading: false, success: true, deletedFiles: action.payload };
        case IMAGE_CLEANUP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

