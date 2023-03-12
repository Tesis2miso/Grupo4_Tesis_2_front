import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { grey } from '@mui/material/colors';
import moment from "moment/moment";


function ConsultListItem(props) {
  const { consult } = props;
  const onSelected = () => {
    document.getElementById('report').style.display = "block";  
    props.func(consult);
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemButton id="lstItemBtn" onClick={onSelected} className="ConsultListItem">
        <ListItemAvatar>
          <Avatar alt={consult.user_name} src="/static/images/avatar/1.jpg" sx={{ bgcolor: grey }} />
        </ListItemAvatar>
        <ListItemText
          primary={consult.user_name}
          secondary={<React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {consult.user_email}
            </Typography>
            {` - ${moment(consult.updated_at).format('DD-MM-YYYY')}`}
            {` - ${consult.injury_type}`}
            {` - ${consult.shape}`}
            {` - ${consult.diagnosis}`}
          </React.Fragment>} />
      </ListItemButton>
    </ListItem>
  );
}

export default ConsultListItem;
