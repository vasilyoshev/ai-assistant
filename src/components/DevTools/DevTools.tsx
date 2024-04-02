import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@mui/material";
import { selectMocksEnabled, setGameStatus, toggleMocksEnabled } from "slices";
import { useGetBalanceQuery } from "api";
import { GameStatus } from "enums";
import styles from "./DevTools.module.scss";

export const DevTools = () => {
  const dispatch = useDispatch();
  const mocksEnabled = useSelector(selectMocksEnabled);
  const { data: balance } = useGetBalanceQuery();

  const onToggleMocksClick = () => {
    dispatch(toggleMocksEnabled());
  };

  const winGame = () => {
    dispatch(setGameStatus(GameStatus.GameWon));
  };

  const clearLevel = () => {
    dispatch(setGameStatus(GameStatus.LevelCleared));
  };

  return (
    process.env.NODE_ENV === "development" && (
      <div className={styles.mocksButton}>
        <Fab variant="extended" onClick={clearLevel}>
          Clear level
        </Fab>
        <Fab variant="extended" onClick={winGame}>
          Win game
        </Fab>
        <Fab variant="extended" color={mocksEnabled ? "primary" : "error"} onClick={onToggleMocksClick}>
          Mocks {mocksEnabled ? "ON" : "OFF"} <br />
          Credits: {balance?.credits.toFixed(2)}
        </Fab>
      </div>
    )
  );
};
