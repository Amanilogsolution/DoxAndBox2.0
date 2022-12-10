import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { ProfileDetails,GenerateTwofa,Verify2fa } from "../../api";

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [tfadata, setTfadata] = useState([]);
    const [verify, setVerify] = useState('');


    useEffect(() => {
        const profile = async () => {
            const data = await ProfileDetails(localStorage.getItem("CUST_ID"));
            console.log(data)
            setProfile(data);

            const tfadataapi = await GenerateTwofa(data.custname, "Dox And Box");
            setTfadata(tfadataapi)
        }
        profile();
    }, []);

    const handletfatoggle = () => {
        const checkdata = document.getElementById('ckeckboxtfa').checked;
        if (checkdata === true) {
            document.getElementById('tfadiv').style.display = 'flex';
        }
        else {
            document.getElementById('tfadiv').style.display = 'none';
        }
    }

    const handleverify = async (e) => {
        e.preventDefault()
        const inputtoken = document.getElementById('tokeninp').value;
        const vetfytokendata = await Verify2fa(tfadata.secret, inputtoken,localStorage.getItem('CUST_ID'))
        if (vetfytokendata === 'Verify') {
            setVerify(true)
        }
        else if (vetfytokendata === 'NotVerify') {
            setVerify(false)
        }
        else {
            setVerify('')
        }
    }

    return (
        <>
            <div className="Profilediv">
                <Navbar />
                <div className="pb-2">

                    <div className="col " style={{ margin: "20px auto", width: "600px" }}>
                        <div style={{ display: "flex", flexDirection: "row-reverse", paddingRight: "15px" }}>
                            <h5>Member Since:- {profile.custdoe}</h5>
                        </div>
                        <div className="card" style={{ boxShadow: "2px 2px 5px #333" }}>
                            <header className="card-header" style={{ background: "rgba(0,0,0,0.2)" }}>
                                <h4 className="card-title mt-2" >Contact Information</h4>
                            </header>
                            <article className="card-body" >
                                <form autoComplete="off">
                                    {/* <h3 className="card-title mt-2">Contact Information</h3> */}
                                    <br />
                                    <div className="form-group">
                                        <label>Name *</label>
                                        <input type="Text" className="form-control" value={profile.custname} disabled readOnly id='name' />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Email </label>
                                            <input type="email" className="form-control" value={profile.custemail} id="email" disabled readOnly />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Mobile </label>
                                            <input type="number" className="form-control" value={profile.custcontactno} id="mobile" disabled readOnly />
                                        </div>
                                    </div>
                                    <h4 className="card-title mt-2">Address</h4><br />
                                    <div className="form-group">
                                        <label>Address 1 </label>
                                        <input type="Text" className="form-control" value={profile.custadd} id='address1' disabled readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Address 2</label>
                                        <input type="Text" className="form-control" value={profile.custadd1} id='address2' disabled readOnly />
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Country</label>
                                            <input type="text" className="form-control" value={profile.custcountry} id='country' disabled readOnly />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>State</label>
                                            <input type="text" className="form-control" value={profile.custstate} id='city' disabled readOnly />

                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>City</label>
                                            <input type="text" className="form-control" value={profile.custcity} id='state' disabled readOnly />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Pincode </label>
                                            <input type="number" className="form-control" value={profile.custpin} id='pincode' disabled readOnly />

                                        </div>
                                    </div>

                                    <div className="form-row">
                                                    <label htmlFor="designation" className="col-md-4 col-form-label ">2 Factor Authentication </label>
                                                    <div className="col form-group">
                                                        <input type="checkbox" className="form-control col-md-1 " id='ckeckboxtfa' onChange={handletfatoggle} style={{ height: "20px", width: "20px", marginTop: "5px" }} />
                                                    </div>

                                                </div>

                                                <div className="form-row" id="tfadiv" style={{ display: "none" }}>
                                                    <div className="col-md-2 form-group" >
                                                    </div>
                                                    <div className="col-md form-group" >
                                                        <img src={tfadata.qr} alt='' /><br/>
                                                        <div className="col form-group mt-2"  >
                                                            <input type='number' id='tokeninp' className="form-control col-md-7"
                                                                placeholder='Enter Token' />
                                                            <button className='btn btn-success' 
                                                            onClick={handleverify}
                                                            >Verify</button>
                                                            {verify === true ?
                                                                <h5 style={{ color: "green" }}>Verify</h5>
                                                                : verify === false ? <h5 style={{ color: "red" }}>Wrong Token</h5>
                                                                    : <p></p>}
                                                        </div>
                                                    </div>

                                                </div>



                                    {/* <div className="form-group" >
                                        <button type="submit" className="btn btn-primary  float-right">Update</button>
                                        <button type="submit" className="btn btn-secondary mr-4 float-right">Reset</button>
                                    </div> */}
                                </form>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;