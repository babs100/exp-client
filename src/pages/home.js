import Head from 'next/head'
import Link from 'next/link'
import { connect } from 'react-redux';
import styles from '../styles/Home.module.css'
import { userActions, authActions } from "../actions";
import NewUserModal from '../components/newUserModal';
import { useEffect, useState } from 'react';
import UploadReportModal from '../components/uploadReportModal';
import UpdateUserModal from '../components/updateUserModal';
import ReportDetailModal from '../components/reportDetailModal';

function AdminPage({admin, uploadImage, loading,loadingError , error,allUsers, filteredUsers, getAllUsers, searchUser, selectUser, selectedUser, resetFilter}) {
  
  useEffect(() => {
      getAllUsers()

  },[])

  const [searchFormData, setSearchFormData] = useState(Object.freeze({
    query:""
  }))

  //Open Image upload widget
  const openWidget = () => {
    // create the widget
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'babs100',
        uploadPreset: 'wc1fw4yp',
        sources: ['local', 'camera', 'dropbox', 'google_drive']
      },
      (error, result) => {
        if (result && result.info && result.info.secure_url){
          const imageDetails = {
            url: result.info.secure_url
          }
  
          const data = {
            userId: selectedUser.id,
            data: imageDetails
          }
          
          uploadImage(data)
        }
        
        // this.setState({
        //   imageUrl: result.info.secure_url,
        //   imageAlt: `An image of ${result.info.original_filename}`
        // })
      },
    ).open(); // open up the widget after creation
  };
  
  
  const onSearchTextChange = (e) => {
    setSearchFormData({
      ...searchFormData,
      [e.target.name]:e.target.value
    })

    if (e.target.value == "" || e.target.value == null){
      resetFilter()
    }else {
      searchUser(e.target.value)
    }
  }
  
  
  const clicked = (e) => {
    selectUser(e.target.dataset.uid)
  }

  const onSearch = (e) => {
    e.preventDefault()

    searchUser(searchFormData.query)
    
    return false
  }

  let userImage = ""
  if(selectedUser && selectedUser.imageURL){
   userImage =  selectedUser.imageURL.replace(/(v[0-9]+)/g, 'w_100,h_100,c_thumb')
  } else{
    userImage =  "/img/placeholder.png"
  }

  const trClicked = (id) => {
    selectUser(id)
  }
  return (
    <>
      <Head>
        <title>Welcome | Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pure-g">
        <div className="pure-u-18-24 padded">
            <div className="container bordered" style={{minHeight:400}}>
              <div className="">
              <div className="pure-menu pure-menu-horizontal">
            <ul className="pure-menu-list">
                {
                  /*
                      <li className="pure-menu-item">
                    
                        <span href="" className="pure-menu-heading">Users</span>
                    
                    
                    </li>
                  */
                }
                
                <li className="pure-menu-item  pure-menu-has-children pure-menu-allow-hover">
                    <a href="#" id="menuLink1" className="pure-menu-link"><small>Users Options</small></a>
                    <ul className="pure-menu-children">
                        <li className="pure-menu-item">
                            <a href="#" id="myBtn" data-type="show-modal" data-target="myModal" className="pure-menu-link">Add New User</a>
                        </li>
                        
                    </ul>
                </li>
                <li className="pure-menu-item right" style={{padding:"8px 8px 0px 0px"}} >
                  <form className="pure-form search-form" onSubmit={onSearch}>
                        <input type="text"  onChange={onSearchTextChange} name="query" placeholder="search user" className="pure-input" />
                      <button type="submit" className="pure-button">Search</button>
                  </form>
                </li>
                
                
            </ul>
        </div>
    
              </div>
              <hr className="divider"/>
              <div className="table-container">
              <table className="pure-table pure-table-horizontal">
                  <thead>
                      <tr>
                          <th>Select</th>
                          <th>FirstName</th>
                          <th>LastName</th>
                          <th>Phone</th>
                          <th>Email</th>
                      </tr>
                  </thead>
                  <tbody>
                    {loading && 
                        <tr>
                          <td colSpan="5" className="center-content">...loading</td>
                        </tr>
                    }

                  {loadingError && error &&
                        <tr>
                          <td colSpan="5" className="center-content">An Error occured!</td>
                        </tr>
                    }

                    {!loading && filteredUsers && filteredUsers.length == 0 &&
                        <tr>
                        <td colSpan="5" className="center-content">No user record</td>
                      </tr>
                    }

                    {filteredUsers && filteredUsers.length > 0 &&
                      filteredUsers.map((user, i) => (
                        <tr key={i} data-ui={user.id} onClick={() => trClicked(user.id)}>
                          <td>
                            <label htmlFor="checkbox-radio-option-three" className="pure-radio">
                            <input data-uid={user.id} onClick={clicked} onChange={()=>false} checked={selectedUser && user.id === selectedUser.id || ""}type="radio" id="checkbox-radio-option-three" name="optionsRadios" value="option2" /></label>
                          </td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.email}</td>
                        </tr>
                      ))
                    }
                    
                      
                  </tbody>
              </table>
              </div>
            </div>
              
        </div>
        <div style={{position:"relative"}} className="pure-u-6-24 padded">
        {selectedUser && 
          <div className="container bordered padded">
             <div id="imageHandle" className="center-content" style={{ position:"relative", height:"100px", width:"100%", backgroundColor:"#d1d1d1",  justifyContent:'center', alignItems:"center"}}>
                <img  id="imageTag" src={userImage} style={{width:"80px", height:"80px", borderRadius:"40px", border:"1px solid #f8f8f8"}}  />
                
            <button onClick={openWidget} className="plain-button" style={{backgroundColor:"transparent", fontSize:".7em", position:"absolute", left:"2px", bottom:"2px", border:'none'}}>click to edit Image</button>
            </div>
            <hr className="divider"/>
            <div className="user-detail">
              <p>name <br/> <strong>{selectedUser.firstName + " " + selectedUser.lastName}</strong> </p>
              <p>email <br/> <strong>{selectedUser.email}</strong> </p>
              <p>phone <br/> <strong>{selectedUser.phoneNumber}</strong> </p>
            </div>
            <div style={{display:"inline", position:"absolute", top:120, right:10}}>
                <div  className="pure-menu pure-menu-horizontal">
                  <ul className="pure-menu-list">
                    
                    <li className="pure-menu-item last pure-menu-has-children pure-menu-allow-hover">
                        <a href="#" id="menuLink1" className="pure-menu-link"><small>Options</small></a>
                        <ul className="pure-menu-children">
                            <li className="pure-menu-item">
                                <a href="#" id="myBtn" data-type="show-modal" data-target="uploadReportModal" className="pure-menu-link">Add Report</a>
                            </li>
                            <li className="pure-menu-item">
                            <a href="#"  id="myBtn" data-type="show-modal" data-target="reportDetailModal" className="pure-menu-link">Show Reports</a>
                            </li>
                            <li className="pure-menu-item">
                            <a href="#" id="myBtn3" data-type="show-modal" data-target="updateUserModal" className="pure-menu-link">Update User</a>
                            </li>
                        </ul>
                    </li>
                    
                    
                    
                </ul>
                </div>

            </div>
            
          </div>
        }

        
      {selectedUser && selectedUser.total &&
          <div style={{marginTop:"10px"}} className="container bordered padded">
            <div className="" style={{width:"100%", backgroundColor:"#d1d1d1",  textAlign:'center', alignItems:"center"}}>
                <span>Stats</span>
            </div>
            <hr className="divider"/>
            <div className="user-detail">
              <p>Dispatched Packages <br/> <strong>{selectedUser.total.Dispatched_Packages}</strong> </p>
              <p>Delivered Packages <br/> <strong>{selectedUser.total.Delivered_Packages}</strong> </p>
              <p>Delivery Success (%) <br/> <strong>{selectedUser.total.Delivery_Success_P}</strong> </p>
            </div>
            
          </div>
        }

        </div>
      </div>
      <NewUserModal/>
      <UploadReportModal/>
      <UpdateUserModal/>
      <ReportDetailModal/>

      

    </>
  )
}


const mapStateToProps = state => {
  return {
    admin: state.authentication.user,
    allUsers: state.users.allUsers,
    loading: state.users.loading,
    loadingError:state.users.loadingError,
    error: state.users.error,
    selectedUser:state.users.selectedUser,
    filteredUsers: state.users.filteredUsers,
    selectedReport:state.users.selectedReport,

  }
  
};

const mapDispatchToProps = {
  login: authActions.login,
  logout: authActions.logout,
  getAllUsers: userActions.getAllUsers,
  selectUser: userActions.selectUser,
  searchUser: userActions.searchUser,
  resetFilter: userActions.resetFilter,
  uploadImage: userActions.uploadImage,
  
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage) 