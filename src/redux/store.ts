import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createDebounce from 'redux-debounced'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers/rootReducers'

// Setting property to global window
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
// Browser Dev Tool Extension
const composedEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Applying Middlewares
const middleware = [thunk, createDebounce()]

// Creating persistent Store
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Creating Store
const store = createStore(
  persistedReducer,
  composedEnhancers(applyMiddleware(...middleware))
)

// Presting state
const persistor = persistStore(store)

export { store, persistor }
