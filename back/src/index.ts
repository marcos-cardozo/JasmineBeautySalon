import server from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import "reflect-metadata"

AppDataSource.initialize()
    .then(() => {
        console.log("Conexion a la base datos con exito")

        server.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`)
        })
    }).catch((error) => {
        console.log("Error al conectar con la base de datos:", error)
    })


