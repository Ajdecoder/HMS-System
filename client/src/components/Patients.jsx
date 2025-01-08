import React, { useState } from "react";
import PatientList from "../components/PatientList";
import PatientForm from "../components/PatientForm";

const Patients = () => {
  const [showform, setShowform] = useState(false);

  return (
    <div className="">
      {/* Button to toggle form visibility */}
      <button
        onClick={() => setShowform(!showform)}
        className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 relative left-[90%]  "
      >
        {showform ? <p className="p-2 hover:bg-red-700 duration-150" >X</p> : "Add Patient"}
      </button>

      {/* If form is shown, display the overlay with background dim */}
      {showform && (
        <div className="z-50  top-0 left-0  bg-black opacity-85">
          <PatientForm showform={showform} />
        </div>
      )}

      {/* Display the patient list */}
      <PatientList />
    </div>
  );
};

export default Patients;
