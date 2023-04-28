import React, { useState,useEffect } from 'react'
import Navbar from '../../Navbar/Navbar'
import { rmsRequest, Mail, Totallocation } from '../../../api/index'

function RecordPickup() {
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [totallocation, setTotallocation] = useState([])


    useEffect(() => {
        const fetchdata = async () => {
            const Totallocationresult = await Totallocation();
            setTotallocation(Totallocationresult)
        }
        fetchdata()

    }, [])

    const handleChangeNumber = (e)=>{
        if(e.target.value.length>10){
            alert('Number is More than 10');
            document.getElementById('Contactpersonname').value = ""

            // e.target.value=""
        }
        console.log(e.target.value.length)
    }



    const handleClick = async (e) => {
        e.preventDefault();
        const location = document.getElementById('Location').value;
        const noof_files = document.getElementById('nooffiles').value;
        const request_date = document.getElementById('Pickupdate').value;
        const request_time = document.getElementById('pickuptime').value;
        const remark = document.getElementById('remark').value;
        const locationid = localStorage.getItem('Warehouse_ID')
        const fileid = locationid + Math.floor(Math.random()*10000000)
        const requestid = locationid +'-'+Math.floor(Math.random()*10000000)+'-'+'RP'
        const Contactperson = document.getElementById('ContactPerson').value;
        const Personno = document.getElementById('Contactpersonnumber').value
        const Deparment = document.getElementById('department').value

        console.log(location,noof_files,request_date,request_time,remark,locationid,fileid,requestid,Contactperson,Personno,Deparment)

        const message = {
            Location: location,
            NoofFiles: noof_files,
            date: request_date,
            time: request_time,
            Remark: remark,
            requestType: 'RecordPickup'

        }

        if (!location || !noof_files || !request_date || !request_time) {
            setMandatoryfield(true)
        }
        else {
            const mailresponse = await Mail('RecordPickup', message);
            const result = await rmsRequest('RecordPickup', location, noof_files, request_date, request_time, '', '', '', '', '', '', remark, localStorage.getItem('User_ID'),fileid,locationid,requestid,localStorage.getItem('CUST_ID'),'',Contactperson,Personno,Deparment)
        }

    }

    return (
        <>
            <div className="generatorlogcontainer">
                <Navbar />
                <div>

                    <div className="col " style={{ margin: "75px auto", width: "630px" }}>
                        <div className="card " style={{ boxShadow: "2px 2px 5px #333" }}>
                            <header className="card-header" style={{ background: "rgba(0,0,0,0.2)" }}>
                                <h4 className="card-title mt-2" >Request for record pickup</h4>
                            </header>
                            <article className="card-body ">
                                <form style={{ margin: "0px 15px 0px 15px" }}>
                                    {/* <h3 className="card-title mt-4">Request for record pickup</h3><br/> */}
                                    <br />
                                    {/* <div className="form-group">
                                        <label>Warehouse  <span style={{ color: "red" }}>*</span></label>
                                        <select className="form-control" id="locationid" style={{ height: "35px" }}>
                                            <option value='' hidden>Select the warehouse</option>
                                            {
                                                totallocation.map((item, index) =>
                                                    <option key={index} value={item.WHid}>{item.WHname}</option>)

                                            }
                                        </select>
                                    </div> */}
                                    <div className="form-group">
                                        <label>Location <span style={{ color: "red" }}>*</span></label>
                                        <input placeholder="Location, City & PIN etc" type="Text" className="form-control" id='Location' />
                                    </div>
                                    <div className="form-group">
                                        <label>No of Files <span style={{ color: "red" }}>*</span> </label>
                                        <input type="number" placeholder="Total no of Files" className="form-control" id="nooffiles" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Pickup Date <span style={{ color: "red" }}>*</span></label>
                                            <input type="date" className="form-control" id='Pickupdate' />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Pickup Time <span style={{ color: "red" }}>*</span></label>
                                            <input type="time" className="form-control" id='pickuptime'
                                            />

                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Contact Person</label>
                                            <input type="text" className="form-control" id='ContactPerson' />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Contact Person Number</label>
                                            <input type="number" className="form-control" id='Contactpersonnumber' onChange={handleChangeNumber}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Department</label>
                                        <input className="form-control" type="text" id='department' />
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

                                    <div className="form-group" >
                                        <button type="submit" className="btn btn-primary  float-right mb-4" onClick={handleClick}>Submit</button>
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

export default RecordPickup
