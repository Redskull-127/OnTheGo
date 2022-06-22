import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  return (
    <>
      <div className={styles.NavBar}>
        <div className={styles.start}>
          <h1>On The Go!</h1>
          <div className={styles.items}>
            <a>Home</a>
          </div>
          <div className={styles.items}>
            <a>Login</a>
          </div>
          <div className={styles.items}>
            <a>Register</a>
          </div>
        </div>
        <div className={styles.end}>
          <h1>Help</h1>
        </div>
      </div>
    </>
  );
}
