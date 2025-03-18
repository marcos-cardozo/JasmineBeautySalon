import { useState } from "react";
import styles from "./OurServices.module.css";

const OurServices = () => {
  const services = [
    {
      title: "Corte de cabello",
      description: "Cortes modernos y clásicos para todas las edades.",
      image: "/carruselImagen1.png",
    },
    {
      title: "Coloración",
      description: "Tintes y técnicas avanzadas para un look perfecto.",
      image: "/carruselImagen2.png",
    },
    {
      title: "Manicura y Pedicura",
      description: "Cuidado de uñas con diseños personalizados.",
      image: "/carruselImagen3.png",
    },
    {
      title: "Arreglo de barba",
      description: "Estilos de barba para todas las edades.",
      image: "/carruselImagen4.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.ServicesContainer}>
      <h2 className={styles.SectionTitle}>Nuestros trabajos</h2>
      <div className={styles.CarouselContainer}>
        <div className={styles.Carousel}>
          <img
            src={services[currentIndex].image}
            alt={services[currentIndex].title}
            className={styles.ServiceImage}
          />
          <div className={styles.ServiceInfo}>
            <h3 className={styles.ServiceTitle}>
              {services[currentIndex].title}
            </h3>
            <p className={styles.ServiceDescription}>
              {services[currentIndex].description}
            </p>
          </div>
        </div>
        <button onClick={prevSlide} className={styles.PrevButton}>
          &#8592;
        </button>
        <button onClick={nextSlide} className={styles.NextButton}>
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default OurServices;
