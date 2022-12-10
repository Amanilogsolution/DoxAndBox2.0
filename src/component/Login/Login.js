import React, { useState } from 'react'
import './Login1.css'
import Image from '../../assets/icons/icon-512x5122.png'
import { UserLogin } from '../../api/index'


function Login() {
	const [showpassword, setShowpassword] = useState(true)
	const [showerror, setShowerror] = useState(false)
	const [mandatorydata, setMandatorydata] = useState(false)

	const handleClickChangeicon = () => {
		setShowpassword(!showpassword)
	}

	const handleClick = async (e) => {
		e.preventDefault()
		const uid_id = document.getElementById('user').value;
		const uid_pass = document.getElementById('password').value;

		if (!uid_id || !uid_pass) {
			setMandatorydata(true)
			setShowerror(false)
		}
		else {
			const result = await UserLogin(uid_id, uid_pass)
			console.log(result)
			if (result) {
				window.location.href = '/Dashboard'
				localStorage.setItem('CUST_ID', result.CUST_ID)
				localStorage.setItem('Warehouse_ID', result.WHID)
				localStorage.setItem('Login_Warehouse_ID', result.WHID)
				localStorage.setItem('User_ID', result.UID)
				localStorage.setItem('User_Name', result.cust_name)
				localStorage.setItem('Wh_name', result.uwh)
			}
			else {
				setShowerror(true)
				setMandatorydata(false)
			}
		}

	}
	return (
		<>
			{/* <div className="logincontainer" >
				<div className="container" >
					<div className="navcontainer">
						<div id="loginbox" className="mainbox " >
							<div className="row">
								<div className="iconmelon" >
									<img src={Image} alt="logo" />
								</div>
							</div>
							<div className="panel-heading">
								<div className="panel-title text-center text-white " style={{ fontSize: "20px", fontWeight: "600" }} >Login</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-body">
									<form name="form" id="form" className="form-horizontal" >
										<div className="input-group">
											<span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>

											<input id="user" type="email" className="form-control" name="user" placeholder="User" required />
										</div>
										<div className="input-group">

											<span className="input-group-addon" onClick={handleClickChangeicon}>
												{showpassword ? <i className="glyphicon glyphicon-eye-close"></i>
													: <i className="glyphicon glyphicon-eye-open"></i>}</span>

											<input id="password" type={showpassword ? 'password' : 'text'} className="form-control" name="password" placeholder="Password" required />

										</div>
										{mandatorydata ? <p style={{ color: "red" }}>Please! Fill the mandatory field...</p> : null}
										{showerror ? <p style={{ color: "red" }}>Invalid UserId & Password</p> : null}
										<div className="form-group">
											<button type="submit" onClick={handleClick} className="btn btn-primary"> Log in</button>
										</div>
									</form>
								</div>
							</div>

						
						</div>
					</div>
					<div>
				</div>
			</div>
		</div> */}
			<div className="logincontainer" >
				<div className="parentbox">
					<div className='content'>
						<div className="contentdata">
							<h1>D O X - a n a l y t i c s</h1>


						</div>

					</div>

					<div className="loginbox">
						<div className="iconmelon" >
							<img src={Image} alt="logo" />
						</div>
						<div className="panel-heading">
							<div className="panel-title text-center text-black " style={{ fontSize: "20px", fontWeight: "600" }} >Login
							<span style={{marginLeft:"5px"}}><i className="glyphicon glyphicon-user" /></span></div>
						</div>
						<form name="form" id="form" className="loginform" >
							<div className="input-group">
								<span className="input-group-addon"><i className="glyphicon glyphicon-user" /></span>

								<input id="user" type="email" className="form-control" name="user" placeholder="User" required />
							</div>
							<div className="input-group">

								<span className="input-group-addon" onClick={handleClickChangeicon}>
									{showpassword ? <i className="glyphicon glyphicon-eye-close"></i>
										: <i className="glyphicon glyphicon-eye-open"></i>}</span>

								<input id="password" type={showpassword ? 'password' : 'text'} className="form-control" name="password" placeholder="Password" required />

							</div>
							{mandatorydata ? <p style={{ color: "red" }}>Please! Fill the mandatory field...</p> : null}
							{showerror ? <p style={{ color: "red" }}>Invalid UserId & Password</p> : null}
							<button type="submit" onClick={handleClick} className="btn btn-danger"> Log in</button>
						</form>

					</div>
				</div>
				<div className="loginfooter">
					<p>Copyright @ 2022-2023 Dox&Box.All right.reserved</p>

				</div>

			</div>
		</>

	)
}

export default Login
