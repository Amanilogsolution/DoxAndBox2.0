import React, { useState,useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import { rmsRequest,Totallocation } from '../../../api/index'


function ScanningRequest() {
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [totallocation,setTotallocation] = useState([])

    
    useEffect(()=>{
        const fetchdata=async()=>{
            const Totallocationresult = await Totallocation();
            setTotallocation(Totallocationresult)
        }
        fetchdata()
            
    },[])
    
    
    const handleClick = async (e) => {
        e.preventDefault();
        const noof_pages = document.getElementById('scanned_pages').value;
        const onsite = document.getElementById('onSite').value;
        const request_date = document.getElementById('dateofScanning').value;
        const remark = document.getElementById('remark').value;
        const locationid = localStorage.getItem('Warehouse_ID')
        const fileid = locationid + Math.floor(Math.random()*10000000)
        const requestid = locationid +'-'+Math.floor(Math.random()*10000000)+'-'+'SR'

        if (!noof_pages || !onsite || !request_date) {
            setMandatoryfield(true)
        }
        else {
            const result = await rmsRequest('ScanningRequest', '', '', request_date, '', '', '', '', noof_pages, onsite, '', remark, localStorage.getItem('User_ID'),fileid,locationid,requestid,localStorage.getItem('CUST_ID'))
            if(result){
                window.location.href = '/Dashboard'
            }
        }
    }
    return (
        <>
            <div className="generatorlogcontainer">
                <Navbar />
                <div>

                    <div className="col " style={{ margin: "80px auto", width: "630px" }}>
                        <div className="card" style={{ boxShadow: "2px 2px 5px #333" }} >
                            <header className="card-header" style={{ background: "rgba(0,0,0,0.2)" }}>
                                <h4 className="card-title mt-2" >Request for Scaning</h4>
                            </header>
                            <article className="card-body" >
                                <form style={{ margin: "0px 20px 0px 15px" }}>
                                    {/* <h3 className="card-title mt-2">Request for Scaning</h3> */}
                                    <br />
                                    {/* <div className="form-group">
                                        <label>Warehouse  <span style={{ color: "red" }}>*</span></label>
                                       <select className="form-control" id="locationid" style={{height:"35px"}}>
                                        <option value='' hidden>Select the warehouse</option>
                                                  {
                                                    totallocation.map((item,index)=>
                                                    <option key={index} value={item.WHid}>{item.WHname}</option>)
                                                    
                                                  }
                                       </select>
                                    </div> */}

                                    <div className="form-group">
                                        <label>Total no of Pages to be Scanned <span style={{ color: "red" }}>*</span></label>
                                        <input type="number" className="form-control" id='scanned_pages' />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6" >
                                            <label>Date Of Scanning <span style={{ color: "red" }}>*</span></label>
                                            <input type="date" className="form-control" id='dateofScanning' />
                                        </div>
                                        <div className="form-group col-md-6" >
                                            <label>On Site Scan <span style={{ color: "red" }}>*</span></label>
                                            <select className="form-control" id='onSite' style={{ height: "32px" }}>
                                                <option defaultValue hidden>Choose ...</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Remarks</label>
                                        <textarea className="form-control" placeholder="Comments" type="text" id='remark' />
                                    </div>
                                    {
                                        mandatoryfield ?
                                            <p style={{ color: "red" }}>Please! fill the mandatory field.</p>
                                            : null
                                    }

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary float-right mb-4" onClick={handleClick}>Submit</button>
                                        <button type="submit" className="btn btn-secondary mr-4 float-right mb-4">Reset</button>
                                    </div>
                                </form>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScanningRequest
