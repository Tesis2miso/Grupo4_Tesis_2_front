import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List'; import { useTranslation } from "react-i18next";
import { useState } from 'react';
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
import './PatientDetail.css'

function PatientDetail(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
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
  const user = {
    id: 1,
    created_at: "2022-02-02",
    name: "William",
    email: "drummerwilliam@gmail.com",
    birth_day: "2022-02-02",
    city: "Bogotá",
    phone: "3013016284"
  }
  const consultations = [
    {
      id: 1,
      created_at: "2022-02-02",
      injury_type: 'test',
      shape: 'circular',
      injuries_count: 1,
      distribution: 'brazo',
      color: 'rojo',
      photo_url: 'https://google.com/'
    },
    {
      id: 2,
      created_at: "2022-02-02",
      injury_type: 'test',
      shape: 'circular',
      injuries_count: 1,
      distribution: 'brazo',
      color: 'rojo',
      photo_url: 'https://google.com/'
    },
    {
      id: 3,
      created_at: "2022-02-02",
      injury_type: 'test',
      shape: 'circular',
      injuries_count: 1,
      distribution: 'brazo',
      color: 'rojo',
      photo_url: 'https://google.com/'
    }
  ]

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
                  <StyledTableCell>Evento</StyledTableCell>
                  <StyledTableCell align="right">Fecha</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <TableCell component="th" scope="row">
                    Creación de cuenta
                  </TableCell>
                  <TableCell align="right">{user.created_at}</TableCell>
                </StyledTableRow>
                {consultations.map((consultation) => (
                  <StyledTableRow key={consultation.id}>
                    <TableCell component="th" scope="row">
                      Consulta de tipo {consultation.injury_type}
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
