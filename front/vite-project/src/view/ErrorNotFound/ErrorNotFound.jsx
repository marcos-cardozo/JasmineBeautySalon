import { useNavigate } from 'react-router-dom'; 
import styles from './ErrorNotFound.module.css';

const ErrorNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.message}>Pagina no encontrada</p>
            <button className={styles.button} onClick={() => navigate('/')}>
                Go Home
            </button>
        </div>
    );
};

export default ErrorNotFound;
