import Link from "next/link";
import { userActions } from "../actions";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { pattern, errorMessage } from '../constants';
import { closeModal } from "../utils/functions";

const UpdateUserModal = ({children, pageProps,updatingUser, updateUserError,error, updateUserSuccess, updateUser, selectedUser, lastUpdated}) => {
    const {register, handleSubmit,reset, errors} = useForm();
    const onSubmit = formData => {
        // add selectedUser id
        const data = {
            userId: selectedUser.id,
            data: formData
        }
        

        updateUser(data);

        // reset form
        if (!updateUserError){
            reset()
            closeModal("updateUserModal")
            
        }
            

    }
    return <div id="updateUserModal" className="modal">
         
        <div className="modal-content" style={{width:"50%"}}>
            <span className="close" data-type="hide-modal" data-target="updateUserModal">&times;</span>
            <h3>Update User</h3>
            <hr className="divider"/>
            
            { updateUserError && <div className="panel code error-msg">
                  <ul>
                    <li> {error}</li>    
                  </ul>
                   
                </div>

            }

            { updateUserSuccess && lastUpdated && lastUpdated.id == selectedUser.id && <div className="panel code success-msg">
                  <ul>
                    <li> Record updated!</li>    
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

            { selectedUser &&
            <form key={selectedUser.id} className="pure-form pure-form-aligned" onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                  <div className="pure-control-group">
                      <label htmlFor="Firstname2">Firstname</label>
                      <input name="firstName" type="text" id="Firstname2" placeholder="FirstName" defaultValue={selectedUser.firstName} ref={
                          register({
                              required:"FirstName is required"
                          })
                      } />
                  </div>
                  <div className="pure-control-group">
                      <label htmlFor="Lastname2">Lastname</label>
                      <input name="lastName" type="text" id="Lastname2" placeholder="LastName" defaultValue={selectedUser.lastName} ref={
                          register({
                              required:"LastName is required"
                          })
                      } />
                  </div>
                  
                  <div className="pure-control-group">
                      <label htmlFor="Email2">Email Address</label>
                      <input type="email" name="email" id="Email2" placeholder="Email Address" defaultValue={selectedUser.email} ref={register({required:"Email is required", 
                            pattern:{
                            value:pattern.EMAIL,
                            message:errorMessage.INVALID_EMAIL
                            }
                        })} />
                  </div>

                  <div className="pure-control-group">
                      <label htmlFor="Phone2">Phone Number</label>
                      <input type="tel" name="phoneNumber" pattern="^(\+1[0-9]{3}|[0-9]{3})[0-9]{3}[0-9]{4}$" id="Phone2" placeholder="Phone number" defaultValue={selectedUser.phoneNumber} ref={register({required:"Phone Number is required", 
                            pattern:{
                            value:pattern.PHONE,
                            message:errorMessage.INVALID_PHONE

                            }
                        })} />
                  </div>
                  
                  <div className="pure-controls">
                      <button type="submit" className="pure-button button-secondary">
                        {updatingUser && <img src="/img/loading.gif" className="button-loader" /> }
                          Submit
                        </button>
                  </div>
                </fieldset>
              </form>
             }
            
        </div>
    </div>
}


const mapStateToProps = state => ({
    updateUserError: state.users.updateUserError,
    updateUserSuccess: state.users.updateUserSuccess,
    selectedUser: state.users.selectedUser,
    error:state.users.error,
    lastUpdated: state.users.lastUpdated,
    updatingUser: state.users.updatingUser,
  });

const mapDispatchToProps = {
    updateUser: userActions.updateUser
};
  
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserModal) 
