import React, { useState, useEffect } from "react";
import "./AssistancePrograms.css";

function AssistancePrograms() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    console.log("Started loadData");
    const response = await fetch("http://localhost:5000/");
    const data = await response.json();
    setPrograms(data);
    console.log("Ended loadData");
  };

  const updateData = async () => {
    console.log("Started updateData");
    try {
      await fetch("http://localhost:5000/update");
    } catch (error) {
      console.log(error);
    }
    loadData();
    console.log("Ended updateData");
  };

  return (
    <div className="center">
      <button onClick={updateData}>Refresh</button>
      {programs ? (
        <table id="programs">
          <thead>
            <tr>
              <th>{"Assistance Program Name"}</th>
              <th>{"Status"}</th>
              <th>{"Grant Amount"}</th>
              <th>{"Eligible Treatments"}</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => {
              return (
                <tr>
                  <td>{program.programName}</td>
                  <td>{program.status}</td>
                  <td>{program.grantAmount}</td>
                  <td>
                    {program.treatmentList ? (
                      <ul>
                        {program.treatmentList.map((treatment, i) => {
                          return <li key={i}>{treatment}</li>;
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>There Are No Programs</h1>
      )}
      ;
    </div>
  );
}

export default AssistancePrograms;
