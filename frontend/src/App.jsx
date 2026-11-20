import React, { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/api/students")
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Student Placement Portal</h1>
      <h2>Placed Students</h2>

      {students.map(student => (
        <div key={student.id}>
          <h3>{student.name}</h3>
          <p>Email: {student.email}</p>
          <p>Company: {student.company}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
