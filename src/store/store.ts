import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSessionReducer from './reducers/userSession'
import { createWrapper } from 'next-redux-wrapper'
import scheduleReducer from './reducers/schedule'
import { useAuthApi } from '@/services/auth/auth-rtk-api'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['userSession'],
  blacklist: [useAuthApi.reducerPath]
}

const userConfig = {
  key: 'user',
  storage,
}

const rootReducer = combineReducers({
  userSession: persistReducer(userConfig, userSessionReducer),
  schedule: scheduleReducer,
  [useAuthApi.reducerPath]: useAuthApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(useAuthApi.middleware).concat(thunk),
  })

setupListeners(store().dispatch)

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = ReturnType<AppStore['dispatch']>

export const wrapper = createWrapper<AppStore>(store)

export const persistor = persistStore(store())
