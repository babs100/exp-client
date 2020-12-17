import { userActions } from "../actions";
import { connect } from "react-redux";


const ReportDetailModal = ({selectedReport,selectedUser,fetchingReport}) => {
    
    //console.log(selectedReport)
    
    return <div id="reportDetailModal" className="modal">
         
            <div className="modal-content" style={{width:"90%", height:"90%", display:"flex", flexFlow:"column"}}>
                <div className="modal-header">
                    <span className="close" data-type="hide-modal" data-target="reportDetailModal">&times;</span>
                    {selectedUser && <span className="modal-title">Report detail for <span className="blue">{selectedUser.firstName + " " + selectedUser.lastName}</span></span> }

                </div>
                
                <div className="modal-detail" style={{padding:"0px", flex:"1 0 auto"}}>
                {fetchingReport && <div style={{textAlign:'center'}}> <span>...loading</span></div>}
                {selectedReport && selectedReport.reports && selectedReport.reports.length == 0 && <p>No report found</p>}
                {!fetchingReport && selectedReport && selectedReport.total && 
                    <div className="pure-g" style={{height:"100%", backgroundColor:"#F2F2F2"}}>
                        <div className="pure-u-5-24" style={{backgroundColor:"#274d6b",color:"#fff",height:"100%", padding:"0px 10px", fontSize:"0.9em"}}>
                            
                            <p><strong>Grand Total</strong> <br/> </p>
                            <p>Dispatched Packages <br/> <strong>{selectedReport.total.Dispatched_Packages}</strong> </p>
                            <p>Delivered Packages <br/> <strong>{selectedReport.total.Delivered_Packages}</strong> </p>
                            <p>Delivery Success (%) <br/> <strong>{selectedReport.total.Delivery_Success_P}</strong> </p>
                                
                            
                            
                        </div>
                        <div className="pure-u-19-24">
                            <div className="report-container" >
                            {selectedReport.all && selectedReport.all.map((report, i) => (
                                <div key={i} className="report-line">
                                    <div className="report-main">
                                        <div className="report-part">
                                            <p>Dispatched Packages <br/> <strong>{report.Dispatched_Packages}</strong> </p>
                                            <p>Delivered Packages <br/> <strong>{report.Delivered_Packages}</strong> </p>
                                        </div>
                                        <div className="report-part">
                                            <p>Delivery Success (%) <br/> <strong>{report.Delivery_Success_P}</strong> </p>
                                            <p>Delivered Not Received <br/> <strong>{report.Packages_Delivered_Not_Received_DNR}</strong> </p>
                                        </div>
                                        <div className="report-part">
                                            <p>Packages Returned to Station<br/> <strong>{report.Packages_Returned_to_Station_RTS}</strong> </p>
                                            <p>Year <br/> <strong>{report.Year}</strong> </p>
                                        </div>
                                        <div className="report-part">
                                            <p>Uploaded On <br/> <strong>{report.createdAt}</strong> </p>
                                            <button data-type="toggle-detail"  data-target={"weeks-detail"+i} className="plain-button">click to show weeks</button>
                                        </div>

                                    </div>
                                    
                                    <div id={"weeks-detail"+i} className="weeks-detail card-container">
                                        {report.weekReports.map((week, j) => (
                                            <div key={(j+1000)} className="small-card">
                                                <p>Week <br/> <strong>{week.Week_Number}</strong> </p>
                                                <p>Dispatched Packages <br/> <strong>{week.Dispatched_Packages}</strong> </p>
                                                <p>Delivered Packages <br/> <strong>{week.Delivered_Packages}</strong> </p>
                                                <p>Delivery Success (%) <br/> <strong>{week.Delivery_Success_P}</strong> </p>
                                                
                                                
                                            </div>
                                        ))}
                                    </div>    
                                    
                                    
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>
                }
                
                
                
            
                
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
