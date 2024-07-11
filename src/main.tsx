// 入口文件
// import ReactDOM from "react-dom";
import "@/styles/reset.less"; // 重置样式
import "@/styles/common.less"; // 全局公共样式
import "@/assets/iconfont/iconfont.less"; // 字体图标样式
import "@/assets/fonts/font.less"; // 字体样式
// import "antd/dist/antd.less";
import "@/language/index"; // 国际化
import "virtual:svg-icons-register"; // 将 svg 文件转换成组件的工具 vite-plugin-svg-icons
import { PersistGate } from "redux-persist/integration/react"; // redux 持久化存储
import { Provider } from "react-redux"; // 将 redux store 注入到整个应用中
import { store, persistor } from "@/redux";
import App from "@/App";

// react 17 创建，控制台会报错，暂时不影响使用（菜单折叠时不会出现闪烁）
// ReactDOM.render(
// 	// * react严格模式
// 	// <React.StrictMode>
// 	<Provider store={store}>
// 		<PersistGate persistor={persistor}>
// 			<App />
// 		</PersistGate>
// 	</Provider>,
// 	// </React.StrictMode>,
// 	document.getElementById("root")
// );

import ReactDOM from "react-dom/client";
// react 18 创建（会导致 antd 菜单折叠时闪烁，等待官方修复）
ReactDOM.createRoot(document.getElementById("root")!).render(
	// * react严格模式
	// <React.StrictMode>
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
	// </React.StrictMode>
);
