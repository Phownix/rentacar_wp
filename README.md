# RentaCAR Software Application

**RentaCAR** es un proyecto desarrollado para una empresa de alquiler de vehículos que buscaba establecer su presencia en línea para ofrecer sus servicios a un mayor número de usuarios.

Para garantizar el correcto funcionamiento de este software, es necesario contar con la instalación previa de los siguientes programas en el servidor o computadora:

- Node.js
- NPM
- MongoDB

Estos programas desempeñan funciones clave en nuestro software, como la ejecución del mismo, la instalación de librerías y el almacenamiento de datos e información.

## Primera ejecución
Antes de ejecutar el proyecto por primera vez, se debe instalar las librerías necesarias para su funcionamiento. Esto se logra mediante el comando `npm install` ubicado en la raíz del proyecto.

Además, es imprescindible contar con **MongoDB** instalado en el sistema operativo. Para crear algunos vehículos de muestra y un usuario administrador, se utiliza el comando `npm run up`.

```bash
npm install &&
npm run up &&
npm run dev
```

Algunas de las librerías esenciales para el funcionamiento del proyecto (las cuales se instalan automáticamente al ejecutar `npm install` en la terminal de la carpeta raíz del proyecto) son:

- express
- express-session
- mongoose
- body-parser
- cookie-parser
- nodemon
- dotenv
- bcrypt
- nunjucks
- passport
- passport-local
- uuid