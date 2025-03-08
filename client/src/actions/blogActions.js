import axios from 'axios';

import {
  BLOG_LIST_REQUEST,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_CREATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_BULK_REQUEST,
  BLOG_DELETE_BULK_SUCCESS,
  BLOG_DELETE_BULK_FAIL,
  BLOG_CATEGORY_LIST_REQUEST,
  BLOG_CATEGORY_LIST_SUCCESS,
  BLOG_CATEGORY_LIST_FAIL,
  BLOG_CATEGORY_DETAILS_REQUEST,
  BLOG_CATEGORY_DETAILS_SUCCESS,
  BLOG_CATEGORY_DETAILS_FAIL,
  BLOG_CATEGORY_CREATE_REQUEST,
  BLOG_CATEGORY_CREATE_SUCCESS,
  BLOG_CATEGORY_CREATE_FAIL,
  BLOG_CATEGORY_UPDATE_REQUEST,
  BLOG_CATEGORY_UPDATE_SUCCESS,
  BLOG_CATEGORY_UPDATE_FAIL,
  BLOG_CATEGORY_DELETE_REQUEST,
  BLOG_CATEGORY_DELETE_SUCCESS,
  BLOG_CATEGORY_DELETE_FAIL,
} from '../constants/blogConstants';

export const listBlogs = (searchQuery = '') => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });

    const { data } = await axios.get(`/api/blogs?search=${searchQuery}`);

    dispatch({ type: BLOG_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/blogs/${id}`);

    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/blogs`, blog, config);

    dispatch({ type: BLOG_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateBlog = (id, blog) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/blogs/${id}`, blog, config);

    dispatch({ type: BLOG_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteBlog = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/blogs/${id}`, config);

    dispatch({ type: BLOG_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteBlogsByDateRange = (startDate, endDate) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_DELETE_BULK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/blogs/delete-bulk`, {
      data: { startDate, endDate },
      ...config,
    });

    dispatch({ type: BLOG_DELETE_BULK_SUCCESS });
  } catch (err) {
    dispatch({
      type: BLOG_DELETE_BULK_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_CATEGORY_LIST_REQUEST });

    const { data } = await axios.get(`/api/blogs/categories`);

    dispatch({ type: BLOG_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_CATEGORY_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_CATEGORY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/blogs/categories/${id}`);

    dispatch({ type: BLOG_CATEGORY_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_CATEGORY_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_CATEGORY_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/blogs/categories`, category, config);

    dispatch({ type: BLOG_CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_CATEGORY_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateCategory = (id, category) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_CATEGORY_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/blogs/categories/${id}`, category, config);

    dispatch({ type: BLOG_CATEGORY_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: BLOG_CATEGORY_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BLOG_CATEGORY_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/blogs/categories/${id}`, config);

    dispatch({ type: BLOG_CATEGORY_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: BLOG_CATEGORY_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};