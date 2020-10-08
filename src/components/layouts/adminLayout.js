
import AdminMenu from "../adminMenu";
import AdminNavBar from "../adminNavBar";

const AdminLayout = ({children, pageProps}) => (
<div id="layout" className="layout">
    <AdminMenu {...pageProps}/>
    <AdminNavBar {...pageProps}/>
    <div id="main" className="main">
        {children}
    </div>

</div>
)

export default AdminLayout;
