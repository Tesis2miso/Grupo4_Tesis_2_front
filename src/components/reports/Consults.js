import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import ConsultListItem from "./ConsultListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import useToken from "../utils/useToken";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import ConsultReport from "./ConsultReport";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { StyleSheet } from "@react-pdf/renderer";


function Consults(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [consults, setConsults] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [injuryFilter, setInjuryFilter] = useState("");
  const [filteredConsults, setFilteredConsults] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [selectedconsult, setSelectedconsult] = useState([]);
  const { getToken } = useToken();

  const styles = StyleSheet.create({
    report: {
      display: "none",
      width: "60%",
      margin: "0%",
      border: "1px solid black",
      height: "100%"
    }
  });


  const getConfConsults = useCallback(() => {
    let token = getToken();

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_PATH}/confirmed_consults`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { data } = response;
        setConsults(data);
        setLoading(false);
      })
      .catch((error) => {
        toast(t('noConfirmedCases'));
        setLoading(false);
      });
  }, [t, getToken]);

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      getConfConsults();
    }
  }, [isFirstTime, getConfConsults]);

  useEffect(() => {
    setFilteredConsults(consults);
  }, [consults]);

  const applyFilter = useCallback(() => {
    let filtered = consults.filter((consult) => {
      const dateMatch = consult.updated_at
        .includes(dateFilter);
      const injuryMatch = consult.injury_type.includes(injuryFilter)

      if (startDate) {
        if (dateFilter && injuryFilter) {
          return dateMatch && injuryMatch;
        } else if (dateFilter && injuryFilter) {
          return dateMatch && injuryMatch;
        } else if (dateFilter) {
          return dateMatch;
        } else if (injuryFilter) {
          return injuryMatch;
        } else {
          return true; // if no filters applied, return all consults
        }
      } else {
        if (injuryFilter) {
          return injuryMatch;
        } else {
          return true; // if no filters applied, return all consults
        }
      }
    });
    setFilteredConsults(filtered);
  }, [startDate, consults, dateFilter, injuryFilter]);

  const pull_data = (selectedconsult) => {
    setSelectedconsult(selectedconsult);
  }

  return (
    <div>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px",
        }}
      >
        <h1>{t("menuReports")}</h1>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <div style={{ paddingRight: "10px" }}>
            <DatePicker
              id="datepicker"
              selected={startDate}
              onChange={(date) => { setStartDate(date); setDateFilter(moment(date).format('YYYY-DD-MM')) }}
              isClearable
              placeholderText="Date filter"
            />
          </div>
          <div style={{ paddingRight: "10px" }}>
            <input
              id="injuryType"
              placeholder="Injury type Filter"
              value={injuryFilter}
              onChange={(e) => setInjuryFilter(e.target.value)}
            />
          </div>
          <Button id="btnApplyFilter" onClick={applyFilter}>Apply Filter</Button>
        </Box>
      </Box>

      {loading === true ? (
        <CircularProgress />
      ) : (
        <><h3 style={{ textAlign: "left" }}>{t("menuConfirmedCases")}</h3>
          <div className="row">
            <div className="column" style={{ width: "40%" }}>
              <List
                id="confirmedConsultsList"
                sx={{ width: "100%", bgcolor: "background.paper" }}
              >
                {filteredConsults.map((consult) => {
                  return (
                    <div key={`${consult.id}-div`}>
                      <ConsultListItem key={consult.id} consult={consult} func={pull_data} />
                      <Divider
                        variant="inset"
                        component="li"
                        key={`${consult.id}-divider`} />
                    </div>
                  );
                })}
              </List>
            </div>
            <div id="report" className="column" style={styles.report}>
              <ConsultReport selectedconsult={selectedconsult} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Consults;
