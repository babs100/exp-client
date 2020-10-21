
import "../styles/pure/pure-min.css"
import "../styles/pure/grids-responsive-min.css"
import "../styles/pure/main-grid.css"
import "../styles/pure/main.css"

import "../styles/globals.css"

import {encrypt, decrypt} from "../utils/crypt";



import AdminLayout from "../components/layouts/adminLayout";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import withReduxStore from "../lib/with-redux-store";
import App, {Container} from 'next/app'
import { userConstants, routeConstants } from '../constants';
import { userActions } from "../actions"
import fetch from "isomorphic-unfetch";
import { route } from "next/dist/next-server/server/router"
import { getPageList } from "../utils/helpers"

import Cookies from "universal-cookie";


function MyApp({ Component, pageProps, reduxStore, persistor }) {
  const Layout = Component.Layout || AdminLayout;
  
 
  return (
    <>
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
      <script
        src="https://widget.Cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      />
      <script type="text/javascript" src="/js/menu.js" />
      <script type="text/javascript" src="/js/grid.js" />
      <script defer type="text/javascript" src="/js/ui.js" />
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {

    
    

    const appProps = await App.getInitialProps(appContext);
    
    var encrytedToken = null
    var token = null
    var user = null

    try {

      if(appContext.ctx.req && appContext.ctx.req.headers.cookie) {
        encrytedToken = new Cookies(appContext.ctx.req.headers.cookie).get("atk")
        if (encrytedToken != null)
          token = decrypt(encrytedToken)
      }
      
    } catch (error) {
      
    }
    

    

    if (token){

      // make request to server for a refresh token
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
  
      headers['Authorization'] = 'Bearer ' + token
  
      
      const response = await fetch(routeConstants.REFRESH_TOKEN,{
        method:"POST",
        headers
      },[])
  
      const result = await response.json()
      user = result.data?.user;
      token = result.data?.token
    }
    

    let pathname = appContext.router.pathname
    
  
    
    
    if (user && user != undefined){
      
      const payload = {user, token}
      appContext.ctx.reduxStore.dispatch({type:userConstants.LOGIN_SUCCESS, payload})
      
      const currentPath = appContext.ctx.req.path
      

      // check that we are in SSR mode (NOT static and NOT client-side)
      if (typeof window === "undefined" && appContext.ctx.res.writeHead) {
        
        
        // if path is / or login and we already have accessToken then change to /home
        if (pathname === '/login' || pathname === '/' || pathname === '/index') {
          pathname = '/home'  
        }

        //route to the path, when it has changed
        
        if(pathname !== currentPath){
          appContext.ctx.res.writeHead(302, { Location: pathname });
          appContext.ctx.res.end();
        }
        
        
      }
    } else {

      if (typeof window === "undefined" && appContext.ctx.res.writeHead) {
        if(pathname !== "/"){
          appContext.ctx.res.writeHead(302, { Location: "/" });
          appContext.ctx.res.end();
        }
      }
    }


    return { ...appProps};
}

export default withReduxStore(MyApp)
