import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@mui/material";
import { useGetBalanceQuery, useGetUserInfoQuery } from "api";
import { DiffPicturesContainer, PictureInfo } from "components";
import { selectMocksEnabled, toggleMocksEnabled } from "slices";
import BugReportIcon from "@mui/icons-material/BugReport";

export const ClassicRoute = () => {
  const dispatch = useDispatch();
  const { data: user } = useGetUserInfoQuery();
  const { data: balance } = useGetBalanceQuery();
  const mocksEnabled = useSelector(selectMocksEnabled);

  const onToggleMocksClick = () => {
    dispatch(toggleMocksEnabled());
  };

  return (
    <>
      <DiffPicturesContainer />
      <PictureInfo />
      {process.env.NODE_ENV === "development" && (
        <>
          User: {user?.email} <br />
          Credits: {balance?.credits}
          <Fab variant="extended" color={mocksEnabled ? "primary" : "error"} onClick={onToggleMocksClick}>
            <BugReportIcon sx={{ mr: 1 }} />
            Mocks {mocksEnabled ? "ON" : "OFF"}
          </Fab>
        </>
      )}
    </>
  );
};
