import { userActions } from "../actions";
import { connect } from "react-redux";


const ReportDetailModal = ({selectedReport,selectedUser}) => {
    
    //console.log(selectedReport)
    
    return <div id="reportDetailModal" className="modal">
         
        <div className="modal-content">
            <span className="close" data-type="hide-modal" data-target="reportDetailModal">&times;</span>
            {selectedUser && <h3>Report detail for <span className="blue">{selectedUser.firstName + " " + selectedUser.lastName}</span></h3> }
            <hr className="divider"/>
            <div className="card-container">
                {selectedReport && selectedReport.reports.map((report, i) => (
                    <div key={i} className="card">
                        <p>Week <br/> <strong>{report.Week_Number}</strong> </p>
                        <p>Uploaded On <br/> <strong>{report.createdAt}</strong> </p>
                        <p>Dispatched Packages <br/> <strong>{report.Dispatched_Packages}</strong> </p>
                        <p>Delivered Packages <br/> <strong>{report.Delivered_Packages}</strong> </p>
                        <p>Delivery Success (%) <br/> <strong>{report.Delivery_Success_P}</strong> </p>
                    </div>
                ))

                }
                {selectedReport && selectedReport.reports.length == 0 && <p>No report found</p>}
            </div>
          
            
        </div>
    </div>
}


const mapStateToProps = state => ({
    selectedUser: state.users.selectedUser,
    selectedReport: state.users.selectedReport,
  });

const mapDispatchToProps = {
    uploadReport: userActions.uploadReport
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailModal) 
