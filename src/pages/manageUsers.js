import Head from 'next/head'
import Link from "next/link";
import { connect } from 'react-redux';
import styles from '../styles/Home.module.css'
import { userActions } from "../actions";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

const ManageUsersPage = ({changePassword,changingPassword, changeError ,error, success, logout, pageProps}) => {
  const {register, handleSubmit, watch, errors} = useForm();
  const onSubmit = formData => {
    changePassword(formData.password);

  }

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
  const patternErrorMessage = "Password must be minimum of 8 characters, with Uppercase, Lowercase and Symbol."
  const doLogout = (e) => {
    logout()
    e.preventDefault()
  }
  return (
    
    <>
      <Head>
        <title>Admin | Manage Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
          <div  className="content code">
            {!success && <h2>Change Password</h2>}
            { changeError && <div className="panel code error-msg">
                  <ul>
                    <li> {error}</li>    
                  </ul>
                   
                </div>

            }
            { Object.keys(errors).length != 0 && 
                <div className="panel code error-msg">
                  <ul>
                    {errors.password && <li> {errors.password.message} </li> }
                    {errors.repassword && <li> {errors.repassword.message} </li> }
                    
                  </ul>
                   
                </div>
            }
            
            {!success && <form className="pure-form pure-form-aligned" onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
                
                
                
                <div className={`pure-control-group ${errors.password && 'error-input'}`}>
                    <label htmlFor="password">New Password</label>
                    <input className={` ${errors.password && 'error'}`} 
                    type="password" ref={register({required:"Password is required", 
                      pattern:{
                        value:passwordPattern,
                        message:patternErrorMessage

                      }
                    })} 
                    name="password" id="password" placeholder="Password" />
                </div>

                <div className={`pure-control-group ${errors.repassword && 'error-input'}`}>
                    <label htmlFor="repassword">Re-Password</label>
                    <input className={` ${errors.password && 'error'}`} 
                    type="password" ref={register({required:"Re-Password is required", 
                      pattern:{
                        value:passwordPattern,
                        message:patternErrorMessage

                      },
                      validate: (value) => value === watch("password") || "Passwords don't match"
                    })} 
                    name="repassword" id="repassword" placeholder="Re-Password" />
                </div>
                
                <div className="pure-controls">
                    
                    <button type="submit" className="pure-button button-secondary">Submit</button>
                    
                </div>
            </fieldset>
          </form>}
          { success && <>
              <h2 className="success">Password changed!</h2>
              <p>you can click <Link href="#"><a onClick={doLogout} >here to</a></Link> relogin</p>
              </>
          }
          </div>

          
        
      

    </>
  )
}



const mapStateToProps = state => ({
  changeError: !state.authentication.passwordChangeSuccess && state.authentication.passwordChangeError,
  error: state.authentication.passwordChangeError,
  success: state.authentication.passwordChangeSuccess,
  changingPassword: state.authentication.changingPassword,
});

const mapDispatchToProps = {
  changePassword: userActions.changePassword,
  logout: userActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersPage) 