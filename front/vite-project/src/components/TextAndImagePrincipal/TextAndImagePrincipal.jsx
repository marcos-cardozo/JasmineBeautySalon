import TypingEffectParagraph from "../TypingEffectParagraph/TypingEffectParagraph";
import TypingEffectTitle from "../TypingEffectTitle/TypingEffectTitle";
import imagenPrincipal from "/imagenPrincipal.png";
import styles from "./TextAndImagePrincipal.module.css";

const TextAndImagePrincipal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerText}>
        <TypingEffectTitle
          text="Bienvenid@s a Jazmine Salonn"
          speed={120}
          className={styles.tituloPrincipal}
        />
        <TypingEffectParagraph
          text="Veen a Jazmine Salon y déjate consentir por expertos. Porque tu belleza es nuestra inspiración, y tu bienestar, nuestra misión. ¡Te esperamos para hacerte brillar como nunca antes!"
          speed={20}
          className={styles.parrafoPrincipal}
        />
      </div>
      <div className={styles.imgenPrincipalContainer}>
        <img src={imagenPrincipal} className={styles.imagenPrincipal} alt="imagen del salon" />
      </div>
    </div>
  );
};

export default TextAndImagePrincipal;
