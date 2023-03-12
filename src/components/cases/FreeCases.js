import Toolbar from "@mui/material/Toolbar";
import CaseListItem from "./CaseListItem";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import useToken from "../utils/useToken";
import { toast } from "react-toastify";

function FreeCases(props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [consults, setConsults] = useState([]);
  const [listConsults, setListConsults] = useState([]);
  const { getToken } = useToken();


  const getFreeConsults = useCallback(() => {
    let token = getToken();

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BASE_PATH}/pending_consults`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const { data } = response;
        setConsults(data);
        setLoading(false);
      })
      .catch((error) => {
        toast(t('noFreeCases'));
        setLoading(false);
      });
  }, [t, getToken]);

  useEffect(() => {
    if (isFirstTime) {
      setIsFirstTime(false);
      getFreeConsults();
    }
  }, [isFirstTime, getFreeConsults]);

  useEffect(() => {
    setListConsults(consults);
  }, [consults]);

  return (
    <div>
      <Toolbar />
      <h1>{t("menuCases")}</h1>

      {loading === true ? (
        <CircularProgress />
      ) : (
        <CaseListItem listConsults={listConsults} />
      )}
    </div>
  );
}

export default FreeCases;
