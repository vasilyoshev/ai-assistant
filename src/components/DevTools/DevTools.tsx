import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@mui/material";
import { selectMocksEnabled, toggleMocksEnabled } from "slices";
import { useGetBalanceQuery } from "api";
import styles from "./DevTools.module.scss";

export const DevTools = () => {
  const dispatch = useDispatch();
  const mocksEnabled = useSelector(selectMocksEnabled);
  const { data: balance } = useGetBalanceQuery();

  const onToggleMocksClick = () => {
    dispatch(toggleMocksEnabled());
  };

  return (
    process.env.NODE_ENV === "development" && (
      <Fab
        className={styles.mocksButton}
        variant="extended"
        color={mocksEnabled ? "primary" : "error"}
        onClick={onToggleMocksClick}
      >
        Mocks {mocksEnabled ? "ON" : "OFF"} <br />
        Credits: {balance?.credits.toFixed(2)}
      </Fab>
    )
  );
};
