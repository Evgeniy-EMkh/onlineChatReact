import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { chatsReducer } from './chats/reducer';
import { messageReducer } from './messages/reducer';
import { profileReducer } from "./profile/reducer";
import thunk from 'redux-thunk';
import { articlesReducer } from './articles/reducer';

const persistConfig = {
    key: 'gbMessenger',
    storage,
};

const rootReducer = combineReducers({
    articles: articlesReducer,
    profile: profileReducer,
    chats: chatsReducer,
    messages: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer,
    composeEnhansers(applyMiddleware(thunk)),
);

export const persistor = persistStore(store);