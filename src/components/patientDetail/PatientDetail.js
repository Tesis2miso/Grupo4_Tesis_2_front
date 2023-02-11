import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PatientMedicalHistory from './PatientMedicalHistory'
import './PatientDetail.css'

function PatientDetail(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const user = {
    id: 1,
    name: "William",
    email: "drummerwilliam@gmail.com",
    birth_day: "2022-02-02",
    city: "Bogotá",
    phone: "3013016284"
  }

  return (
    <div>
      <Toolbar />
      <Box sx={{ display: 'flex' }}>
        <Grid container sx={{ width: '100%' }} spacing={3}>
          <Grid sm={12} md={12}>
            <Item>
              <Typography variant="h5" className="paperLeftHeader">
                Datos personales
              </Typography>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><DriveFileRenameOutlineIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Nombre" secondary={user.name} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><AlternateEmailIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Email" secondary={user.email} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><CalendarMonthIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Fecha de nacimiento" secondary={user.birth_day} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><LocationCityIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Ciudad" secondary={user.city} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar><PhoneAndroidIcon /></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Celular" secondary={user.phone} />
                </ListItem>
              </List>
            </Item>
            <Grid sm={12} md={12}>
              <Item>
                <Typography variant="h5" className="paperLeftHeader">
                  Historia clinica
                </Typography>
                <PatientMedicalHistory />
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PatientDetail;
