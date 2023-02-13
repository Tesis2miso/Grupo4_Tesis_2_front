import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List'; import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './PatientDetail.css'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import axios from 'axios';
import useToken from '../utils/useToken';

function PatientDetail(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [consults, setConsults] = useState([]);
  const { getToken } = useToken();
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const getMedicalHistory = useCallback(() => {
    let token = getToken();
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_PATH}/users/${user.id}/consults`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        const { data } = response;
        setConsults(data);
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
      getMedicalHistory();
    }
  }, [isFirstTime, getMedicalHistory])

  const user = {
    id: 1,
    created_at: "2022-02-02",
    name: "William",
    email: "drummerwilliam@gmail.com",
    birth_day: "2022-02-02",
    city: "Bogotá",
    phone: "3013016284"
  }

  return (
    <div>
      {
        loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper} className="medicalHistoryTable">
            <Table sx={{ minWidth: 650 }} aria-label="caption table" >
              <TableHead>
                <TableRow>
                    <StyledTableCell>{t('patientDetailMedicalHistoryEvent')}</StyledTableCell>
                    <StyledTableCell align="right">{t('patientDetailMedicalHistoryEventDate')}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <TableCell component="th" scope="row">
                    {t('patientDetailMedicalHistoryAccountCreation')}
                  </TableCell>
                  <TableCell align="right">{user.created_at}</TableCell>
                </StyledTableRow>
                {consults.map((consultation) => (
                  <StyledTableRow key={consultation.id}>
                    <TableCell component="th" scope="row">
                      {t('patientDetailMedicalHistoryConsultOfType')} {consultation.injury_type}
                    </TableCell>
                    <TableCell align="right">
                      {consultation.created_at}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table >
          </TableContainer >
        )
      }
    </div>
  );
}

export default PatientDetail;
