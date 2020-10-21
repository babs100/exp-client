import { userConstants } from '../constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        addingUser: true,
        addUserError: false,
        addUserSuccess:false
      };
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        addingUser: false,
        addUserError: false,
        addUserSuccess:true,
        allUsers: [...state.allUsers, action.user],
        filteredUsers: [action.user, ...state.filteredUsers ],
        lastAdded: action.user
      };
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        addingUser: false,
        addUserError: true,
        addUserSuccess:false,
        error:action.error
      };

    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    
    case userConstants.GETALL_SUCCESS:
      let sel = state.selectedUser
      if (action.users.length < 1){
        sel = null
      }
      
      return {
        ...state,
        allUsers: action.users,
        selectedUser: sel,
        filteredUsers: action.users,
        loading: false,
        loadingError:false,
      };
    case userConstants.GETALL_FAILURE:
      return { 
        ...state,
        loading:false,
        loadingError:true,
        error: action.error
      };
    case userConstants.UPDATE_USER_REQUEST:
      return {
        ...state,
        updatingUser:true,
        updateUserSuccess:false,
        updateUserError:"",
        
      };
    case userConstants.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updatingUser:false,
        updateUserSuccess:true,
        updateUserError:"",
        lastUpdated: state.selectedUser
        
      };
    case userConstants.UPDATE_USER_FAILURE:
      return {
        ...state,
        updatingUser:false,
        updateUserSuccess:false,
        updateUserError:true,
        error:action.error
      
      };
    case userConstants.SELECT_USER:
      return {
        ...state,
        selectedUser: state.allUsers.find(user => user.id === action.userId)
      };
    case userConstants.FILTERED_USER:
      return {
        ...state,
        filteredUsers: action.users
      };
    case userConstants.RESET_FILTER:
      return {
        ...state,
        filteredUsers: action.users
      };
    case userConstants.USER_REPORT_REQUEST:
      return {
        ...state,
        fetchingReport:true,
        reportRequestSuccess:false,
        reportRequestError:""
      };
    case userConstants.USER_REPORT_SUCCESS:
      return {
        ...state,
        fetchingReport:false,
        reportRequestSuccess:true,
        reportRequestError:"",
        selectedReport: action.report
      };
    case userConstants.USER_REPORT_FAILURE:
      return {
        ...state,
        fetchingReport:false,
        reportRequestSuccess:false,
        reportRequestError:action.error,
        selectedReport: null
      };
    case userConstants.IMAGE_UPLOAD_REQUEST:
      return {
        ...state,
        uploadingImage:true,
        imageRequestSuccess:false,
        imageRequestError:""
      };
    case userConstants.IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadingImage:false,
        imageRequestSuccess:true,
        imageRequestError:"",
      };
    case userConstants.IMAGE_UPLOAD_FAILURE:
      return {
        ...state,
        uploadingImage:false,
        imageRequestSuccess:false,
        imageRequestError:action.error,
      };

    case userConstants.UPDATE_USER_IN_STORE:
      let currentUser = state.selectedUser

      if(currentUser.id === action.user.id)
        currentUser = action.user

      const filteredUsers = state.filteredUsers
      const allUsers = state.allUsers

      let index = filteredUsers.findIndex(x => x.id == currentUser.id)
      if (index != -1)
        filteredUsers[index] = action.user
      
      index = allUsers.findIndex(x => x.id == currentUser.id)
      if (index != -1)
        allUsers[index] = action.user
      
      return {
        ...state,
        selectedUser: currentUser,
        filteredUsers: filteredUsers,
        allUsers: allUsers
      };

    case userConstants.REPORT_UPLOAD_REQUEST:
      return {
        ...state,
        uploading:true,
        uploadReportSuccess: false,
        uploadReportError: "",
      }
    case userConstants.REPORT_UPLOAD_SUCCESS:

      let curUser = state.selectedUser

      if(curUser.id === action.data.user.id)
        curUser = action.data.user
      //console.log(curUser)

      const ftdUsers = state.filteredUsers
      const all = state.allUsers

      let ind = ftdUsers.findIndex(x => x.id == curUser.id)
      if (ind != -1)
        ftdUsers[ind] = action.data.user
      
      ind = all.findIndex(x => x.id == curUser.id)
      if (ind != -1)
        all[ind] = action.data.user

      return {
        ...state,
        selectedUser: curUser,
        selectedReport:action.data.report,
        filteredUsers: ftdUsers,
        allUsers: all,
        uploading:false,
        uploadReportSuccess: true,
        uploadReportError: "",
      }
    case userConstants.REPORT_UPLOAD_FAILURE:
      return {
        ...state,
        uploading:false,
        uploadReportSuccess: false,
        uploadReportError: action.error,
      }
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        allUsers: state.allUsers.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        allUsers: state.allUsers.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        allUsers: state.allUsers.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}