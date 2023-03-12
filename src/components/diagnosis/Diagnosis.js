import { useState } from "react";
import "./Diagnosis.css";
import axios from "axios";

function Diagnosis(props) {
  const shape = props.diagnosis?.shape;
  const id = props.diagnosis?.id;
  const col = props.diagnosis?.color;
  const ciudad = props.diagnosis?.city;
  const numero = props.diagnosis?.injuries_count;
  const foto = props.diagnosis?.photo_url;

  const [email_patient, setEmail] = useState(props.diagnosis?.user_email);
  const [description, setDescription] = useState(
    "Paciente de la ciudad " +
      ciudad +
      " reporta padecimiento con " +
      col +
      " de forma " +
      shape +
      " con un numero de lesiones aproximado de " +
      numero
  );
  const [diagnosis, setConfirmDiagnosis] = useState(props.diagnosis?.diagnosis);

  function handleClose() {
    console.log(props.diagnosis);
    props.setIsPopUpOpen(false);
  }
  const handleSubmit = (e) => {
    //e.preventDefault();
    axios({
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      url: `${process.env.REACT_APP_BASE_PATH}/consults_update/` + id,
      data: {
        id: id,
        description: description,
        diagnosis: diagnosis,
      },
    })
      .then((response) => {
        alert("consulta actualizada con exito");
      console.log(response)
      })
      .catch((error) => {
        alert("ERROR");
      });
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column align-items-center bg-light p-3">
        <div className="form-group">
          <h4 htmlFor="emailPatient">Email Paciente:</h4>
          <input
            style={{ width: "700px", height: "50px" }}
            type="email"
            className="form-control"
            id="emailPatient"
            value={email_patient}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <h4 htmlFor="caseDescription">Descripcion del caso:</h4>
          <input
            style={{
              width: "700px",
              height: "100px",
              overflowX: "hidden",
              whiteSpace: "pre-wrap",
            }}
            type="text"
            className="form-control"
            id="caseDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <img
          src={foto}
          style={{ width: "300px", height: "300px" }}
          alt="Image description"
        />

        <div className="form-group">
          <h4 htmlFor="diagnosis">Diagnostico:</h4>
          <input
            style={{ width: "700px", height: "100px" }}
            className="form-control"
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setConfirmDiagnosis(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            className="btn btn-primary"
            style={{ display: "inline-block", marginRight: "10px" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="btn btn-secondary"
            style={{ display: "inline-block" }}
            onClick={handleClose}
          >
            Back to cases
          </button>
        </div>
      </div>
    </div>
  );
}

export default Diagnosis;
