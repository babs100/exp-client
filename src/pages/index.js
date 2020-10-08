import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LoginLayout from '../components/layouts/loginLayout'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { authActions } from "../actions";
import Router from "next/router"
import { useEffect } from 'react';
import { pattern, errorMessage } from '../constants';

const LoginPage = ({cleanState, login, loggingIn,loginError ,error, pageProps}) => {
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = formData => {
    login(formData.email, formData.password);

  }

  useEffect(()=>{
    cleanState()

  },[])

  
  return (
    
    <>
      <Head>
        <title>Admin | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
          <div  className="content code">
            <h2>Administrative login</h2>
            { loginError && <div className="panel code error-msg">
                  <ul>
                    <li> {error}</li>    
                  </ul>
                   
                </div>

            }
            { Object.keys(errors).length != 0 && 
                <div className="panel code error-msg">
                  <ul>
                    {errors.email && <li> {errors.email.message}</li> }
                    {errors.password && <li> {errors.password.message} </li> }
                    
                  </ul>
                   
                </div>
            }
            
            <form className="pure-form pure-form-aligned" onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                
                
                <div className={`pure-control-group ${errors.email && 'error-input'}`} >
                    <label htmlFor="email">Email Address</label>
                    <input 
                    type="email" ref={register({required:"Email is required", 
                    pattern:{
                      value:pattern.EMAIL,
                      message:errorMessage.INVALID_EMAIL

                    }
                  })}
                    name="email" id="email" placeholder="Email Address" />
                    {/*<span className="pure-form-message-inline">This is a required field.</span>*/}
                </div>

                <div className={`pure-control-group ${errors.password && 'error-input'}`}>
                    <label htmlFor="password">Password</label>
                    <input className={` ${errors.password && 'error'}`} 
                    type="password" ref={register({required:"Password is required", 
                    pattern:{
                      value:pattern.PASSWORD,
                      message:errorMessage.INVALID_PASSWORD

                    }
                  })}  
                    name="password" id="password" placeholder="Password" />
                </div>
                
                <div className="pure-controls">
                    
                    <button type="submit" className="pure-button button-secondary">
                      {loggingIn && <img src="/img/loading.gif" className="button-loader" /> }
                      Submit
                      </button>
                    
                </div>
            </fieldset>
          </form>
          </div>

          
        
      

    </>
  )
}



LoginPage.Layout = LoginLayout

const mapStateToProps = state => ({
  loginError: !state.authentication.loggedIn && state.authentication.error,
  error: state.authentication.error,
  loggingIn: state.authentication.loggingIn,
});

const mapDispatchToProps = {
  login: authActions.login,
  cleanState: authActions.cleanState
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage) 