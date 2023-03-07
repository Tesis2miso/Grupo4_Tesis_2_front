import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import PatientListItem from "./PatientListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListSubheader from "@mui/material/ListSubheader";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import useToken from "../utils/useToken";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Patients(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [patients, setPatients] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const { getToken } = useToken();

  const getPatients = useCallback(() => {
    let token = getToken();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_PATH}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { data } = response;
        setPatients(data);
        setLoading(false);
      })
      .catch((error) => {
        let mssg = error.response.data.msg;
        toast(mssg);
        setLoading(false);
      });
  }, [getToken]);

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      getPatients();
    }
  }, [isFirstTime, getPatients]);

  useEffect(() => {
    setFilteredPatients(patients);
  }, [patients]);

  function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const now = new Date();
    const diffMilliseconds = now - birthDate;
    const diffYears = diffMilliseconds / (1000 * 60 * 60 * 24 * 365);
    return Math.floor(diffYears);
  }

  const applyFilter = useCallback(() => {
    let filtered = patients.filter((patient) => {
      const nameMatch = patient.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const ageMatch = calculateAge(patient.birth_day).toString() === ageFilter;
      const emailMatch = patient.email
        .toLowerCase()
        .includes(emailFilter.toLowerCase());

      if (nameFilter && ageFilter && emailFilter) {
        return nameMatch && ageMatch && emailMatch;
      } else if (nameFilter && ageFilter) {
        return nameMatch && ageMatch;
      } else if (nameFilter && emailFilter) {
        return nameMatch && emailMatch;
      } else if (ageFilter && emailFilter) {
        return ageMatch && emailMatch;
      } else if (nameFilter) {
        return nameMatch;
      } else if (ageFilter) {
        return ageMatch;
      } else if (emailFilter) {
        return emailMatch;
      } else {
        return true; // if no filters applied, return all patients
      }
    });
    setFilteredPatients(filtered);
  }, [nameFilter, ageFilter, emailFilter, patients]);
  return (
    <div>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <h2>{t("menuPatients")}</h2>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <div style={{ paddingRight: "10px" }}>
            <TextField
              label="Name Filter"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>
          <div style={{ paddingRight: "10px" }}>
            <TextField
              label="Age Filter"
              value={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
            />
          </div>
          <div style={{ paddingRight: "10px" }}>
            <TextField
              label="Email Filter"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
            />
          </div>
          <Button onClick={applyFilter}>Apply Filter</Button>
        </Box>
      </Box>

      {loading === true ? (
        <CircularProgress />
      ) : (
        <List
          id="patientsList"
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          {filteredPatients.map((patient) => {
            return (
              <div key={`${patient.id}-div`}>
                <PatientListItem key={patient.id} user={patient} />
                <Divider
                  variant="inset"
                  component="li"
                  key={`${patient.id}-divider`}
                />
              </div>
            );
          })}
        </List>
      )}
    </div>
  );
}

export default Patients;
