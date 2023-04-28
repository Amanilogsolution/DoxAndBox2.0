import React,{useState,useEffect} from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {rmsReports} from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import '../response.css';
import { DatePicker } from "antd";
import Moment from "moment";

import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

const columns = [
    {
      name: "Allocate Date",
      selector: row=>row.Allocatedate,
      sortable: true
    },
    {
        name: "File Number",
        selector: row=>row.Fileno,
        sortable: true
      },
      {
        name: "Pickup Number",
        selector: row=>row.pickupno,
        sortable: true
      },
      {
        name: "Request Type",
        selector: row=>row.requesttype,
        sortable: true
      },
      {
        name: "Status",
        selector: row=>row.Status,
        sortable: true
      }
     
   
  ];
    

function RetrivalReport() {
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
            // You can await here
            const response = await rmsReports('Retrival', localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),startDate,endDate)
     
                 setData(response)
            if(response){
              setLoading(false);
            }

          }
          fetchData();
    }, [])

    const tableData= {
        columns, data
      };

      const setfun = async(e) => {

        const val1 = Moment(e[0]).format("YYYY-MM-DD");
        const val2 = Moment(e[1]).format("YYYY-MM-DD");
        // const arry = [val1, val2];
        setToggle(false)
    
        const response = await rmsReports('Retrival', localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),val1,val2)
        setData(response)
        if(response){
          setLoading(false);
        }
    
      }

  return (
    <div className="InvoicesinProgress">
     <Navbar/>
     {loading?(
                  <h1 style={{display:"flex",justifyContent:"center",alignItems:"center" }}>Loading...</h1>

      ):(
    <div className=" reportdata" >
      <h4 className="text-dark mn-3">Retrival Report</h4>
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

export default RetrivalReport
