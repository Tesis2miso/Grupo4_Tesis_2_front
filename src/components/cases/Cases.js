import { useState, Fragment } from "react";
import axios from "axios";
import "./Cases.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18n from "../utils/i18n";
import Diagnosis from "../diagnosis/Diagnosis";

function Cases(props) {
  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  const { t } = useTranslation();

  const [scheduleData, setScheduleData] = useState([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      axios({
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        url: `${process.env.REACT_APP_BASE_PATH}/agenda_specialist`,
      })
        .then((response) => {
          if (response) {
            console.log(response.data)
            setScheduleData(response.data);
          }
        })
        .catch((error) => {
          //console.log(error);
        });
    }

    fetchData();
  }, []);

  function handleRowClick(item) {
    setSelectedItem(item);
    setIsPopUpOpen(true);
  }

  function handleClosePopUp() {
    setIsPopUpOpen(false);
    setSelectedItem(null);
  }

  return (
    <Fragment>
      <div></div>
      <div className="login-page">
        <div className="login-header"></div>
        <div>
          <div className="agenda-body">
            {!isPopUpOpen && (
              <table id="agenda-table">
                <thead>
                  <tr>
                    <th className="agenda-header">{t("Time")}</th>
                    <th className="agenda-header">{t("Detail")}</th>
                    <th className="agenda-header">Color</th>
                    <th className="agenda-header">{t("Patient")}</th>
                    <th className="agenda-header">{t("Patient email")}</th>
                    <th className="agenda-header">{t("Status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((item, index) => (
                    <tr key={index} onClick={() => handleRowClick(item)}>
                      <td>{item.created_at.substring(11, 16)}</td>
                      <td>{item.diagnosis}</td>
                      <td>{item.color}</td>
                      <td>{item.user_name}</td>
                      <td>{item.user_email}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {isPopUpOpen && (
              <Diagnosis
                diagnosis={selectedItem}
                setIsPopUpOpen={setIsPopUpOpen}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Cases;
