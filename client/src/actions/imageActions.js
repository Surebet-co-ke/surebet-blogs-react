import axios from 'axios';

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

export const listImages = () => async (dispatch, getState) => {
    try {
        dispatch({ type: IMAGE_LIST_REQUEST });

        const {
            userLogin: { userInfo },
          } = getState();
      
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

        const { data } = await axios.get(`/api/images`, config);

        dispatch({
            type: IMAGE_LIST_SUCCESS,
            payload: data.images,
        });
    } catch (error) {
        dispatch({
            type: IMAGE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteImage = (filename) => async (dispatch, getState) => {
    try {
        dispatch({ type: IMAGE_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/images/${filename}`, config);

        dispatch({ type: IMAGE_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: IMAGE_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const cleanupImages = () => async (dispatch, getState) => {
    try {
        dispatch({ type: IMAGE_CLEANUP_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        };

        const { data } = await axios.delete(`/api/images/cleanup/unused`, config);

        dispatch({
            type: IMAGE_CLEANUP_SUCCESS,
            payload: data.deletedFiles,
        });
    } catch (error) {
        dispatch({
            type: IMAGE_CLEANUP_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
