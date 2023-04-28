import React, { useState,useEffect } from 'react';
import './navbar.css'
import { Totallocation } from '../../api/index'



const SideBar = ({ openClass }) => {
  const [recorddiv, setRecorddiv] = useState(false);
  const [reportdiv, setReportdiv] = useState(false);
  const [RequestStatusReport, setRequestStatusReport] = useState(false);
  const [show, setShow] = useState(false)


  const [profilrdiv, setProfilrdiv] = useState(false);
  const [totallocation, setTotallocation] = useState([])

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


  const handlerecord = () => {
    setRecorddiv(!recorddiv);
    setReportdiv(false);
    setProfilrdiv(false);

  }

  const handlereport = () => {
    setRecorddiv(false);
    setReportdiv(!reportdiv);
    setProfilrdiv(false);
  }
  const handlereprofile = () => {
    setRecorddiv(false);
    setProfilrdiv(!profilrdiv);
    setReportdiv(false);
    
  }

  const handlerequestStatusReport = () => {
    setRecorddiv(false);
    setReportdiv(false);
    setProfilrdiv(false);
    setRequestStatusReport(!RequestStatusReport)
  }
  
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
  return (
    <nav className={openClass === true ? 'closeslidernav slidernav' : ' slidernav'}>
      <ul className="navlist">
        <li>
          <a className="menu-item" href="/Dashboard">
            <i className="material-icons">dashboard</i>
            &nbsp;Dashboard
          </a>
        </li>

        {/* <li>
          <a className="menu-item" href='#'>
            <i className="material-icons">list</i>
            &nbsp;Digital Files
          </a>
        </li> */}
        <li>
          <a className="menu-item" href="#">
            <i className="material-icons">arrow_forward_ios</i>
            <span onClick={handlerecord}>Request</span>
          </a>

        </li>
        {recorddiv ?
          <ul className="innerul" id='reportinnerdiv'  >
            <a href='/RecordPickup'><li>Record Pickup</li></a>
            <a href='/RecordRetrival'><li>Record Retrieval</li></a>
            <a href='/ScanningRequest'> <li>Scanning Request</li></a>
            <a href='/Shredding'> <li>Shredding</li></a>
            <a href='/OtherRequest'>  <li>Other</li></a>
          </ul>
          : null}

<li>
          <a className="menu-item" href='#' >

            <span onClick={handlerequestStatusReport}><i className="material-icons">arrow_forward_ios</i>
              Request Status Report</span>

          </a>
        </li>
        {RequestStatusReport ?
          <ul className="innerul" id='reportinnerdiv' >
            <a href="/RecordPickupReport"> <li>Pickup Report</li></a>
            <a href="/RecorRetrivalReport"> <li>Retrieval Report</li></a>
            <a href="/ShreddingRequestReport"> <li>Shredding Report</li></a>
            <a href="/ScanningRequestReport"> <li>Scanning Report</li></a>
            <a href="/OtherRequestReport"> <li>Other Report</li></a>

          </ul>
          : null}

        <li>
          <a className="menu-item" href='#' >

            <span onClick={handlereport}><i className="material-icons">arrow_forward_ios</i>
              Reports</span>

          </a>
        </li>
        {reportdiv ?
          <ul className="innerul" id='reportinnerdiv' >
            <a href="/InwardReports"> <li>Inward Report</li></a>
            <a href="/RetrivalReports"> <li>Retrieval Report</li></a>
            <a href="/ScanningReports"> <li>Scanning Report</li></a>
            <a href="/StockReports"> <li>Stock Report</li></a>
          </ul>
          : null}

          <li>
          <div className="profilediv2 mr-5">
          <select style={{ border: "none", background: "none", color:"red" }} onChange={handleChange}>
            <option hidden>{localStorage.getItem('Wh_name')} </option>

            {show ?
              totallocation.map((ele) => (
                <option key={ele.WHid} value={`${ele.WHid},${ele.WHname}`} style={{ fontSize: "17px" }}>{ele.WHname} </option>
              )) : null
            }


          </select>

        </div>

          </li>

          
        <li>
          <a className="menu-item" href='#' >

            <span onClick={handlereprofile} className="profiletext"><i className="material-icons">person</i>
              Account</span>
          </a>
        </li>
        {profilrdiv ?
          <ul className="innerprofileul" id='reportinnerdiv' >
            <a href="/Profile"> <li>Profile</li></a>
            <a href="/Changepassword"> <li>Change Password</li></a>
            <a href="#" onClick={handleClick}> <li>Logout</li></a>
          
          </ul>
          : null}

      </ul>
    </nav>
  );
};

export default SideBar;