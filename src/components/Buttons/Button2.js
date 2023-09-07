import styles from './Styles.module.css'

const Button2 = ({ children, onClick, className }) => {
  return (
        <button className={`${className} ${styles.button2}`} onClick={onClick}>
          <span className={styles.b2span}></span>{children}
        </button>
  );
};

export default Button2;
