import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import AuthReducer from '../reducers/AuthReducer';
import ThemeOptions from '../reducers/ThemeOptions';



const appReducers = combineReducers({
   AuthReducer,
   ThemeOptions
});

const rootReducer = (state, action) => appReducers(state, action);

export const store = createStore(rootReducer, applyMiddleware(thunk));