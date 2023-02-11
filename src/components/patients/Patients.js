import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import PatientListItem from './PatientListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import { useTranslation } from "react-i18next";

function Patients(props) {
  const { t } = useTranslation();

  return (
    <div>
      <Toolbar />
      <Box sx={{ display: 'flex' }}>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
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
      </Box>
    </div>
  );
}

export default Patients;
