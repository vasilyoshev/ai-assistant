import styles from "./Meteors.module.scss";

export const Meteors = ({ number }: { number?: number }) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <div className={styles.meteorWrapper}>
      {meteors.map((el, index) => (
        <span
          key={"meteor" + index}
          className={styles.meteor}
          style={{
            top: 0,
            left: Math.floor(Math.random() * (window.innerWidth - -window.innerWidth) + -window.innerWidth) + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
          }}
        ></span>
      ))}
    </div>
  );
};
