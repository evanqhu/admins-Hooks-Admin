// redux 状态管理器
import { legacy_createStore as createStore, combineReducers, type Store, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage"; // 默认使用 localStorage
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import global from "./modules/global/reducer";
import menu from "./modules/menu/reducer";
import tabs from "./modules/tabs/reducer";
import auth from "./modules/auth/reducer";
import breadcrumb from "./modules/breadcrumb/reducer";

// 创建根 reducer
// combineReducers 用于将多个 reducer 合并成一个根 reducer，每个 reducer 负责管理 store 中的一部分状态
const reducer = combineReducers({
	global,
	menu,
	tabs,
	auth,
	breadcrumb
});

// 配置 Redux 持久化，这允许在页面刷新后恢复 Redux 状态
const persistConfig = {
	key: "redux-state",
	storage: storage
};

// 创建持久化 reducer
const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建 store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 创建持久化 store，这将启动持久化过程，把 Redux 状态保存到 localStorage
const persistor = persistStore(store);

export { store, persistor };
