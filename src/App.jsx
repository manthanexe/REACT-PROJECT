import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Marksheet from "./marksheet";

const students = [
  { name: "Manthan Acharya", sap: "40721240086" },
  { name: "Tarun Shahani", sap: "40721240008" },
  { name: "Lavya Triwadi", sap: "40721240021" }
];

const subjects = [
  { name: "Data Structures", credit: 4 },
  { name: "DBMS", credit: 4 },
  { name: "Operating System", credit: 4 },
  { name: "Computer Networks", credit: 4 }
];

function point(marks) {
  if (marks >= 90) return 10;
  if (marks >= 80) return 9;
  if (marks >= 70) return 8;
  if (marks >= 60) return 7;
  if (marks >= 50) return 6;
  if (marks >= 40) return 5;
  return 0;
}

function grade(marks) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B+";
  if (marks >= 60) return "B";
  if (marks >= 50) return "C";
  if (marks >= 40) return "D";
  return "F";
}

function Home() {
  const [student, setStudent] = useState(students[0]);
  const [sem, setSem] = useState(1);
  const [marks, setMarks] = useState(
    subjects.map(() => ({ ica: "", end: "" }))
  );
  const [sgpa, setSgpa] = useState(0);

  useEffect(() => {
    let points = 0;
    let credits = 0;

    marks.forEach((m, i) => {
      let total = Number(m.ica) + Number(m.end);
      points += point(total) * subjects[i].credit;
      credits += subjects[i].credit;
    });

    setSgpa((points / credits).toFixed(2));
  }, [marks]);

  function changeMark(i, type, value) {
    let newMarks = [...marks];
    newMarks[i][type] = value;
    setMarks(newMarks);
  }

  function save() {
    localStorage.setItem(
      student.sap + "_" + sem,
      JSON.stringify({ student, sem, marks, sgpa })
    );

    alert("Marksheet Saved");
  }

  return (
    <>
      <h1>MARKSHEET DISPLAY</h1>

      <Link to="/marksheet">Retrieve Marksheet</Link>

      <h3>Student</h3>

      <select
        value={student.sap}
        onChange={(e) =>
          setStudent(
            students.find((s) => s.sap === e.target.value)
          )
        }
      >
        {students.map((s) => (
          <option value={s.sap} key={s.sap}>
            {s.name}
          </option>
        ))}
      </select>

      <h3>Semester</h3>

      <select value={sem} onChange={(e) => setSem(e.target.value)}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <option value={s} key={s}>
            Semester {s}
          </option>
        ))}
      </select>

      <h3>Marks</h3>

      <table border="1">
        <thead>
          <tr>
            <th>Subject</th>
            <th>ICA / 40</th>
            <th>End Sem / 60</th>
            <th>Total</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {subjects.map((sub, i) => {
            let total =
              Number(marks[i].ica) + Number(marks[i].end);

            return (
              <tr key={sub.name}>
                <td>{sub.name}</td>

                <td>
                  <input
                    type="number"
                    value={marks[i].ica}
                    onChange={(e) =>
                      changeMark(i, "ica", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    value={marks[i].end}
                    onChange={(e) =>
                      changeMark(i, "end", e.target.value)
                    }
                  />
                </td>

                <td>{total}</td>
                <td>{grade(total)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>SGPA: {sgpa}</h2>

      <button onClick={save}>Save Marksheet</button>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/marksheet"
        element={
          <Marksheet
            students={students}
            subjects={subjects}
          />
        }
      />
    </Routes>
  );
}

export default App;