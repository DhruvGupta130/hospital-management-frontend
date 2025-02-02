const Patients = () => {
  const patients = [
    { id: 1, name: "John Doe", age: 30, condition: "Fever" },
    { id: 2, name: "Jane Smith", age: 25, condition: "Cough" },
  ];

  return (
    <div className="content">
      <h4>Patients</h4>
      {patients.map((patient) => (
        <div className="card" key={patient.id}>
          <p>Name: {patient.name}</p>
          <p>Age: {patient.age}</p>
          <p>Condition: {patient.condition}</p>
        </div>
      ))}
    </div>
  );
};

export default Patients;
