import { useState, Fragment } from "react";
import axios from "axios";
import "./Agenda.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18n from '../utils/i18n'

function Agenda(props) {
  const [locale, setLocale] = useState(i18n.language);
  i18n.on('languageChanged', (lng) => setLocale(i18n.language));
  const { t } = useTranslation();

  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        url: `http://dermoapp-server.eba-u5i6h72y.us-east-1.elasticbeanstalk.com/agenda_specialist`,
      })
        .then((response) => {
          if (response) {
            setScheduleData(response.data);
          }
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
        <div className="login-header"></div>
        <div>
          <div className="agenda-body">
            <table id="agenda-table">
              <thead>
                <tr>
                  <th className="agenda-header">{t("Time")}</th>
                  <th className="agenda-header">{t("Detail")}</th>
                  <th className="agenda-header">{t("Patient")}</th>
                  <th className="agenda-header">{t("Patient email")}</th>
                  <th className="agenda-header">{t("Date")}</th>
                </tr>
              </thead>
              <tbody>
                {scheduleData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.created_at.substring(11, 16)}</td>
                    <td>
                      {item.injury_type} con forma {item.shape}. El número de
                      lesiones aproximado es {item.injuries_count}
                    </td>
                    <td>{item.user_name}</td>
                    <td>{item.user_email}</td>
                    <td>{item.created_at.substring(0, 10)}</td>
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
