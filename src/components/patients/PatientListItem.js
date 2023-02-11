import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { red, orange, blue, green, purple, pink } from '@mui/material/colors';

function PatientListItem(props) {
  const randomColor = () => {
    const classes = [
      red, orange, blue, green, purple, pink
    ]
    const func = classes[Math.floor(Math.random() * classes.length)];
    return func[500];
  }
  const user = {
    name: "William",
    email : "drummerwilliam@gmail.com",
    birth_day: "2022-02-02",
    city: "Bogotá",
    phone: "3013016284"
  }

  return (
    <ListItem alignItems="flex-start">
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={user.name} src="/static/images/avatar/1.jpg" sx={{ bgcolor: randomColor() }} />
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user.email}
              </Typography>
              {` - ${user.phone}`}
            </React.Fragment>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}

export default PatientListItem;
