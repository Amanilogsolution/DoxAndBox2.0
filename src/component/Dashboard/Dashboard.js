import Navbar from '../Navbar/Navbar'
import React, { useEffect, useState } from 'react';
import './dashboard.css'
import { Dashboardetails, Dashboardrequest, DashbaordetailsPie } from '../../api/index';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaHeartbeat,FaBox,FaFile } from 'react-icons/fa';
import Footer from '../Navbar/Footer.js'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,LineChart,Line } from "recharts";
// import { PieChart, Pie, Cell } from "recharts";


function Dashboard() {
    const [data, setData] = useState({})
    const [barvalue, setBarvalue] = useState([])
    const [pievalue, setPievalue] = useState([])
    // const [activeIndex, setActiveIndex] = useState(0);
    const dataz = [
        {
          "name": "Page A",
          "uv": 4000,
          "pv": 2400,
          "amt": 2400
        },
        {
          "name": "Page B",
          "uv": 3000,
          "pv": 1398,
          "amt": 2210
        },
        {
          "name": "Page C",
          "uv": 2000,
          "pv": 9800,
          "amt": 2290
        },
        {
          "name": "Page D",
          "uv": 2780,
          "pv": 3908,
          "amt": 2000
        },
        {
          "name": "Page E",
          "uv": 1890,
          "pv": 4800,
          "amt": 2181
        },
        {
          "name": "Page F",
          "uv": 2390,
          "pv": 3800,
          "amt": 2500
        },
        {
          "name": "Page G",
          "uv": 3490,
          "pv": 4300,
          "amt": 2100
        }
      ]

    const onPieEnter = (index) => {
        console.log(index.name)
        window.location.href = `/${index.name}Report`


    }

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", '#333'];



    useEffect(() => {
        const data = async () => {

            const res1 = await Dashboardetails(localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'))
            setData(res1)

            const dashboardpie = await DashbaordetailsPie(localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'))
            setPievalue(dashboardpie)

            const res3 = await Dashboardrequest()
            setBarvalue(res3)
        }
        data()
    }, [])
    return (
        <>
            <div className="dashboardcontainer" >
                <Navbar />
                <div className='dashboardwrapper'  >
                    <div className='dashboardstatuscard' >
                      <h4 className='dash_heading'>Files <FaFile style={{fontSize:"18px",margin:"0 0 -2px 0"}}/></h4>
                        <div className='row1'>
                            
                            <div className='card1' id="inbound">
                                <h2 style={{ fontSize: "15px" }}>Inbound </h2>
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            <FaHeartbeat className='life_icon'  />
                                             <h5 className="title">Life Time</h5>
                                        </div>
                                         <h1 className="nums">{data.InwardFileMonth}</h1>
                                    </div>
                                    <div className="card_icon" style={{borderLeft:"2px solid silver"}}>
                                        <div>
                                            <BsFillCalendarCheckFill className='month_icon'  />
                                             <h5 className="title" style={{marginTop:"3px"}}>Current Month</h5>
                                        </div>
                                         <h1 className="nums">{data.CurrentMonthFile}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='card1' id="outbound">
                                <h2 style={{ fontSize: "15px" }}>Outbound </h2>
                               
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            <FaHeartbeat className='life_icon'  />
                                             <h5 className="title">Life Time</h5>
                                        </div>
                                         <h1 className="nums" >{data.TotalOUT}</h1>
                                    </div>
                                    <div className="card_icon" style={{borderLeft:"2px solid silver"}}>
                                        <div>
                                            <BsFillCalendarCheckFill className='month_icon'/>
                                              <h5 className="title" style={{marginTop:"3px"}}>Current Month</h5>
                                        </div>
                                         <h1 className="nums" >{data.OUTCURRENTMONTH}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='card1' id="active">
                                <h2 style={{ fontSize: "15px" }}>Active </h2>
                               
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            <FaHeartbeat className='life_icon'  />
                                             <h5 className="title">Life Time</h5>
                                        </div>
                                         <h1 className="nums" >{data.LTActivefile}</h1>
                                    </div>
                                    <div className="card_icon" style={{borderLeft:"2px solid silver"}}>
                                        <div>
                                            <BsFillCalendarCheckFill className='month_icon'  />
                                              <h5 className="title" style={{marginTop:"3px"}}>Current Month</h5>
                                        </div>
                                         <h1 className="nums" >{data.Current_month_activefile}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 className='dash_heading'>Boxes <FaBox style={{fontSize:"18px",margin:"0 0 -2px 0"}}/>
                        </h4>
                        <div className='row2'>
                            <div className='card1' id="inbound">
                                <h2 style={{ fontSize: "15px" }}>Inbound </h2>
                               
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            <FaHeartbeat className='life_icon'  />
                                             <h5 className="title">Life Time</h5>
                                        </div>
                                         <h1 className="nums" >{data.TotalLIFETIMEInwardbox}</h1>
                                    </div>
                                    <div className="card_icon" style={{borderLeft:"2px solid silver"}}>
                                        <div>
                                            <BsFillCalendarCheckFill className='month_icon'  />
                                              <h5 className="title" style={{marginTop:"3px"}}>Current Month</h5>
                                        </div>
                                         <h1 className="nums" >{data.CurrentInwardbox}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='card1' id="outbound">
                                <h2 style={{ fontSize: "15px" }}>Outbound </h2>
                               
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            <FaHeartbeat className='life_icon'  />
                                             <h5 className="title">Life Time</h5>
                                        </div>
                                         <h1 className="nums" >{data.outboxLifetime}</h1>
                                    </div>
                                    <div className="card_icon" style={{borderLeft:"2px solid silver"}}>
                                        <div>
                                            <BsFillCalendarCheckFill className='month_icon'  />
                                              <h5 className="title" style={{marginTop:"3px"}}>Current Month</h5>
                                        </div>
                                         <h1 className="nums" >{data.CurrentOutBox}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='card1' id="active">
                                <h2 style={{ fontSize: "15px" }}>Active </h2>
                               
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            <FaHeartbeat className='life_icon'  />
                                             <h5 className="title">Life Time</h5>
                                        </div>
                                         <h1 className="nums" >{data.Lifettimeactivebox}</h1>
                                    </div>
                                    <div className="card_icon" style={{borderLeft:"2px solid silver"}}>
                                        <div>
                                            <BsFillCalendarCheckFill className='month_icon'  />
                                              <h5 className="title" style={{marginTop:"3px"}}>Current Month</h5>
                                        </div>
                                         <h1 className="nums" >{data.CurrentMonthActiveBOX}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row3'>
                            <div className='graph'>
                                <h4>Bar Chart - Dox & Box</h4>
                                <ResponsiveContainer aspect={3}>
                                    <BarChart data={barvalue} margin={{ top: 20, right: 45 }}>
                                        <CartesianGrid />
                                        <XAxis dataKey="Month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Active" fill="#222222" barSize={55} />
                                        <Legend />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            {/* <div className='graph'>
                            </div> */}
                        </div>

                    </div>

                    
                </div>
                 
            </div>
            <Footer/> 
        </>
    )
}

export default Dashboard;