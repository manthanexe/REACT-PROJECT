import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Marksheet({ students, subjects }) {
  const [sap, setSap] = useState("");
  const [sem, setSem] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    let saved = localStorage.getItem(sap + "_" + sem);
    setData(saved ? JSON.parse(saved) : null);
  }, [sap, sem]);

  return (
    <>
      <h1>Retrieve Marksheet</h1>

      <Link to="/">Enter Marks</Link>

      <br />
      <br />

      <input
        placeholder="Enter SAP ID"
        value={sap}
        onChange={(e) => setSap(e.target.value)}
      />

      <select value={sem} onChange={(e) => setSem(e.target.value)}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <option value={s} key={s}>
            Semester {s}
          </option>
        ))}
      </select>

      {data && (
        <>
          <h2>{data.student.name}</h2>
          <p>SAP ID: {data.student.sap}</p>
          <p>Semester: {data.sem}</p>

          <table border="1">
            <thead>
              <tr>
                <th>Subject</th>
                <th>ICA</th>
                <th>End Sem</th>
                <th>Total</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((sub, i) => {
                let total =
                  Number(data.marks[i].ica) +
                  Number(data.marks[i].end);

                return (
                  <tr key={sub.name}>
                    <td>{sub.name}</td>
                    <td>{data.marks[i].ica}</td>
                    <td>{data.marks[i].end}</td>
                    <td>{total}</td>
                    <td>{total >= 90 ? "A+" :
                         total >= 80 ? "A" :
                         total >= 70 ? "B+" :
                         total >= 60 ? "B" :
                         total >= 50 ? "C" :
                         total >= 40 ? "D" : "F"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h2>SGPA: {data.sgpa}</h2>
        </>
      )}

      {sap && !data && <p>No marksheet found.</p>}
    </>
  );
}

export default Marksheet;