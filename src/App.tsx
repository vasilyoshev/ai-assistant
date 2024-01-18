import { DiffPicturesContainer, PictureInfo } from "components";
import { useGetBalanceQuery, useGetUserInfoQuery } from "api";
import styles from "./App.module.scss";

export const App = () => {
  const { data: user } = useGetUserInfoQuery();
  const { data: balance } = useGetBalanceQuery();

  return (
    <div className={styles.wrapper}>
      <DiffPicturesContainer />
      <PictureInfo />
      User: {user?.email} <br/>
      Credits: {balance?.credits}
    </div>
  );
};
