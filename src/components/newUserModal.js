import Link from "next/link";
import { userActions } from "../actions";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { pattern, errorMessage } from '../constants';

const NewUserModal = ({children, pageProps,addingUser,addUserError,error,addUserSuccess, addUser, lastAdded}) => {
    const {register, handleSubmit,reset, errors} = useForm();
    const onSubmit = formData => {
        addUser(formData);

        // reset form
        if (addUserSuccess){
            reset()
            
        }
            

    }
    return <div id="myModal" className="modal">
         
        <div className="modal-content">
            <span className="close" data-type="hide-modal" data-target="myModal">&times;</span>
            <h3>New User</h3>
            <hr className="divider"/>
            {lastAdded && addUserSuccess && (Object.keys(errors).length == 0) && <div className="panel code">
            <h4 className="success"> LAST RECORD: {lastAdded.firstName + " " + lastAdded.lastName}</h4>
                </div>
            }
            { addUserError && <div className="panel code error-msg">
                  <ul>
                    <li> {error}</li>    
                  </ul>
                   
                </div>

            }
            { Object.keys(errors).length != 0 && 
                <div className="panel code error-msg">
                  <ul>
                    
                    {errors.firstName && <li> {errors.firstName.message} </li> }
                    {errors.lastName && <li> {errors.lastName.message} </li> }
    
                    {errors.email && <li> {errors.email.message}</li> }
                    {errors.phoneNumber && <li> {errors.phoneNumber.message} </li> }
                    
                  </ul>
                   
                </div>
            }
            
            <form className="pure-form pure-form-aligned" onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                  <div className="pure-control-group">
                      <label htmlFor="Firstname">Firstname</label>
                      <input name="firstName" type="text" id="Firstname" placeholder="FirstName" ref={
                          register({
                              required:"FirstName is required"
                          })
                      } />
                  </div>
                  <div className="pure-control-group">
                      <label htmlFor="Lastname">Lastname</label>
                      <input name="lastName" type="text" id="Lastname" placeholder="LastName" ref={
                          register({
                              required:"LastName is required"
                          })
                      } />
                  </div>
                  
                  <div className="pure-control-group">
                      <label htmlFor="Email">Email Address</label>
                      <input type="email" name="email" id="Email" placeholder="Email Address" ref={register({required:"Email is required", 
                            pattern:{
                            value:pattern.EMAIL,
                            message:errorMessage.INVALID_EMAIL
                            }
                        })} />
                  </div>

                  <div className="pure-control-group">
                      <label htmlFor="Phone">Phone Number</label>
                      <input type="tel" name="phoneNumber" pattern="^(\+1[0-9]{3}|[0-9]{3})[0-9]{3}[0-9]{4}$" id="Phone" placeholder="Phone number" ref={register({required:"Phone Number is required", 
                            pattern:{
                            value:pattern.PHONE,
                            message:errorMessage.INVALID_PHONE

                            }
                        })} />
                  </div>
                  
                  <div className="pure-controls">
                      <button type="submit" className="pure-button button-secondary" disabled={addingUser}>
                        {addingUser && <img src="/img/loading.gif" className="button-loader" /> }
                          Submit
                        </button>
                  </div>
                </fieldset>
              </form>
          
            
        </div>
    </div>
}


const mapStateToProps = state => ({
    addUserError: state.users.addUserError,
    addUserSuccess: state.users.addUserSuccess,
    error: state.users.error,
    lastAdded: state.users.lastAdded,
    addingUser: state.users.addingUser,

  });

const mapDispatchToProps = {
    addUser: userActions.addUser
};
  
export default connect(mapStateToProps, mapDispatchToProps)(NewUserModal) 
