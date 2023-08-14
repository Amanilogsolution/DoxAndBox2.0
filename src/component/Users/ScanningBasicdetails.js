import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import {
  FileUpload,
  insertscannerportaldetails,
  scannerportaldatamorethanone,
  totalscannerdetails,
  Requestidforuser,
} from "../../api/index";
import "./basicdetail.css";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import svg from "../Images/phoneicon.png";
import Footer from "../Navbar/Footer.js";

function ScanningBasicdetails() {
  const [mandatoryfield, setMandatoryfield] = useState(false);
  // const [uploadimage,setUploadImage] = useState([]);
  const [scannerdata, setScannerData] = useState([]);
  const [requestid, setRequestid] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const RequestId = await Requestidforuser(
        localStorage.getItem("User_ID"),
        "ScanningRequest"
      );
      setRequestid(RequestId);
    };
    fetchdata();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const Requestid = document.getElementById("reqid").value;
    const StartReading = document.getElementById("startreading").value;
    const Endreading = document.getElementById("endreading").value;
    const Arriveddate = document.getElementById("arriveddate").value;
    const ArrivedTime = document.getElementById("arrivedtime").value;
    const Totalpagesscan = document.getElementById("totalpagesscan").value;
    const Remarks = document.getElementById("remarks").value;
    const EntryBy = localStorage.getItem("User_ID");
    const Portalid = `portal${Math.floor(Math.random() * 100000)}`;
    const scannertype = document.getElementById("scannertype").value.split(",");
    const Assetid = scannertype[0];
    const Assetname = scannertype[1];

    console.log(document.getElementById("scannertype").value)

    if (!Requestid || !document.getElementById("scannertype").value) {
      setMandatoryfield(true);
    } else {
      const result = await insertscannerportaldetails(
        Requestid,
        "ScanningRequest",
        StartReading,
        Endreading,
        Arriveddate,
        ArrivedTime,
        "",
        Totalpagesscan,
        Remarks,
        EntryBy,
        "",
        "",
        "",
        Portalid,
        Assetid,
        Assetname,
        "",
        localStorage.getItem("User_Name")
      );
      alert("Added Successfully");
      window.location.href = "/UserLogindetails";
    }
  };

  const handleChangeRequest_id = async (e) => {
    e.preventDefault();
    const TotalScanner = await totalscannerdetails(e.target.value);
    setScannerData(TotalScanner);
    const datass = await scannerportaldatamorethanone(
      localStorage.getItem("User_ID"),
      "2023-07-05",
      "Scanning",
      e.target.value
    );
    console.log(datass);
  };

  return (
    <>
      <div className="userReq">
        <Navbar />

        <div className="rec_user">
          <div className="svg_div">
            <img src={svg} />
          </div>
          <form>
            <h3 className="pb-3">
              Request for Scanning Basic Details{" "}
              <BsFillChatSquareQuoteFill
                style={{ margin: "0 0 -9px 0", fontSize: "30px" }}
              />
            </h3>

            <div className="form-group">
              <label>
                Request Id <span style={{ color: "red" }}>*</span>
              </label>
              <select
                className="form-control "
                id="reqid"
                onChange={handleChangeRequest_id}
                style={{ height: "32px" }}
              >
                <option value="" hidden>
                  Please Select RequestId
                </option>
                {requestid &&
                  requestid.map((item) => (
                    <option value={item.Requestid}>{item.Requestid}</option>
                  ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label> Date</label>
                <input type="date" className="form-control" id="arriveddate" />
              </div>
              <div className="form-group col-md-6">
                <label> Time</label>
                <input type="time" className="form-control" id="arrivedtime" />
              </div>
            </div>

            {/* <div className="form-group">
                            <label>Upload Image</label>
                            <input type="file" id='department' onChange={handleChange} multiple/>
                        </div> */}

            <div className="form-group">
              <label>Select Type Of Scanner</label>
              <select
                className="form-control "
                id="scannertype"
                style={{ height: "32px" }}
              >
                <option value="" hidden>
                  Please Select RequestId
                </option>
                {scannerdata &&
                  scannerdata.map((ele) => (
                    <option
                      value={`${ele.Scnmodelno},${ele.Scannermodel}`}
                    >{`${ele.Scannermodel},${ele.Scnmodelno}`}</option>
                  ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label> Scanner start reading</label>
                <input
                  type="number"
                  className="form-control"
                  id="startreading"
                />
              </div>
              <div className="form-group col-md-6">
                <label>Scanner end reading</label>
                <input type="number" className="form-control" id="endreading" />
              </div>
            </div>

            <div className="form-group">
              <label>Total Pages Scanned</label>
              <input
                type="number"
                className="form-control"
                id="totalpagesscan"
              />
            </div>

            <div className="form-group">
              <label>Remarks</label>
              <textarea
                className="form-control"
                placeholder="Comments"
                type="text"
                id="remarks"
              />
            </div>
            {mandatoryfield ? (
              <p style={{ color: "red" }}>Please! Select RequestID.</p>
            ) : null}

            <div className="form-group">
              <button
                type="submit"
                className="dark_btn btn float-right mb-4"
                onClick={handleClick}
              >
                Submit
              </button>
              <button
                type="submit"
                className="maroon_btn btn mr-4 float-right mb-4"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ScanningBasicdetails;
