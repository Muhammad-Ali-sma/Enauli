import { LOGIN, LOGOUT, SET_USER } from './ActionTypes';


export const UserLogin = (login) => {
    return async (dispatch, getState) => {
        dispatch({
            type: LOGIN,
            login: login
        })
    }
};

export const AddUser = (user) => {
    console.log('AddUser',user)
    return async (dispatch, getState) => {
        dispatch({
            type: SET_USER,
            user: user
        })
    }
};


