import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import PatientListItem from './PatientListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import useToken from '../utils/useToken';
import { toast } from 'react-toastify';

function Patients(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [patients, setPatients] = useState([]);
  const { getToken } = useToken();
  const getPatients = useCallback(() => {
    let token = getToken();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_PATH}/users`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        const { data } = response;
        setPatients(data);
        setLoading(false);
      }).catch((error) => {
        let mssg = error.response.data.msg;
        toast(mssg);
        setLoading(false);
      })
  })
  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false)
      getPatients();
    }
  }, [isFirstTime, getPatients])

  return (
    <div>
      <Toolbar />
      <Box sx={{ display: 'flex' }}>
        {
          loading === true ? (
            <CircularProgress />
          ) : (
            <List
              id="patientsList"
              sx = {{ width: '100%', bgcolor: 'background.paper' }}
              subheader={<ListSubheader>{t('menuPatients')}</ListSubheader>}
            >
              {
                patients.map((patient) => {
                  return (
                    <div key={`${patient.id}-div`}>
                      <PatientListItem key={patient.id} user={patient}/>
                      <Divider variant="inset" component="li" key={`${patient.id}-divider`} />
                    </div>
                  )
                })
              }
            </List>
          )
        }
      </Box>
    </div>
  );
}

export default Patients;
