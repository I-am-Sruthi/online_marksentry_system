import React, { useState } from "react";
import { writeFile } from "xlsx";
import * as XLSX from "xlsx";
import Mid1Component from "./Mid1";
import Mid2Component from "./Mid2";
import Footer from "./Footer";
import Input from "./Input";
import "./Styles.css";
import ChildComponent from "./ChildComponent";
import "bootstrap-icons/font/bootstrap-icons.css";
import Uploadexcelbutton from "./Uploadexcelbutton";

const FormComponent = () => {
  const [rollnumber, setRollNumber] = useState("");
  const [bits, setBits] = useState("");
  const [asignment, setAssign] = useState(5);
  const [formData, setFormData] = useState({});
  const [sesmarks, setsesmarks] = useState({
    mid1marks: "",
    mid2marks: "",
  });
  const [file, setfile] = useState("");
  const [allFormData, setAllFormData] = useState([]);
  const [markstype, setMarkstype] = useState("");
  const [evaltype, setEvaltype] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
    Q5: "",
    Q6: "",
  });
  // Handler functions for dropdowns

  const handleQ1Change = (e) => {
    const names = e.target.name;
    const value = e.target.value;
    if (value == 1) {
      let que1 = names + "a";
      let que2 = names + "b";
      if (formData.hasOwnProperty(que1) && formData.hasOwnProperty(que2)) {
        setFormData((prevFormData) => {
          const { [que1]: _, [que2]: __, ...rest } = prevFormData;
          return rest;
        });
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [names]: "",
      }));
      setSelectedOptions((prevFormData) => ({
        ...prevFormData,
        [names]: value,
      }));
    } else if (value == 2) {
      if (formData.hasOwnProperty(names)) {
        setFormData((prevFormData) => {
          const { [names]: _, ...rest } = prevFormData;
          return rest;
        });
      }
      const a = names + "a";
      const b = names + "b";
      setFormData((prevFormData) => ({
        ...prevFormData,
        [a]: "",
        [b]: "",
      }));
      setSelectedOptions((prevFormData) => ({
        ...prevFormData,
        [names]: value,
      }));
    }
    if (names == "Q6") {
      setSelectedOptions((prevFormData) => ({
        ...prevFormData,
        [names]: value,
      }));
    }
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handlesesFormChange = (e) => {
    const { name, value } = e.target;
    setsesmarks((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  function rollnumbersetup(e) {
    setRollNumber(e.target.value);
  }
  function bitsetup(e) {
    setBits(e.target.value);
  }
  function Assignmentsetup(e) {
    setAssign(e.target.value);
  }

  const handleSubmit = (e) => {
    if (markstype == "Mid-1" || markstype == "Mid-2") {
      setAllFormData((prevAllFormData) => {
        const formDataValues = Object.values(formData);
        console.log(allFormData);
        let sums = 0;
        if (evaltype == "15") {
          for (let i = 0; i < formDataValues.length; i++) {
            sums += Number(formDataValues[i]);
          }
        } else if (evaltype == "30") {
          let i;
          console.log("Hiii 30");
          for (i = 0; i < formDataValues.length; i++) {
            sums += Number(formDataValues[i]);
          }
          sums = Math.round(sums / 2);
        }
        console.log("Number(bits)/2" + Number(bits) / 2);
        sums = sums + Math.round(Number(bits) / 2) + Number(asignment);
        console.log("outside sums = " + sums);
        const newFormData = {
          Roll_Number: rollnumber,
          ...formData,
          Bits: Number(bits)/2,
          Assignment: Number(asignment),
          Total: sums,
        };
        return [...prevAllFormData, newFormData];
      });
      setFormData((prevFormData) => {
        const clearedFormData = {};

        for (const key in prevFormData) {
          clearedFormData[key] = "";
        }
        return clearedFormData;
      });
    } else if (markstype == "Sessionals") {
      setAllFormData((prevAllFormData) => {
        setsesmarks({
          rollnumber,
          ...sesmarks,
        });
        const formDataValues = Object.values(sesmarks);

        let sums = 0;
        let a = Number(formDataValues[1]);

        let b = Number(formDataValues[2]);
        if (a >= b) {
          a = Math.round(a * (80 / 100));
          b = Math.round(b * (20 / 100));
        } else {
          a = Math.round(a * (20 / 100));
          b = Math.round(b * (80 / 100));
        }
        sums = a + b;
        console.log(sums);
        const updatedFormData = { ...sesmarks };
        updatedFormData.Total = sums;
        return [...prevAllFormData, updatedFormData];
      });
      setsesmarks((prevFormData) => {
        const clearedFormData = {};

        for (const key in prevFormData) {
          clearedFormData[key] = "";
        }
        return clearedFormData;
      });
    }
    const formDatavalues = Object.keys(formData);
    console.log(formDatavalues);
    setRollNumber("");
    setBits("");
    setAssign("");
    e.preventDefault();
  };
  function resetData() {
    setAllFormData([]);
    setRollNumber("");
    setFormData({});
    setsesmarks({
      mid1marks: "",
      mid2marks: "",
    });
    setSelectedOptions({
      Q1: "",
      Q2: "",
      Q3: "",
      Q4: "",
      Q5: "",
      Q6: "",
    });
    
  }
  function mid1typeselectionclear() {
    resetData();
    if (document.getElementById("id2").classList.contains("class3")) {
      document.getElementById("id2").classList.remove("class3");
    } else if (document.getElementById("id3").classList.contains("class3")) {
      document.getElementById("id3").classList.remove("class3");
    }
    var i = document.getElementById("id1");
    i.classList.add("class3");
    setMarkstype("Mid-1");
  }
  function mid2typeselectionclear() {
    resetData();
    if (document.getElementById("id1").classList.contains("class3")) {
      document.getElementById("id1").classList.remove("class3");
    } else if (document.getElementById("id3").classList.contains("class3")) {
      document.getElementById("id3").classList.remove("class3");
    }
    var i = document.getElementById("id2");
    i.classList.add("class3");
    setMarkstype("Mid-2");
  }
  function sesmarksselection() {
    resetData();
    if (document.getElementById("id2").classList.contains("class3")) {
      document.getElementById("id2").classList.remove("class3");
    } else if (document.getElementById("id1").classList.contains("class3")) {
      document.getElementById("id1").classList.remove("class3");
    }
    var i = document.getElementById("id3");
    i.classList.add("class3");
    setMarkstype("Sessionals");
  }
  function filename(e){
    setfile(e.target.value);
  }
  const handleFinalSubmit = () => {
    // Create Excel workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(allFormData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Student Marks");

    // Generate Excel file
    let finalfilename = file + ".xlsx";
    writeFile(wb, finalfilename);
  };

  const sesDataEntries = Object.entries(sesmarks);
  return (
    <div >
    <div className="container" style={{ paddingTop: "15px" }}>
        <div className="row">
          <div className="col text-center">
            <h1>Sessional Marks</h1>
          </div>
          
        </div>
        <Uploadexcelbutton />
    </div>
    
      <hr style={{ marginBottom: "0" }}></hr>
      <div className="container marginremover">
        <div className="row">
          <div className="col-lg-2 text-center class2 col-sm-12 col-xsm-12">
            <div>
              <div
                id="id1"
                onClick={mid1typeselectionclear}
                className="divdesign"
              >
                Mid-1 Marks
              </div>
              <div
                id="id2"
                onClick={mid2typeselectionclear}
                className="divdesign"
              >
                Mid-2 Marks
              </div>
              <div id="id3" onClick={sesmarksselection} className="divdesign">
                Sessionals
              </div>
            </div>
            <br></br>
            <p>Question Paper Pattern: </p>
            {markstype === "Mid-1" && (
              <Mid1Component
                q1func={handleQ1Change}
                selfunc={selectedOptions}
              />
            )}
            {markstype === "Mid-2" && (
              <Mid2Component
                q1func={handleQ1Change}
                selfunc={selectedOptions}
              />
            )}
          </div>
          <div className="col-5">
            <br></br>
            <div className="container">
              <div className="row">
                <div className="col-9">
                  <div className="row g-3 align-items-center">
                    <div className="col-auto">
                      <label for="inputPassword6" className="col-form-label">
                        File Name:
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        id="inputPassword6"
                        className="form-control"
                        aria-describedby="passwordHelpInline"
                        placeholder="Enter "
                        onChange={filename}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={resetData}
                  >
                    <i className="bi bi-arrow-clockwise"></i>&nbsp;Reset
                  </button>
                </div>
              </div>
            </div>
            <br></br>
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <p style={{ fontSize: "large" }}>
                    Evaluation of theory marks:
                  </p>
                </div>
                <div className="col-6">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="15"
                      onChange={() => setEvaltype("15")}
                    />
                    <label className="form-check-label" for="inlineRadio1">
                      15 Marks
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="30"
                      onChange={() => setEvaltype("30")}
                    />
                    <label className="form-check-label" for="inlineRadio2">
                      30 Marks
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div>
                <div className="container">
                  <div className="row">
                    <div className="col-9">
                      <div className="row g-3 align-items-center">
                        <div className="col-auto">
                          <label
                            for="inputPassword6"
                            className="col-form-label"
                          >
                            Roll Number
                          </label>
                        </div>
                        <div class="col-auto">
                          <input
                            type="text"
                            id="inputPassword6"
                            onChange={rollnumbersetup}
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            placeholder="roll number"
                            value={rollnumber}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-3">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleFinalSubmit}
                      >
                        <i className="bi bi-download"></i> &nbsp;Excel
                      </button>
                    </div>
                  </div>
                </div>
                <br></br>
                {(markstype == "Mid-1" || markstype == "Mid-2") && (
                  <div>
                    <div>
                      {markstype == "Mid-1" && <p className="u1">Unit-1</p>}
                      {markstype == "Mid-2" && <p className="u1">Unit-3</p>}
                      <div className="container">
                        <div className="row">
                          <div className="col-6">
                            {selectedOptions.Q1 == "1" && (
                              <input
                                type="text"
                                placeholder="Q1"
                                name="Q1"
                                onChange={handleFormChange}
                                value={formData.Q1}
                              />
                            )}
                            {selectedOptions.Q1 == "2" && (
                              <div>
                                <input
                                  type="text"
                                  placeholder="1a"
                                  name="Q1a"
                                  onChange={handleFormChange}
                                  value={formData.Q1a}
                                />
                                <input
                                  type="text"
                                  placeholder="1b"
                                  name="Q1b"
                                  onChange={handleFormChange}
                                  value={formData.Q1b}
                                />
                              </div>
                            )}
                          </div>
                          <div className="col-6">
                            {selectedOptions.Q2 == "1" && (
                              <input
                                type="text"
                                placeholder="Q2"
                                name="Q2"
                                onChange={handleFormChange}
                                value={formData.Q2}
                              />
                            )}
                            {selectedOptions.Q2 == "2" && (
                              <div>
                                <input
                                  type="text"
                                  placeholder="2a"
                                  name="Q2a"
                                  onChange={handleFormChange}
                                  value={formData.Q2a}
                                />
                                <input
                                  type="text"
                                  placeholder="2b"
                                  name="Q2b"
                                  onChange={handleFormChange}
                                  value={formData.Q2b}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {markstype == "Mid-1" && <p className="u1">Unit-2</p>}
                      {markstype == "Mid-2" && <p className="u1">Unit-4</p>}
                      <div className="container">
                        <div className="row">
                          <div className="col-6">
                            {selectedOptions.Q3 == "1" && (
                              <input
                                type="text"
                                placeholder="Q3"
                                name="Q3"
                                onChange={handleFormChange}
                                value={formData.Q3}
                              />
                            )}
                            {selectedOptions.Q3 == "2" && (
                              <div>
                                <input
                                  type="text"
                                  placeholder="3a"
                                  name="Q3a"
                                  onChange={handleFormChange}
                                  value={formData.Q3a}
                                />
                                <input
                                  type="text"
                                  placeholder="3b"
                                  name="Q3b"
                                  onChange={handleFormChange}
                                  value={formData.Q3b}
                                />
                              </div>
                            )}
                          </div>
                          <div className="col-6">
                            {selectedOptions.Q4 == "1" && (
                              <input
                                type="text"
                                placeholder="Q4"
                                name="Q4"
                                onChange={handleFormChange}
                                value={formData.Q4}
                              />
                            )}
                            {selectedOptions.Q4 == "2" && (
                              <div>
                                <input
                                  type="text"
                                  placeholder="4a"
                                  name="Q4a"
                                  onChange={handleFormChange}
                                  value={formData.Q4a}
                                />
                                <input
                                  type="text"
                                  placeholder="4b"
                                  name="Q4b"
                                  onChange={handleFormChange}
                                  value={formData.Q4b}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {markstype == "Mid-1" && <p className="u1">Unit-3</p>}
                      {markstype == "Mid-2" && <p className="u1">Unit-6</p>}
                      <div className="container" style={{ marginBottom: "10" }}>
                        <div className="row">
                          <div className="col-6">
                            {selectedOptions.Q5 == "1" && (
                              <input
                                type="text"
                                placeholder="Q5"
                                name="Q5"
                                onChange={handleFormChange}
                                value={formData.Q5}
                              />
                            )}
                            {selectedOptions.Q5 == "2" && (
                              <div>
                                <input
                                  type="text"
                                  placeholder="5a"
                                  name="Q5a"
                                  onChange={handleFormChange}
                                  value={formData.Q5a}
                                />
                                <input
                                  type="text"
                                  placeholder="5b"
                                  name="Q5b"
                                  onChange={handleFormChange}
                                  value={formData.Q5b}
                                />
                              </div>
                            )}
                          </div>
                          <div className="col-6">
                            {selectedOptions.Q6 == "1" && (
                              <input
                                type="text"
                                placeholder="Q6"
                                name="Q6"
                                onChange={handleFormChange}
                                value={formData.Q6}
                              />
                            )}
                            {selectedOptions.Q6 == "2" && (
                              <div>
                                <input
                                  type="text"
                                  placeholder="6a"
                                  name="Q6a"
                                  onChange={handleFormChange}
                                  value={formData.Q6a}
                                />
                                <input
                                  type="text"
                                  placeholder="6b"
                                  name="Q6b"
                                  onChange={handleFormChange}
                                  value={formData.Q6b}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="container">
                      <div className="row">
                        <div className="col-6">
                          <div class="col-auto">
                            <input
                              type="text"
                              id="inputPassword6"
                              onChange={bitsetup}
                              className="form-control"
                              aria-describedby="passwordHelpInline"
                              placeholder="Bits"
                              value={bits}
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div class="col-auto">
                            <input
                              type="text"
                              id="inputPassword6"
                              onChange={Assignmentsetup}
                              className="form-control"
                              aria-describedby="passwordHelpInline"
                              placeholder="Assignment"
                              value={5}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {markstype === "Sessionals" && (
                  <div>
                    <p>Sessionals</p>
                    <div className="container">
                      <div className="row">
                        {sesDataEntries.map(([name, value], index) => (
                          <Input
                            key={index}
                            Qnum={name}
                            Changeres={handlesesFormChange}
                            Qval={value}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <hr style={{ marginBottom: "0" }}></hr>
            </div>
          </div>
          
          <div className="col-5">
          <ChildComponent formData={allFormData} />
      
    </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FormComponent;
