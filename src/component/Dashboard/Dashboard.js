import Navbar from '../Navbar/Navbar'
import React, { useEffect, useState } from 'react';
import './dashboard.css'
import { Dashboardetails, Dashboardrequest, DashbaordetailsPie,dashbaorScannedPages } from '../../api/index';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { FaHeartbeat, FaBox, FaFile } from 'react-icons/fa';
import Footer from '../Navbar/Footer.js'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
// import { PieChart, Pie, Cell } from "recharts";


function Dashboard() {
    const [data, setData] = useState({})
    const [barvalue, setBarvalue] = useState([])
    const [pievalue, setPievalue] = useState([])
    const [ScanResult, setScanResult] = useState({})
    // const [activeIndex, setActiveIndex] = useState(0);
    const ScanData = [
        {
          "name": "Total Pages",
          "value": ScanResult.TotalPages
        },
        {
          "name": "Scanned Pages",
          "value": ScanResult.ScannedPages
        }
      ];

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

            const ScanRes = await dashbaorScannedPages(localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'))
            setScanResult(ScanRes)
        }
        data()
    }, [])
    return (
        <>
            <div className="dashboardcontainer " >
                <Navbar />
                <div className='dashboardwrapper'>
                    <div className='dashboardstatuscard' >
                        <h4 className='dash_heading text-light'>Files <FaFile style={{ fontSize: "18px", margin: "0 0 -2px 0" }} /></h4>
                        <div className='row1'>

                            <div className='card1' id="inbound">
                                <h2 style={{ fontSize: "15px" }}>Inbound </h2>
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            {/* <FaHeartbeat className='life_icon' /> */}
                                            <h5 className="life_icon">Life Time</h5>
                                        </div>
                                        <h1 className="nums">{data.InwardFileMonth}</h1>
                                    </div>
                                    <div className="card_icon" style={{ borderLeft: "2px solid silver" }}>
                                        <div>
                                            {/* <BsFillCalendarCheckFill className='month_icon' /> */}
                                            <h5 className="month_icon" >Current Month</h5>
                                        </div>
                                        <h1 className="nums">{data.CurrentMonthFile}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='card1' id="outbound">
                                <h2 style={{ fontSize: "15px" }}>Outbound</h2>
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            {/* <FaHeartbeat className='life_icon' /> */}
                                            <h5 className="life_icon">Life Time</h5>
                                        </div>
                                        <h1 className="nums" >{data.TotalOUT}</h1>
                                    </div>
                                    <div className="card_icon" style={{ borderLeft: "2px solid silver" }}>
                                        <div>
                                            {/* <BsFillCalendarCheckFill className='month_icon' /> */}
                                            <h5 className="month_icon" style={{ marginTop: "3px" }}>Current Month</h5>
                                        </div>
                                        <h1 className="nums" >{data.OUTCURRENTMONTH}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='card1' id="active">
                                <h2 style={{ fontSize: "15px" }}>Active</h2>
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            {/* <FaHeartbeat className='life_icon' /> */}
                                            <h5 className="life_icon">Life Time</h5>
                                        </div>
                                        <h1 className="nums" >{data.LTActivefile}</h1>
                                    </div>
                                    <div className="card_icon" style={{ borderLeft: "2px solid silver" }}>
                                        <div>
                                            {/* <BsFillCalendarCheckFill className='month_icon' /> */}
                                            <h5 className="month_icon" >Current Month</h5>
                                        </div>
                                        <h1 className="nums" >{data.Current_month_activefile}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 className='dash_heading'>Boxes <FaBox style={{ fontSize: "18px", margin: "0 0 -2px 0" }} />
                        </h4>
                        <div className='row2'>
                            <div className='card1' id="inbound">
                                <h2 style={{ fontSize: "15px" }}>Inbound </h2>
                                <div className='content'>
                                    <div className="card_icon">
                                        <div>
                                            {/* <FaHeartbeat className='life_icon' /> */}
                                            <h5 className="life_icon">Life Time</h5>
                                        </div>
                                        <h1 className="nums" >{data.TotalLIFETIMEInwardbox}</h1>
                                    </div>
                                    <div className="card_icon" style={{ borderLeft: "2px solid silver" }}>
                                        <div>
                                            {/* <BsFillCalendarCheckFill className='month_icon' /> */}
                                            <h5 className="month_icon" >Current Month</h5>
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
                                            {/* <FaHeartbeat className='life_icon' /> */}
                                            <h5 className="life_icon">Life Time</h5>
                                        </div>
                                        <h1 className="nums" >{data.outboxLifetime}</h1>
                                    </div>
                                    <div className="card_icon" style={{ borderLeft: "2px solid silver" }}>
                                        <div>
                                            {/* <BsFillCalendarCheckFill className='month_icon' /> */}
                                            <h5 className="month_icon" >Current Month</h5>
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
                                            {/* <FaHeartbeat className='life_icon' /> */}
                                            <h5 className="life_icon">Life Time</h5>
                                        </div>
                                        <h1 className="nums" >{data.Lifettimeactivebox}</h1>
                                    </div>
                                    <div className="card_icon" style={{ borderLeft: "2px solid silver" }}>
                                        <div>
                                            {/* <BsFillCalendarCheckFill className='month_icon' /> */}
                                            <h5 className="month_icon">Current Month</h5>
                                        </div>
                                        <h1 className="nums" >{data.CurrentMonthActiveBOX}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row3'>
                            <div className='graph' style={{ background: "white" }}>
                                <h5 className='text-light mx-5 mb-3'>Bar Chart - Dox & Box</h5>
                                <ResponsiveContainer >
                                    <BarChart width={600} height={280} data={barvalue} margin={{ right: 45, bottom: 13 }}>
                                        <CartesianGrid />
                                        <XAxis dataKey="Month" />
                                        <YAxis />
                                        <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.8)", borderRadius: "3px" }} />
                                        {/* <Legend /> */}
                                        <Bar dataKey="Active" fill="red" barSize={8} />
                                        {/* <Legend /> */}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className='graph' style={{ background: "white" }}>
                            <h5 className='text-dark mx-5 mb-3'>Pages Scanned Summary</h5>
                                <ResponsiveContainer width="100%">
                                    <PieChart width={700} height={200} margin={{top:12, right: 45, bottom: 20 }}>
                                        <Tooltip contentStyle={{ backgroundColor: "rgba(255,255, 255,0.8)",  borderRadius: "3px"}}  />
                                        <Pie labelLine={false} data={ScanData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="rgb(94, 4, 69)" label>
                                            {ScanData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                            ))}
                                        </Pie>
                                        <Legend layout="vertical" verticalAlign="top" align="right" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Dashboard;