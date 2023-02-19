import axios from "axios";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Route, Routes, useNavigate } from "react-router-dom";
import Patients from "../patients/Patients";
import Cases from "../cases/Cases";
import Reports from "../reports/Reports";

import AccessibilityIcon from "@mui/icons-material/Accessibility";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AssessmentIcon from "@mui/icons-material/Assessment";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import PublicIcon from "@mui/icons-material/Public";
import LocaleContext from "../utils/LocaleContext";
import i18n from "../utils/i18n";
import { useTranslation } from "react-i18next";
import PatientDetail from "../patientDetail/PatientDetail";
import Profile from '../profile/Profile';
import Agenda from "../agenda/Agenda";

function Home(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const drawerWidth = 240;
  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));

  const itemsList = [
    {
      text: t("menuSchedule"),
      id: "schedule",
      icon: <CalendarMonthIcon />,
      onClick: () => navigate("/"),
    },
    {
      text: t("menuPatients"),
      icon: <AccessibilityIcon />,
      id: "patients",
      onClick: () => navigate("/patients"),
    },
    {
      text: t("menuCases"),
      icon: <LibraryBooksIcon />,
      id: "cases",
      onClick: () => navigate("/cases"),
    },
    {
      text: t("menuReports"),
      icon: <AssessmentIcon />,
      id: "reports",
      onClick: () => navigate("/reports"),
    },
  ];
  const [anchorEl, setAnchorEl] = useState(null);
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setLanguageAnchorEl(null);
  };
  const handleOptionsMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLanguageMenu = (event) => {
    setLanguageAnchorEl(event.currentTarget);
  };
  const signOut = () => {
    handleClose();
    logMeOut();
  };
  const changeLocale = (locale) => {
    handleClose();
    i18n.changeLanguage(locale);
  };

  function logMeOut() {
    props.removeToken();
    localStorage.removeItem("userName");
    navigate("/login");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_PATH}/specialist/logout`,
    })
      .then((response) => {})
      .catch((error) => {
        //console.log(error)
      });
  }
  
  function goToProfile(event){        
    navigate('/profile')
  }
  
  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <Box sx={{ display: "flex" }} >
        <CssBaseline />        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar  style={{backgroundColor:"#3b5998"}}>
          <div className="container">
                <div className="row">
                  <div className="col-8">
                    <h3 style={{ float: "right" }}>DermoApp</h3>
                  </div>
                  <div className="col-1">
                    <img style={{ width: "30px" , float:"left"}} src={"./medical_logo.png"} />
                  </div>
                  <div className="col-3"></div>
                </div>
              </div>
            <div>
              <IconButton
                id="languageMenu"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleLanguageMenu}
                color="inherit"
              >
                <PublicIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(languageAnchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  id="languageEs"
                  onClick={() => {
                    changeLocale("es");
                  }}
                >
                  {t("es")}
                </MenuItem>
                <MenuItem
                  id="languageEn"
                  onClick={() => {
                    changeLocale("en");
                  }}
                >
                  {t("en")}
                </MenuItem>
              </Menu>
            </div>
            <div>
              <IconButton
                id="optionsMenu"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOptionsMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem id="menuProfile" onClick={goToProfile}>{t('profile')}</MenuItem>
                <MenuItem id="menuLogout" onClick={signOut}>
                  {t("signOut")}
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {itemsList.map((item, index) => {
                const { text, icon, onClick, id } = item;
                return (
                  <ListItem
                    id={`drawerOption-${id}`}
                    key={text}
                    onClick={onClick}
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route exact path="/" element={<Agenda />} />
            <Route exact path="/patients/:id" element={<PatientDetail />} />
            <Route exact path="/patients" element={<Patients />} />
            <Route exact path="/cases" element={<Cases />} />
            <Route exact path="/reports" element={<Reports />} />
            <Route exact path="/profile" element={<Profile />} />
          </Routes>
        </Box>
      </Box>
    </LocaleContext.Provider>
  );
}

export default Home;
