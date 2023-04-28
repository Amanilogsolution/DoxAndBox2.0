import React, { useState, useEffect } from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { rmsReports,TotalScanReportCount } from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import '../response.css';
import { DatePicker } from "antd";
import Moment from "moment";
import "antd/dist/antd.css";
const { RangePicker } = DatePicker;

const columns = [
  {
    name: 'Scanning Date',
    selector: 'DateofScan',
    sortable: true
  },
  {
    name: 'No of Pages Scan',
    selector: 'PagesScan',
    sortable: true
  },
  {
    name: 'Department',
    selector: 'Department',
    sortable: true
  },
  {
    name: 'No of Files',
    selector: 'FileScan',
    sortable: true
  },
  // {
  //   name: 'Employee Name',
  //   selector: 'EmployeeName',
  //   sortable: true
  // },
  // {
  //   name: 'Man Power',
  //   selector: 'Manpower',
  //   sortable: true
  // },
  // {
  //   name: 'File Type',
  //   selector: 'filetype',
  //   sortable: true
  // },
  {
    name: 'File UID Number',
    selector: 'FileUIDNo',
    sortable: true
  },
  {
    name: 'File Name',
    selector: 'Filesname',
    sortable: true
  },
  {
    name: 'Box No',
    selector: 'boxno',
    sortable: true
  },
  {
    name: 'Total Pages scan on date',
    selector: 'dailypagesscan',
    sortable: true
  }
];



function ScanningReports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toogle, setToggle] = useState(true)
  const [pagescan,setPageScan] = useState()
  const [Totalfile,setTotalFile] = useState()


  useEffect(() => {
    async function fetchData() {
      var myDate = new Date();
      var day = myDate.getDate();
      var month = myDate.getMonth() + 1;
      var year = myDate.getFullYear();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      var startDate = year + "-" + month + "-" + "01";
      var endDate = year + "-" + month + "-" + day;

      const response = await rmsReports('Scanning', localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'), startDate, endDate)
      const Scancount = await TotalScanReportCount(localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),startDate,endDate)
      console.log(Scancount[0].TotalFile)
      setPageScan(Scancount[0].Pagescan)
      setTotalFile(Scancount[0].TotalFile)
      setData(response)
      console.log(response)
      if (response) {
        setLoading(false);
      }
    }
    fetchData();
  }, [])

  const tableData = {
    columns, data
  };

  const setfun = async (e) => {

    const val1 = Moment(e[0]).format("YYYY-MM-DD");
    const val2 = Moment(e[1]).format("YYYY-MM-DD");
    setToggle(false)

    const response = await rmsReports('Scanning', localStorage.getItem('CUST_ID'), localStorage.getItem('Warehouse_ID'), val1, val2)

    const Scancount2 = await TotalScanReportCount(localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),val1,val2)
    setPageScan(Scancount2[0].Pagescan)


    setData(response)
    if (response) {
      setLoading(false);
    }
  }

  return (
    <div className="InvoicesinProgress">
      <Navbar />
      {loading ? (
        <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Loading...</h1>

      ) : (
        <div className=" reportdata" >
          <h4 className="text-dark mn-3">Scanning Report</h4>
          <div style={{display: "flex",justifyContent:"center",alignItems:"center"}}>
          {
            toogle ?
            <div>
            <h3 > Total pages scanned - Current Month <span style={{color:"red",fontSize:"40px"}}>{pagescan}</span></h3> 
            <h3> Total Files - Current Month <span style={{color:"red",fontSize:"40px"}}>{Totalfile}</span></h3> 
            </div>

            : 
            <div>
            <h3>Total pages scanned <span style={{color:"red",fontSize:"40px"}}>{pagescan}</span></h3>
            <h3 >Total Files scanned <span style={{color:"red",fontSize:"40px"}}>{Totalfile}</span></h3>
            </div>

            
          }
          </div>
          <RangePicker style={{ marginLeft: "80%" }} onChange={setfun} />

          <div className="DataTable">
            <DataTableExtensions {...tableData} >
              <Datatable
                columns={columns}
                data={data}
                pagination
              />
            </DataTableExtensions>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScanningReports
