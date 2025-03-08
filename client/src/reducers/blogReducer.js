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
    BLOG_CREATE_RESET,
    BLOG_UPDATE_REQUEST,
    BLOG_UPDATE_SUCCESS,
    BLOG_UPDATE_FAIL,
    BLOG_UPDATE_RESET,
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
    BLOG_CATEGORY_CREATE_RESET,
    BLOG_CATEGORY_UPDATE_REQUEST,
    BLOG_CATEGORY_UPDATE_SUCCESS,
    BLOG_CATEGORY_UPDATE_FAIL,
    BLOG_CATEGORY_UPDATE_RESET,
    BLOG_CATEGORY_DELETE_REQUEST,
    BLOG_CATEGORY_DELETE_SUCCESS,
    BLOG_CATEGORY_DELETE_FAIL,
  } from '../constants/blogConstants';
  
  // Blog Reducers
  export const blogListReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
      case BLOG_LIST_REQUEST:
        return { loading: true, blogs: [] };
      case BLOG_LIST_SUCCESS:
        return { loading: false, blogs: action.payload };
      case BLOG_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const blogDetailsReducer = (state = { blog: {} }, action) => {
    switch (action.type) {
      case BLOG_DETAILS_REQUEST:
        return { ...state, loading: true };
      case BLOG_DETAILS_SUCCESS:
        return { loading: false, blog: action.payload };
      case BLOG_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const blogCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOG_CREATE_REQUEST:
        return { loading: true };
      case BLOG_CREATE_SUCCESS:
        return { loading: false, success: true, blog: action.payload };
      case BLOG_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case BLOG_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const blogUpdateReducer = (state = { blog: {} }, action) => {
    switch (action.type) {
      case BLOG_UPDATE_REQUEST:
        return { loading: true };
      case BLOG_UPDATE_SUCCESS:
        return { loading: false, success: true, blog: action.payload };
      case BLOG_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case BLOG_UPDATE_RESET:
        return { blog: {} };
      default:
        return state;
    }
  };
  
  export const blogDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOG_DELETE_REQUEST:
        return { loading: true };
      case BLOG_DELETE_SUCCESS:
        return { loading: false, success: true };
      case BLOG_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const blogDeleteBulkReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOG_DELETE_BULK_REQUEST:
        return { loading: true };
      case BLOG_DELETE_BULK_SUCCESS:
        return { loading: false, success: true };
      case BLOG_DELETE_BULK_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  // Category Reducers
  export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
      case BLOG_CATEGORY_LIST_REQUEST:
        return { loading: true, categories: [] };
      case BLOG_CATEGORY_LIST_SUCCESS:
        return { loading: false, categories: action.payload };
      case BLOG_CATEGORY_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const categoryDetailsReducer = (state = { category: {} }, action) => {
    switch (action.type) {
      case BLOG_CATEGORY_DETAILS_REQUEST:
        return { ...state, loading: true };
      case BLOG_CATEGORY_DETAILS_SUCCESS:
        return { loading: false, category: action.payload };
      case BLOG_CATEGORY_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const categoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOG_CATEGORY_CREATE_REQUEST:
        return { loading: true };
      case BLOG_CATEGORY_CREATE_SUCCESS:
        return { loading: false, success: true, category: action.payload };
      case BLOG_CATEGORY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case BLOG_CATEGORY_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const categoryUpdateReducer = (state = { category: {} }, action) => {
    switch (action.type) {
      case BLOG_CATEGORY_UPDATE_REQUEST:
        return { loading: true };
      case BLOG_CATEGORY_UPDATE_SUCCESS:
        return { loading: false, success: true, category: action.payload };
      case BLOG_CATEGORY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case BLOG_CATEGORY_UPDATE_RESET:
        return { category: {} };
      default:
        return state;
    }
  };
  
  export const categoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOG_CATEGORY_DELETE_REQUEST:
        return { loading: true };
      case BLOG_CATEGORY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case BLOG_CATEGORY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };