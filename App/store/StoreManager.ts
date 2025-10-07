import {applyMiddleware, createStore, compose} from 'redux';
import {thunk} from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './RootReducer';

let globalStoreInstance;

const configureStore = (preloadedState?: any) => {
  const middlewares = [thunk];
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['globalReducer'],
    blacklist: [],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];
  const devToolsEnhancer =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const composedEnhancers = devToolsEnhancer(...storeEnhancers);

  const store = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers,
  );
  const persistor = persistStore(store);
  globalStoreInstance = store;
  return {store, persistor};
};
export {configureStore, globalStoreInstance};
