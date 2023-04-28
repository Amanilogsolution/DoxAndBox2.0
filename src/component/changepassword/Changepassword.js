import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar'
import './changepass.css'
import { PasswordChange } from '../../api/index'

function Changepassword() {
    const [mandatoryfield, setMandatoryfield] = useState(false);
    const [showpass, setShowpass] = useState(false);
    const [showpass2, setShowpass2] = useState(false);
    const [showpass3, setShowpass3] = useState(false);


    const toggleicon = () => {
        setShowpass(!showpass);
    }
    const toggleicon2 = () => {
        setShowpass2(!showpass2);
    }
    const toggleicon3 = () => {
        setShowpass3(!showpass3);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const uid_id = document.getElementById('userID').value;
        const uid_pass = document.getElementById('userpassword').value;
        const newpassword = document.getElementById('newpassword').value;
        const confirmpassword = document.getElementById('confirmpassword').value;

        if (!uid_id || !uid_pass || !newpassword || !confirmpassword) {
            setMandatoryfield(true)
        }
        else {
            if (newpassword === confirmpassword) {
                const result = await PasswordChange(uid_id, uid_pass, localStorage.getItem('Warehouse_ID'), newpassword);
                if (result === 'PasswordChanged') {
                    alert('Password Changed Successfully')
                    window.location.href = '/Dashboard'
                } else {
                    alert('Invalid User ID or Password')
                }
            }

            else {
                alert('Password does not match')
            }
        }

    }

    return (
        <>
            <div className="changepasscontainer">
                <Navbar />
                <div>
                    <div className="col " style={{ margin: "70px auto", width: "620px" }}>
                        <div className="card" style={{ boxShadow: "2px 2px 5px #333" }}>
                            <header className="card-header" style={{ background: "rgba(0,0,0,0.2)" }}>
                                <h4 className="card-title mt-2" >Generator Log Book Entry</h4>
                            </header>
                            <article className="card-body">
                                <form className='col'>
                                    <br />

                                    <label>User Id <span style={{ color: "red" }}>*</span></label>

                                    <div className="input-group">
                                        <input id="userID" type='text' className="form-control" name="userID" placeholder="UserID" required />
                                    </div><br />
                                    <label>Current Password <span style={{ color: "red" }}>*</span></label>
                                    <div className="input-group">
                                        <span className="input-group-addon" onClick={toggleicon}>
                                            {showpass ? <i className="glyphicon glyphicon-eye-open"></i>
                                                : <i className="glyphicon glyphicon-eye-close"></i>}</span>

                                        <input id="userpassword" type={showpass ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" required />

                                    </div><br />

                                    <label>New Password <span style={{ color: "red" }}>*</span></label>

                                    <div className="input-group">

                                        <span className="input-group-addon" onClick={toggleicon2}>
                                            {showpass2 ? <i className="glyphicon glyphicon-eye-open"></i>
                                                : <i className="glyphicon glyphicon-eye-close"></i>}</span>

                                        <input id="newpassword" type={showpass2 ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" required />
                                    </div><br />
                                    <label>Confirm Password <span style={{ color: "red" }}>*</span></label>

                                    <div className="input-group">

                                        <span className="input-group-addon" onClick={toggleicon3}>
                                            {showpass3 ? <i className="glyphicon glyphicon-eye-open"></i>
                                                : <i className="glyphicon glyphicon-eye-close"></i>}</span>

                                        <input id="confirmpassword" type={showpass3 ? 'text' : 'password'} className="form-control" name="password" placeholder="Password" required />

                                    </div><br />

                                    {
                                        mandatoryfield ?
                                            <p style={{ color: "red" }}>Please! fill the mandatory field.</p>
                                            : null
                                    }


                                    <div className="form-group" >
                                        <button type="submit" className="btn btn-primary float-right mb-5 mt-3" onClick={handleClick} id="subnitbtn">Change Password</button>
                                        <button className="btn btn-secondary mr-4 float-right mb-5 mt-3" onClick={() => { window.location.href = '/Dashboard' }}>Cancel</button>
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

export default Changepassword;