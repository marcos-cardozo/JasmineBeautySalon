import OurServices from "../../components/OurServices/OurServices";
import TextAndImagePrincipal from "../../components/TextAndImagePrincipal/TextAndImagePrincipal";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <>
      <TextAndImagePrincipal />
      <OurServices />
      <div className={styles.ServicesContainer}>
        <p className={styles.footertext}>Jazmine Salon .inc</p>
      </div>

    </>
  );
};

export default Home;
