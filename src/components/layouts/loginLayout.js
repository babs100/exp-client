import LoginNavBar from "../loginNavBar";

const LoginLayout = ({children, pageProps}) => (
    <div id="login_layout" className="layout">
        <LoginNavBar {...pageProps} />
        <div id="main" className="main">
            {children}
        </div>

    </div>
)

export default LoginLayout;
