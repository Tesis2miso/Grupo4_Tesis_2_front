import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState, Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Avatar, Input, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import useToken from '../utils/useToken';
import { toast } from 'react-toastify';
import './Profile.css'
import axios from 'axios';
import { Password } from '@mui/icons-material';
import { Button } from 'react-bootstrap';

function GridProfile(props) {
  const { t } = useTranslation();
  const { specialist } = props;
  const { getToken } = useToken();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  function updateProfile(event) {
    event.preventDefault();
    let name = event.target.name.value
    let email = event.target.email.value
    let last_name = event.target.last_name.value
    let username = event.target.username.value
    let password = event.target.password.value
    let re_password = event.target.re_password.value
    let token = getToken();

    if (password.trim() !== re_password.trim()) {
      toast(t("specialistErrorPasswordDontMatch"));
      return;
    }

    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_PATH}/specialist/update_profile`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: {
        name: name,
        email: email,
        last_name: last_name,
        username: username,
        password: password,
        re_password: re_password
      },
    })
      .then((response) => {
        toast(t("success"))
      })
      .catch((error) => {
        error.response.status === 412 ? toast(t("specialistErrorEmailExists")) : toast(t("specialisterrorUpdateProfile"))
      });
  };

  return (
    <Grid container sx={{ width: '100%' }} spacing={3}>
      <Grid sm={12} md={12}>
        <form id="form" onSubmit={() => {}}>
          <Item>
            <Typography variant="h5" className="paperLeftHeader">
              {t("patientDetailTitle")}
            </Typography>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar><DriveFileRenameOutlineIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={t('specialistProfilename')} secondary={<Input id="name" type="text" text={specialist.name} name="name" placeholder={t("specialistProfileNames")} defaultValue={specialist.name}></Input>} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar><DriveFileRenameOutlineIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={t('specialistProfileLastname')} secondary={<Input id="last_name" type="text" text={specialist.last_name} name="last_name" placeholder={t("specialistProfileLastNames")} defaultValue={specialist.last_name}></Input>} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar><AlternateEmailIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={t('email')} secondary={<Input id="email" type="email" text={specialist.email} name="email" placeholder={t("email")} defaultValue={specialist.email}></Input>} />                                            </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar><DriveFileRenameOutlineIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={t('specialistProfileUsername')} secondary={<Input id="username" type="text" text={specialist.username} name="username" placeholder={t("specialistProfileUsername")} defaultValue={specialist.username}></Input>} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar><Password /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={t('password')} secondary={<Input id="password" type="password" name="password" placeholder={t("password")}></Input>} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar><Password /></Avatar>
                </ListItemAvatar>
                <ListItemText primary={t('specialistProfileRePassword')} secondary={<Input id="re_password" type="password" name="re_password" placeholder={t("specialistProfileRePassword")}></Input>} />
              </ListItem>
            </List>
          </Item>
          <Button type="submit" className="btn btn-success" id="updatebutton" onClick={updateProfile}>Update</Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default GridProfile;
