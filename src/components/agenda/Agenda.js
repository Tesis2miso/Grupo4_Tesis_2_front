import { useState, Fragment } from "react";
import axios from "axios";
import "./Agenda.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Agenda(props) {
  const [name, setName] = useState(() => {
    const n = localStorage.getItem("userName") || 0;
    return n;
  });

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("Bearer " + localStorage.getItem('token'));
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        },
        url: `http://dermoapp-server.eba-u5i6h72y.us-east-1.elasticbeanstalk.com/agenda_specialist`,
      })
        .then((response) => {
          setScheduleData(response.data);
          console.log("oli"+ response.data);
        })
        .catch((error) => {
          console.log(error);
        });

    }

    fetchData();
  }, []);

  return (
    <Fragment>
      <div></div>
      <div className="login-page">
        <div className="login-header">
         
        </div>
        <div>
          <div className="agenda-body">
            <table id="agenda-table">
              <thead>
                <tr>
                  <th className="agenda-header">Hora</th>
                  <th className="agenda-header">Detalle</th>
                  <th className="agenda-header">Paciente</th>
                  <th className="agenda-header">Email paciente</th>
                  <th className="agenda-header">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.created_at.substring(11,19)}</td>
                    <td>{item.injury_type} con forma {item.shape}. El número de lesiones aproximado es {item.injuries_count}</td>
                    <td>{item.user_name}</td>
                    <td>{item.user_email}</td>
                    <td>{item.created_at.substring(0,10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Agenda;