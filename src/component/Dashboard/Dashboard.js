import Navbar from '../Navbar/Navbar'
import React, { useEffect, useState } from 'react';
import './dashboard.css'
import { Dashboardetails, Dashboardrequest, DashbaordetailsPie } from '../../api/index';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,PieChart, Pie, Cell } from "recharts";
// import { PieChart, Pie, Cell } from "recharts";


function Dashboard() {
    const [data, setData] = useState({})
    const [barvalue, setBarvalue] = useState([])
    const [pievalue, setPievalue] = useState([])
    // const [activeIndex, setActiveIndex] = useState(0);


   
      const onPieEnter = (index) => {
         console.log(index.name)
                  window.location.href=`/${index.name}Report`


      }

      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042",'#333'];



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

                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                        
                                        <div className="dashcard" style={{ borderBottom: "5px solid orange" }}>
                                            <p className="title">Inbound files</p>
                                            <div className="contect">
                                                <div className=" halfdiv lifetime">
                                                    <h2>{data.InwardFileMonth}</h2>
                                                    <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Inbound files" style={{ fontSize: "17px", paddingTop: "3px" }}>info</i> Life Time</p>
                                                </div>
                                                <div className="halfdiv month">
                                                    <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Inbound files in current month" style={{ fontSize: "17px", paddingTop: "3px" }} >info</i>Current Month</p>
                                                    <h2>{data.CurrentMonthFile}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card">
                                        <div className="dashcard" style={{ borderBottom: "5px solid red" }}>
                                            <p className="title">Outbound files</p>
                                            <div className="contect">
                                                <div className=" halfdiv lifetime">
                                                    <h2>{data.TotalOUT}</h2>
                                                    <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Outbound files" style={{ fontSize: "17px", paddingTop: "3px" }}>info</i> Life Time</p>
                                                </div>
                                                <div className="halfdiv month">
                                                    <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Outbound files in current month" style={{ fontSize: "17px", paddingTop: "3px" }} >info</i>Current Month</p>
                                                    <h2>{data.OUTCURRENTMONTH}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card" >
                                        <div className="dashcard" style={{ borderBottom: "5px solid green" }}>
                                            <p className="title">Active files</p>
                                            <div className="contect">
                                                <div className=" halfdiv lifetime">
                                                    <h2>{data.LTActivefile}</h2>
                                                    <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Active files stored till date" style={{ fontSize: "17px", paddingTop: "3px" }}>info</i> Life Time</p>
                                                </div>
                                                <div className="halfdiv month">
                                                    <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Active files stored till date" style={{ fontSize: "17px", paddingTop: "3px" }} >info</i>Current Month</p>
                                                    <h2>{data.Current_month_activefile}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='dashboardstatuscard dashboardcards2' >
                                    <div className="col">
                                        <div className="card">
                                            <div className="dashcard" style={{ borderBottom: "5px solid orange" }}>
                                                <p className="title">Inbound Box</p>
                                                <div className="contect">
                                                    <div className=" halfdiv lifetime">
                                                        <h2>{data.TotalLIFETIMEInwardbox}</h2>
                                                        <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Inbound Box" style={{ fontSize: "17px", paddingTop: "3px" }}>info</i> Life Time</p>
                                                    </div>
                                                    <div className="halfdiv month">
                                                        <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Inbound Box in current month" style={{ fontSize: "17px", paddingTop: "3px" }} >info</i>Current Month</p>
                                                        <h2>{data.CurrentInwardbox}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card">
                                        
                                            <div className="dashcard" style={{ borderBottom: "5px solid red" }}>
                                                <p className="title">Outbound Box</p>
                                                <div className="contect">
                                                    <div className=" halfdiv lifetime">
                                                        <h2>{data.outboxLifetime}</h2>
                                                        <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Outbound Box" style={{ fontSize: "17px", paddingTop: "3px" }}>info</i> Life Time</p>
                                                    </div>
                                                    <div className="halfdiv month">
                                                        <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Outbound Box in current month" style={{ fontSize: "17px", paddingTop: "3px" }} >info</i>Current Month</p>
                                                        <h2>{data.CurrentOutBox}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col" >
                                        <div className="card">
                                    
                                            <div className="dashcard" style={{ borderBottom: "5px solid green" }}>
                                                <p className="title">Active Box</p>
                                                <div className="contect">
                                                    <div className=" halfdiv lifetime">
                                                        <h2>{data.Lifettimeactivebox}</h2>
                                                        <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Active Box stored till date" style={{ fontSize: "17px", paddingTop: "3px" }}>info</i> Life Time</p>
                                                    </div>
                                                    <div className="halfdiv month">
                                                        <p><i className="material-icons " delay="0" data-toggle="tooltip" title="Total Number of Active Box stored current month" style={{ fontSize: "17px", paddingTop: "3px" }} >info</i>Current Month</p>
                                                        <h2>{data.CurrentMonthActiveBOX}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <div className="row">
                            <div style={{ width: "80%", margin: "20px auto",display:"flex",alignContent:"space-between" }}>
                        <div className="Barchart">
                            <ResponsiveContainer aspect={2}>
                                <BarChart data={barvalue} margin={{ top: 20, right: 45 }}>
                                    <CartesianGrid />
                                    <XAxis dataKey="Month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Active" fill="green" />
                                    <Legend />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="Piechart">
                            <PieChart width={500} height={300}>
                                <Pie
                                    dataKey="value"
                                    isAnimationActive={true}
                                    data={pievalue}
                                    onClick={onPieEnter}
                                    cx={200}
                                    cy={150}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {pievalue.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend layout="vertical" verticalAlign="top" align="right"
                                />

                                <Tooltip />
                            </PieChart>
                        </div>
                    </div>

                            </div>

                        </div>
                    </div>
                

                </div>

            </div>
        </>
    )
}

export default Dashboard;