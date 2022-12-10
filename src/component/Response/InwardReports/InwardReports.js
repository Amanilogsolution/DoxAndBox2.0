import React, { useState, useEffect } from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { rmsReports } from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import '../response.css';
import { DatePicker } from "antd";
import Moment from "moment";
import "antd/dist/antd.css";
const { RangePicker } = DatePicker;


const columns = [
  {
    name: "Referance No",
    selector: row => row.ActivityReferenceNo,
    sortable: true
  },
  {
    name: "Box No",
    selector: row => row.Boxno,
    sortable: true
  },
  {
    name: "Date of Activity",
    selector: row => row.Dateofactivity,
    sortable: true
  },
  {
    name: "Department",
    selector: row => row.Department,
    sortable: true
  },
  {
    name: "File Name",
    selector: row => row.Filename,
    sortable: true
  },
  {
    name: "File UI DNO",
    selector: row => row.FileUIDno,
    sortable: true
  },
  {
    name: "Invoice",
    selector: row => row.Invoice_no,
    sortable: true
  },
  {
    name: "Location",
    selector: row => row.ItemLocation,
    sortable: true
  },
  {
    name: "Warehouse",
    selector: row => row.Location,
    sortable: true
  },
  {
    name: "Mode",
    selector: row => row.Mode,
    sortable: true
  }

];


function InwardReports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toogle,setToggle]=useState(true)


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

      const response = await rmsReports('Inward', localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),startDate,endDate)
      
      console.log(response)
      setData(response)
      if(response){
        setLoading(false);
      }

    }
    fetchData();
  }, [])

  const tableData = {
    columns, data
  };

  const setfun = async(e) => {

    const val1 = Moment(e[0]).format("YYYY-MM-DD");
    const val2 = Moment(e[1]).format("YYYY-MM-DD");
    // const arry = [val1, val2];
    setToggle(false)

    const response = await rmsReports('Inward', localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),val1,val2)
    setData(response)
    if(response){
      setLoading(false);
    }

  }

  return (
    <div className="InvoicesinProgress">
      <Navbar />
      {loading?(
                  <h1 style={{display:"flex",justifyContent:"center",alignItems:"center" }}>Loading...</h1>

      ):(
      <div className=" reportdata"  >
        <h4 className="text-dark">Inward Report</h4>
        {
          toogle?<h3 style={{marginLeft:"40%"}}>Current Month</h3>:null

        }
        <RangePicker style={{marginLeft:"80%"}} onChange={setfun} />

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

export default InwardReports
