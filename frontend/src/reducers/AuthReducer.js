import { LOGIN, SET_USER } from "../Actions/ActionTypes";


let user = JSON.parse(localStorage.getItem('User'))
let login = localStorage.getItem('Login');
console.log(login, 'temp', user)
const initialState = {
    login: login ? "Login" : 'Logout',
    user: user ? user : {}
};
const AuthReducer = (state = initialState, action) => {
    console.log('AuthReducer', action)
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                login: action.login,
            };
        case SET_USER:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};

export default AuthReducer;