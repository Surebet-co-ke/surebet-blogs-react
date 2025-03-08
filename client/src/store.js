import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';


import {
	blogListReducer,
	blogDetailsReducer,
	blogCreateReducer,
	blogUpdateReducer,
	blogDeleteReducer,
	blogDeleteBulkReducer,
	categoryListReducer,
	categoryDetailsReducer,
	categoryCreateReducer,
	categoryUpdateReducer,
	categoryDeleteReducer,
} from './reducers/blogReducer';

import {
    imageListReducer,
    imageDeleteReducer,
    imageCleanupReducer,
} from './reducers/imageReducer';

import {
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userUpdateReducer,
	userForgotPasswordReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
	blogList: blogListReducer,
	blogDetails: blogDetailsReducer,
	blogCreate: blogCreateReducer,
	blogUpdate: blogUpdateReducer,
	blogDelete: blogDeleteReducer,
	blogDeleteBulk: blogDeleteBulkReducer,
	categoryList: categoryListReducer,
	categoryDetails: categoryDetailsReducer,
	categoryCreate: categoryCreateReducer,
	categoryUpdate: categoryUpdateReducer,
	categoryDelete: categoryDeleteReducer,

	imageList: imageListReducer,
    imageDelete: imageDeleteReducer,
    imageCleanup: imageCleanupReducer,

	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userUpdate: userUpdateReducer,
	userDelete: userDeleteReducer,
	userForgotPassword: userForgotPasswordReducer,

});

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
