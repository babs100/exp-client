import { createStore, applyMiddleware } from 'redux'
import { persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import storageSession from 'redux-persist/lib/storage/session' // session storgae

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage:storageSession,
  blacklist:['authentication']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const myInitailState = {}


// A create store function for `withReduxStore` context wrapper
export function initializeStore (initialState = myInitailState) {
  return createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}


// //creates a store without redux-persist
// export function initializeStore (initialState = myInitailState) {
//   return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
// }
