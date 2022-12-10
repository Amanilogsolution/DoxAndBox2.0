import React, { useState, useEffect } from 'react'
import Datatable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { BoxReports } from '../../../api/index';
import Navbar from '../../Navbar/Navbar';
import '../response.css';



const columns = [
    {
        name: "File No",
        selector: row => row.Fileno,
        sortable: true
      },
 
  {
    name: "File Name",
    selector: row => row.Filename,
    sortable: true
  }, {
    name: "Box No",
    selector: row => row.Boxno,
    sortable: true
  },
 
  {
    name: "Item Location",
    selector: row => row.Location,
    sortable: true
  }

];


function BoxReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function fetchData() {


      const response = await BoxReports(localStorage.getItem('Boxno'),localStorage.getItem('CUST_ID'),localStorage.getItem('Warehouse_ID'))
      
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



  return (
    <div className="InvoicesinProgress">
      <Navbar />
      {loading?(
                  <h1 style={{display:"flex",justifyContent:"center",alignItems:"center" }}>Loading...</h1>
      ):(
      <div className=" reportdata"  >
        <h4 className="text-dark">File Details Report</h4>
     

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

export default BoxReport
