import React, { useEffect, useState } from 'react';
import SideBar from './Sidebar';
import './Navbar2.css';
import LOGOimg from '../../assets/doxlogo.png'
import { Totallocation } from '../../api/index'
import { HiMenu } from 'react-icons/hi';
import { ImLocation } from 'react-icons/im';
import logo from '../Images/logoWithoutText.png'


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


      <nav className='Navbar'>
        <div className='brand_slidericon d-flex'>
          <HiMenu onClick={handleOn} style={{ cursor: "pointer", color: "white", fontSize: "37px" }} />
          <div className='d-flex justify-content-center w-75 mt-1'>
            <img style={{width:'50px',height:"50px",margin:"-7px 0 0 0"}} src={logo} />
            <p>DOX & BOX</p>
          </div>
        </div>
        <div className='nav_content '>
          <div className='mx-5' style={{borderRight:"1px solid",padding:"0 20px"}}>
            &nbsp;{localStorage.getItem('User_Name')}
          </div>
          <div className="profilediv2  ">
            <ImLocation style={{fontSize:"20px",margin:"0 0 -3px 0"}}/>
            <select style={{ border: "none", background: "none" }} onChange={handleChange}>
              <option hidden>{localStorage.getItem('Wh_name')} </option>

              {show ?
                totallocation.map((ele) => (
                  <option key={ele.WHid} value={`${ele.WHid},${ele.WHname}`} style={{ fontSize: "17px" }}>{ele.WHname} </option>
                )) : null
              }

            </select>

          </div>
        </div>
      </nav>
      <SideBar openClass={on} />
    </div>
  )
}

export default Navbar
