import { useState, useEffect } from "react";
import { getBrowserLang } from "@/utils/util";
import { ConfigProvider } from "antd";
import { connect } from "react-redux";
import { setLanguage } from "@/redux/modules/global/action";
import { HashRouter } from "react-router-dom";
import AuthRouter from "@/routers/utils/authRouter";
import Router from "@/routers/index";
import useTheme from "@/hooks/useTheme";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import i18n from "i18next";
import "moment/dist/locale/zh-cn";

/** 根组件 */
const App = (props: any) => {
	// 从 props 中解构需要的属性和方法 (来自 redux)
	const { language, assemblySize, themeConfig, setLanguage } = props;
	const [i18nLocale, setI18nLocale] = useState(zhCN);

	// 全局使用主题
	useTheme(themeConfig);

	// 设置 antd 语言国际化
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language == "zh") return setI18nLocale(zhCN);
		if (language && language == "en") return setI18nLocale(enUS);
		if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
		if (getBrowserLang() == "en") return setI18nLocale(enUS);
	};

	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		// 设置 redux 中存储的语言
		setLanguage(language || getBrowserLang());
		// 设置 antd 语言
		setAntdLanguage();
	}, [language]);

	return (
		<HashRouter>
			{/* ConfigProvider 用于全局配置 antd 组件 */}
			<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
				{/* AuthRouter 可能用于处理身份验证和授权 */}
				<AuthRouter>
					{/* 主路由组件 */}
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</HashRouter>
	);
};

// 将 Redux 全局状态中的 global 部分映射到组件的 props
const mapStateToProps = (state: any) => state.global;
// 将 setLanguage action creator 映射到组件的 props
const mapDispatchToProps = { setLanguage };
// 使用 connect 高阶组件连接 React 组件与 Redux store
export default connect(mapStateToProps, mapDispatchToProps)(App);
