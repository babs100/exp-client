import Link from "next/link";
import { userActions } from "../actions";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { pattern, errorMessage } from '../constants';
import {  closeModal } from "../utils/functions";

import Papa from "papaparse"
import { useState } from "react";

const UploadReportModal = ({children, pageProps,uploadReport,uploading, uploadReportSuccess, uploadReportError,selectedUser}) => {
    const {register, handleSubmit,reset, errors} = useForm();
    
    const [fileError, setFileError] = useState("")

    const processData = (headers, body ) => {
        //console.log(headers)
        //console.log(body)
        const requestBody = {}

        const mainKey = headers[0]
        const jsonData = {} 
        for (let i = 1; i < headers.length; i++) {
            let record = {}
            let key = headers[i]
            body.map(line => {
               

                let field = line[mainKey]
                let value = line[key]

                field = field.replace(/\s/g, "_")
                field = field.replace("(", "")
                field = field.replace(")", "")
                field = field.replace(",", "")
                field = field.replace("%", "P")

                value = value.replace(",", "")

                record[field] = value
            })

            if (key == "Total"){
                const weeks = headers.slice(2)
                const weekNumbers = weeks.map(w => w.split(" ")[1]).join(",")
                const weekNames = weeks.join(",").replace(/\s/g, "_")

                record["Week_Names"] = weekNames
                record["Week_Numbers"] = weekNumbers

            }else {

                record["Week_Name"] = key.replace(" ", "_")
                record["Week_Number"] = key.split(" ")[1]
            }

            key = key.replace(" ", "_")

            jsonData[key] = record


        }

        requestBody["userId"] = selectedUser.id
        requestBody["data"] = jsonData
        
        return requestBody
    }

    const onSubmit = formData => {
        
        const file = formData.selectedFile[0]

 
        try {

            Papa.parse(file, {
                header:true,
                skipEmptyLines:true,
                
                complete: result => {
                    if (result.errors.length != 0)
                        throw Error(JSON.stringify(result.errors))
                    const body = processData(result.meta.fields, result.data)
                    uploadReport(body)
                    reset()
                    //loseModal("uploadReportModal")
                    
                    
                }
            })
            
        } catch (error) {

            setFileError("Error occured, misformed file")
        }
        
            

    }
    return <div id="uploadReportModal" className="modal">
         
        <div className="modal-content" style={{width:"45%"}}>
            <span className="close" data-type="hide-modal" data-target="uploadReportModal">&times;</span>
            {selectedUser && <h3>Upload a report for <span className="blue">{selectedUser.firstName + " " + selectedUser.lastName}</span></h3> }
            <hr className="divider"/>
            
            { uploadReportError && uploadReportError.length > 0 && <div className="panel code error-msg">
                  <ul>
                    <li> {uploadReportError}</li>    
                  </ul>
                   
                </div>

            }

            { uploadReportSuccess  && <div className="panel code success-msg">
                  <ul>
                    <li> uploaded successfully!</li>    
                  </ul>
                   
                </div>

            }

            { fileError && fileError.length > 0 && <div className="panel code error-msg">
                            <ul>
                                <li> {fileError}</li>    
                            </ul>
                            
                            </div>

            }

            { Object.keys(errors).length != 0 && 
                            <div className="panel code error-msg">
                            <ul>
                                
                                {errors.selectedFile && <li> {errors.selectedFile.message} </li> }
                                
                            </ul>
                            
                            </div>
            }
            
            
            <form className="pure-form pure-form-stacked" onSubmit={handleSubmit(onSubmit)}>
              <fieldset>
                  <div className="pure-control-group">
                      <label htmlFor="selectedFile">Select file</label>
                      <input name="selectedFile" required={true} type="file" id="selectedFile" placeholder="choose report file (csv)" ref={register({
                          validate: function (value) {
                                
                                const filename = value[0].name
                                // Allowing file type 
                                //var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.gif)$/i; 
                                var allowedExtensions =  /(\.csv)$/i; 
                                if (!allowedExtensions.exec(filename)) { 
                            
                                    return 'Invalid CSV file upload'; 
                                } 

                                return true;
                                  
                              }
                      })} />
                  </div>
                  <br/>
                  
                  <div className="pure-controls">
                      <button type="submit" className="pure-button button-secondary">
                      {uploading && <img src="/img/loading.gif" className="button-loader" /> }
                          Submit
                        </button>
                  </div>
                </fieldset>
              </form>
          
            
        </div>
    </div>
}


const mapStateToProps = state => ({
    selectedUser: state.users.selectedUser,
    uploading: state.users.uploading,
    uploadReportSuccess: state.users.uploadReportSuccess,
    uploadReportError: state.users.uploadReportError,
  });

const mapDispatchToProps = {
    uploadReport: userActions.uploadReport
};
  
export default connect(mapStateToProps, mapDispatchToProps)(UploadReportModal) 
