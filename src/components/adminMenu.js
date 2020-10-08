import Link  from "next/link";
const AdminMenu = ({children, pageProps}) => (
    <>
        <a href="#" id="menuLink" className="menu-link">
                <span></span>
        </a>
            
        <div id="menu" className="menu">
            <div className="pure-menu">
                <Link href="/home">
                    <a className="pure-menu-heading">EG-DM</a>
                </Link>

                <ul className="pure-menu-list">
                    <li className="pure-menu-item">
                        <Link href="/home" >
                            <a className="pure-menu-link">Home </a>
                        </Link>
                    </li>
                    {/*<li className="pure-menu-item menu-item-divided">
                        <Link href="/home">
                            <a className="pure-menu-link">Manage Admin</a>
                        </Link>
                    </li> */}
                    
                </ul>
            </div>
        </div>
    </>
    )
    
export default AdminMenu;