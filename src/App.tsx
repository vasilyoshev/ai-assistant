import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useGetBalanceQuery, useGetUserInfoQuery } from "api";
import { DiffPicturesContainer, PictureInfo } from "components";
import { selectMocksEnabled, toggleMocksEnabled } from "slices";
import styles from "./App.module.scss";

export const App = () => {
  const dispatch = useDispatch();
  const { data: user } = useGetUserInfoQuery();
  const { data: balance } = useGetBalanceQuery();
  const mocksEnabled = useSelector(selectMocksEnabled);

  const onToggleMocksClick = () => {
    dispatch(toggleMocksEnabled());
  };

  return (
    <div className={styles.wrapper}>
      <DiffPicturesContainer />
      <PictureInfo />
      User: {user?.email} <br />
      Credits: {balance?.credits}
      {process.env.NODE_ENV === "development" && (
        <Fab variant="extended" color={mocksEnabled ? "primary" : "error"} onClick={onToggleMocksClick}>
          <BugReportIcon sx={{ mr: 1 }} />
          Mocks {mocksEnabled ? "ON" : "OFF"}
        </Fab>
      )}
    </div>
  );
};
