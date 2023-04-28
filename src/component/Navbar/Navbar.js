import React, { useEffect, useState } from 'react';
import SideBar from './Sidebar';
import './navbar.css';
import LOGOimg from '../../assets/doxlogo.png'
import { Totallocation } from '../../api/index'


function Navbar() {
  const [on, setOn] = React.useState(true);
  const [totallocation, setTotallocation] = useState([])
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const result = await Totallocation(localStorage.getItem('CUST_ID'))
      console.log('wharehouse', result)

      setTotallocation(result)

      if (localStorage.getItem('Login_Warehouse_ID') === 'CORP') {
        setShow(true)
      }
    }
    fetch()
  }, [])

  const handleClick = () => {
    window.location.href = '/'
    localStorage.clear();
  }

  const handleChange = (e) => {
    const string = e.target.value
    const split = string.split(",")
    console.log(split)

    localStorage.setItem('Warehouse_ID', split[0])
    localStorage.setItem('Wh_name', split[1])


    window.location.reload()
  }

  const handleOn = () => {
    setOn(!on);
  };
  return (
    <div>
      <nav className="topnav ">
        <div className="navicon">
          <a href="#" onClick={handleOn}>
            <svg xmlns="http://www.w3.org/2000/svg" height="45" width="45" fill="#333"><path d="M6 36V33H42V36ZM6 25.5V22.5H42V25.5ZM6 15V12H42V15Z" /></svg>
          </a>
        </div>

        <div className="navlogo">
          <div style={{ height: "60px", marginTop: "-13px" }}>
            <img src={LOGOimg} style={{ height: "89%" }} alt="dox and box logo" /> &nbsp;Dox and Box</div>
        </div>

         <div className="loginname">
           <div>
             &nbsp;{localStorage.getItem('User_Name')}</div>
         </div>

        <div class="profilediv btn-group ">
          <i className="material-icons">person</i>
          <button type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ background: "transparent", border: "none" }}>
            Account
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/Profile">Profile</a>
            <a class="dropdown-item" href="/Changepassword">Change Password</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" onClick={handleClick} href="#">Logout</a>
          </div>
        </div>


        <div className="profilediv2 mr-5">
          <select style={{ border: "none", background: "none" }} onChange={handleChange}>
            <option hidden>{localStorage.getItem('Wh_name')} </option>

            {show ?
              totallocation.map((ele) => (
                <option key={ele.WHid} value={`${ele.WHid},${ele.WHname}`} style={{ fontSize: "17px" }}>{ele.WHname} </option>
              )) : null
            }


          </select>

        </div>

      </nav>
      <SideBar openClass={on} />
    </div>
  )
}

export default Navbar
