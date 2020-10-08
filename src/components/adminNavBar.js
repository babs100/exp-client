import Link from "next/link";
import { authActions } from "../actions";
import { connect } from "react-redux";
import { useRouter } from "next/router";

const AdminNavBar = ({children, pageProps,admin, logout}) => {
    const router = useRouter()
    const onLogoutClick = (event) => {
        event.preventDefault()
        logout()
        
    }   
    return <div id="navbar" className="navbar">
         
        <div className="pure-menu pure-menu-horizontal">
            <span href="#" className="pure-menu-heading">{pageProps && pageProps.title ? pageProps.title : "Admin Home"}</span>
            <ul className="pure-menu-list nav" style={{textAlign:"right", paddingRight:"50px"}}>
            
                
                <li  className="pure-menu-item last pure-menu-has-children pure-menu-allow-hover">
                    <a href="#"  className="pure-menu-link">Account</a>
                    <ul className="pure-menu-children">
                        <li className="pure-menu-item">
                            <div style={{backgroundColor:"#f8f8f8", padding:"4px 12px 4px 12px"}}>
                                <small className="blue">Signed in as</small> <br/>
                                <small className="blue">{admin.firstName + " " + admin.lastName}</small>
                            </div>
                            
                        </li>
                        <li className="pure-menu-item">
                            <Link href="/changePassword">
                            <a href="#" className="pure-menu-link">Change Password</a>
                            </Link>
                        </li>
                        <li className="pure-menu-item">
                            <a href="#" onClick={onLogoutClick} className="pure-menu-link">Logout</a>
                        </li>
                    </ul>
                </li>
                
            </ul>
        </div>
    </div>
}

const mapStateToProps = state => {
 return {
    admin: state.authentication.user,
 }
}
const mapDispatchToProps = {
    logout: authActions.logout
};
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminNavBar) 
//export default AdminNavBar;