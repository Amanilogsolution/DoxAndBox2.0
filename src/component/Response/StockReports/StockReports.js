import React,{useState,useEffect} from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import {rmsReports} from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import '../response.css';
// import { DatePicker } from "antd";
// import Moment from "moment";
import "antd/dist/antd.css";
// const { RangePicker } = DatePicker;

const columns = [
    {
      name: "Box Number",
      selector: 'boxno',
      sortable: true,
      cell: (row) => [
       <a href='/BoxReport' target="_blank" style={{borderBottom:"1px solid "
      }} onClick={()=> localStorage.setItem('Boxno', `${row.boxno}`)}>{row.boxno}</a>
      ]
    },
    {
        name: "Department",
        selector: 'department',
        sortable: true
      },
      {
        name: "Description",
        selector: 'DESCN',
        sortable: true
      },
      {
        name: "File no",
        selector: 'fileno',
        sortable: true
      },
      {
        name: "Invoice",
        selector: 'INVOICENO',
        sortable: true
      },
      {
        name: "Item Location",
        selector: 'ItemLocation',
        sortable: true
      },
      {
        name: "Pickup Number",
        selector: 'PICKUPNO',
        sortable: true
      },
      {
        name: "Remarks",
        selector: 'Remark1',
        sortable: true
      },
      {
        name: "Warehouse",
        selector: 'WHname',
        sortable: true
      }
    
   
  ];
    

function StockReports() {
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
          const response = await rmsReports('Stock', localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),'','')

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

      // const setfun = async(e) => {

      //   const val1 = Moment(e[0]).format("YYYY-MM-DD");
      //   const val2 = Moment(e[1]).format("YYYY-MM-DD");
      //   // const arry = [val1, val2];
      //   setToggle(false)
    
      //   const response = await rmsReports('Stock', localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'),val1,val2)
      //   setData(response)
      //   if(response){
      //     setLoading(false);
      //   }
    
      // }

  return (
    <div className="InvoicesinProgress">
     <Navbar/>
     {loading?(
      <h1 style={{display:"flex",justifyContent:"center",alignItems:"center" }}>Loading...</h1>

      ):(
    <div className=" reportdata" >
      {/* <h4 className="text-dark mn-3">Stock Report</h4> */}
      {
          toogle?<h3 style={{marginLeft:"40%"}}>Available File Stock</h3>:null

        }
        {/* <RangePicker style={{marginLeft:"80%"}} onChange={setfun} /> */}
    <div className="DataTable">
    <DataTableExtensions {...tableData} >
     <Datatable 
     columns={columns} 
     data={data}
     pagination
    //  selectableRows
     />
     </DataTableExtensions>
     </div>
     </div>
      )}
    </div>
  )
}

export default StockReports
