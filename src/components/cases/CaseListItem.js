import * as React from 'react';
import { useCallback, useEffect, useState } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import moment from "moment/moment";
import { Button } from 'react-bootstrap';
import axios from "axios";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import useToken from "../utils/useToken";
import { toast } from "react-toastify";
import './CaseListItem.css'

function ConsultListItem(props) {
  const { t } = useTranslation();
  const { listConsults } = props;
  const [cases, setCases] = useState([]);
  const { getToken } = useToken();

  const takeCases = (event) => {
    event.preventDefault();
    let token = getToken();

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_BASE_PATH}/specialist/take_consults`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: {
        id_consults: cases
      }
    })
      .then((response) => {
        toast(t("success"))
      })
      .catch((error) => {
        error.response.status === 401 ? toast(t("invalidToken")) : toast(t("specialisterrorTakingCases"))
      });
  };

  const addOrRemove = (id) => {
    console.log(cases)
    const checkedConsults = [...cases];
    const index = checkedConsults.indexOf(id);
    if (index === -1) {
      checkedConsults.push(id);
    } else {
      checkedConsults.splice(index, 1);
    }
    setCases(checkedConsults);
    console.log(checkedConsults)    
  }

  return (
    <><h3 style={{ textAlign: "left" }}>{t("menuPendingCases")}</h3>
      <div className="row">
        <div className="column" style={{ width: "100%" }}>
          <List>
            {listConsults.map((consult) => {
              return (
                <div key={`${consult.id}-div`}>
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ width: "2%" }}>
                          <input value={consult.id} type="checkbox" onClick={() => addOrRemove(consult.id)} />
                        </td>
                        <td style={{ width: "98%" }}>
                          <ListItem id="lstItem">
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
                          </ListItem>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Divider
                    variant="inset"
                    component="li"
                    key={`${consult.id}-divider`} />
                </div>
              );
            })}
          </List>
        </div>
      </div>
      <div>
        <Button type="submit" className="btn btn-success" id="btnTakeCases" onClick={takeCases}>{t("update")}</Button>
      </div>
    </>
  );
}

export default ConsultListItem;
