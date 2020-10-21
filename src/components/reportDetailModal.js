import { userActions } from "../actions";
import { connect } from "react-redux";


const ReportDetailModal = ({selectedReport,selectedUser,fetchingReport}) => {
    
    //console.log(selectedReport)
    
    return <div id="reportDetailModal" className="modal">
         
        <div className="modal-content">
            <span className="close" data-type="hide-modal" data-target="reportDetailModal">&times;</span>
            {selectedUser && <h3>Report detail for <span className="blue">{selectedUser.firstName + " " + selectedUser.lastName}</span></h3> }
            <hr className="divider"/>
            <div className="card-container">
                {fetchingReport && <div style={{textAlign:'center'}}> <span>...loading</span></div>}
                {!fetchingReport && selectedReport &&selectedReport.total && <div style={{textAlign:'center'}}>
                        <p>Dispatched Packages <br/> <strong>{selectedReport.total.Dispatched_Packages}</strong> </p>
                        <p>Delivered Packages <br/> <strong>{selectedReport.total.Delivered_Packages}</strong> </p>
                        <p>Delivery Success (%) <br/> <strong>{selectedReport.total.Delivery_Success_P}</strong> </p>
                        <p>Count <br/> <strong>{selectedReport.all[0].weekReports.length}</strong> </p>
                     </div>}
                {!fetchingReport && selectedReport && selectedReport.reports && selectedReport.reports.map((report, i) => (
                    <div key={i} className="card">
                        <p>Week <br/> <strong>{report.Week_Number}</strong> </p>
                        <p>Uploaded On <br/> <strong>{report.createdAt}</strong> </p>
                        <p>Dispatched Packages <br/> <strong>{report.Dispatched_Packages}</strong> </p>
                        <p>Delivered Packages <br/> <strong>{report.Delivered_Packages}</strong> </p>
                        <p>Delivery Success (%) <br/> <strong>{report.Delivery_Success_P}</strong> </p>
                    </div>
                ))

                }
                {selectedReport && selectedReport.reports && selectedReport.reports.length == 0 && <p>No report found</p>}
            </div>
          
            
        </div>
    </div>
}


const mapStateToProps = state => ({
    selectedUser: state.users.selectedUser,
    selectedReport: state.users.selectedReport,
    fetchingReport: state.users.fetchingReport,

  });

const mapDispatchToProps = {
    uploadReport: userActions.uploadReport
};
  
export default connect(mapStateToProps, mapDispatchToProps)(ReportDetailModal) 
