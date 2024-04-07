
import styles from "./style.module.css";


const Waves = () => {
  return (
    <section>
      
      <div className={`${styles.wave} ${styles.wave1}`}></div>
      <div className={`${styles.wave} ${styles.wave2}`}></div>
      <div className={`${styles.wave} ${styles.wave3}`}></div>
      <div className={`${styles.wave} ${styles.wave4}`}></div>
    </section>
    
  );

};

export default Waves;
