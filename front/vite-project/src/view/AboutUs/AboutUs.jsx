import styles from "./AboutUs.module.css";

const AboutUs = () => {
    const employees = [
        {
            name: "María López",
            role: "Estilista Profesional",
            skills: ["Cortes modernos", "Coloración", "Peinados para eventos"],
            image: "/mujerEmpleada1.png", // Ruta corregida
        },
        {
            name: "Juan Pérez",
            role: "Barbero",
            skills: ["Cortes clásicos", "Arreglo de barba", "Estilismo masculino"],
            image: "/hombreEmpleado2.png", // Ruta corregida
        },
        {
            name: "Sofía Ramírez",
            role: "Especialista en uñas",
            skills: ["Manicura", "Pedicura", "Arte en uñas"],
            image: "/mujerEmpleada2.png",
        },
    ];
    

    return (
        <div className={styles.AboutUsContainer}>
            <h2 className={styles.Title}>Conoce a nuestro equipo</h2>
            <div className={styles.EmployeeList}>
                {employees.map((employee, index) => (
                    <div key={index} className={styles.EmployeeCard}>
                        <img
                            src={employee.image}
                            alt={`Foto de ${employee.name}`}
                            className={styles.EmployeeImage}
                        />
                        <h3 className={styles.EmployeeName}>{employee.name}</h3>
                        <p className={styles.EmployeeRole}>{employee.role}</p>
                        <ul className={styles.SkillsList}>
                            {employee.skills.map((skill, idx) => (
                                <li key={idx} className={styles.Skill}>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutUs;
