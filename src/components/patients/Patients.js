import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import PatientListItem from './PatientListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Patients(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Toolbar />
      <Box sx={{ display: 'flex' }}>
        {
          loading === true ? (
            <CircularProgress />
          ) : (
            <List
              sx = {{ width: '100%', bgcolor: 'background.paper' }}
              subheader={<ListSubheader>{t('menuPatients')}</ListSubheader>}
            >
              <PatientListItem />
              <Divider variant="inset" component="li" />
              <PatientListItem />
              <Divider variant="inset" component="li" />
              <PatientListItem />
              <Divider variant="inset" component="li" />
              <PatientListItem />
              <Divider variant="inset" component="li" />
              <PatientListItem />
              <Divider variant="inset" component="li" />
            </List>
          )
        }
      </Box>
    </div>
  );
}

export default Patients;
