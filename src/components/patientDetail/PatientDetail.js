import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from 'react';
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
import useToken from '../utils/useToken';
import { toast } from 'react-toastify';
import './PatientDetail.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetail(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [user, setUser] = useState(null);
  const { getToken } = useToken();
  let { id } = useParams();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const getPatient = useCallback(() => {
    let token = getToken();
    axios({
      method: "GET",
      url: `http://dermoapp-server.eba-u5i6h72y.us-east-1.elasticbeanstalk.com/users/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        const { data } = response;
        setUser(data);
        setLoading(false);
      }).catch((error) => {
        let mssg = error.response.data.msg;
        toast(mssg);
      })
  })
  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false)
      getPatient();
    }
  }, [isFirstTime, getPatient])

  return (
    <div>
      <Toolbar />
      <Box sx={{ display: 'flex' }}>
        {
          loading ? (
            <CircularProgress />
          ) : (
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
                      <ListItemText primary={t('patientDetailName')} secondary={user.name} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar><AlternateEmailIcon /></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={t('patientDetailEmail')} secondary={user.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar><CalendarMonthIcon /></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={t('patientDetailBirthday')} secondary={user.birth_day} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar><LocationCityIcon /></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={t('patientDetailCity')} secondary={user.city} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar><PhoneAndroidIcon /></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={t('patientDetailPhone')} secondary={user.phone} />
                    </ListItem>
                  </List>
                </Item>
                <Grid sm={12} md={12}>
                  <Item>
                    <Typography variant="h5" className="paperLeftHeader">
                      {t('patientDetailMedicalHistoryTitle')}
                    </Typography>
                    <PatientMedicalHistory />
                  </Item>
                </Grid>
              </Grid>
            </Grid>
          )
        }
      </Box>
    </div>
  );
}

export default PatientDetail;
