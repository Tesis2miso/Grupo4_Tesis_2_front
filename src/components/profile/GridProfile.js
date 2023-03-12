import List from '@mui/material/List';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Input, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import useToken from '../utils/useToken';
import { toast } from 'react-toastify'
import axios from 'axios';
import { AlignHorizontalCenter, AlignHorizontalLeft, Password } from '@mui/icons-material';
import { Button } from 'react-bootstrap';

function GridProfile(props) {
  const { t } = useTranslation();
  const { specialist } = props;
  const { getToken } = useToken();
  const [updateForm, setUpdateForm] = useState({
    name: specialist.name,
    email: specialist.email,
    last_name: specialist.last_name,
    username: specialist.username,
    password: "",
    re_password: ""
  });

  const updateProfile = (event) => {
    event.preventDefault();
    const {
      name,
      email,
      last_name,
      username,
      password,
      re_password,
    } = updateForm;
    let token = getToken();

    if (password.trim() !== re_password.trim()) {
      toast(t("specialistErrorPasswordDontMatch"));
      return;
    }

    axios({
      method: "PUT",
      url: `http://dermoapp-server.eba-u5i6h72y.us-east-1.elasticbeanstalk.com/specialist/update_profile`,
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

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUpdateForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <Grid container sx={{ width: '100%' }} spacing={3}>
      <Grid sm={24} md={24}>
        <form id="form">
          <Typography variant="h5" className="paperLeftHeader">
            {t("patientDetailTitle")}
          </Typography>
          <List sx={{ width: '100%', maxWidth: 480, bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar><DriveFileRenameOutlineIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText primary={t('specialistProfilename')}/>
              <Input id="name" onChange={handleChange} type="text" text={updateForm.name} name="name" placeholder={t("specialistProfilename")} value={updateForm.name}></Input>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar><DriveFileRenameOutlineIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText primary={t('specialistProfileLastname')}/>
              <Input id="last_name" onChange={handleChange} type="text" text={updateForm.last_name} name="last_name" placeholder={t("specialistProfileLastNames")} value={updateForm.last_name}></Input>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar><AlternateEmailIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText primary={t('email')}/>
              <Input id="email" onChange={handleChange} type="email" text={updateForm.email} name="email" placeholder={t("email")} value={updateForm.email}></Input>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar><DriveFileRenameOutlineIcon /></Avatar>
              </ListItemAvatar>
              <ListItemText primary={t('specialistProfileUsername')}/>
              <Input id="username" onChange={handleChange} type="text" text={updateForm.username} name="username" placeholder={t("specialistProfileUsername")} value={updateForm.username}></Input>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar><Password /></Avatar>
              </ListItemAvatar>
              <ListItemText primary={t('password')}/>
              <Input id="password" onChange={handleChange} type="password" name="password" placeholder={t("password")}></Input>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar><Password /></Avatar>
              </ListItemAvatar>
              <ListItemText primary={t('specialistProfileRePassword')}/>
              <Input id="re_password" onChange={handleChange} type="password" name="re_password" placeholder={t("specialistProfileRePassword")}></Input>
            </ListItem>
          </List>
          <Button type="submit" className="btn btn-success" id="updatebutton" onClick={updateProfile}>{t("update")}</Button>
        </form>
      </Grid>
    </Grid>
  );
}

export default GridProfile;
