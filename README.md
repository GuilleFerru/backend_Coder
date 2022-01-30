# Tienda Online curso Backend CoderHouse 2021 

### Este proyecto de Ecommerce se realizo como trabajo final de aprobación del curso de [Backend con Node JS](https://nodejs.org/es/) dictado desde Julio de 2021 hasta Febrero 2022.

## Respuestas a las consignas del proyecto final: 

1.El proyecto esta dividido en dos partes, la parte de backend, desarrollada con TypeScript se implemento en capas utilizando el patrón MVC (con las capas de ruteo, control y negocio), para la persistencia de datos se utilizo MongoDB As a Service implementando los patrones DAO y DTO, se puede utilizar otras bases de datos como MySQL, Firebase y FileSystem con solo modificar la variable de entorno, para esto se aplico el patrón Factory, ademas tiene un servicio de chat implementado con Sockets y el patrón Repository. La parte de Frontend se realizo en el mismo servidor exponiendo la carpeta public para tales efectos. Se utilizo Handlebars, Vanilla Javascript y Bootstrap.

2.El codigo es escabable, si se desea agregar mas logica al servidor solo se debe programar sin modificar el codigo existente gracias a la separación por capas logradas utilizando el patrón MVC.

**Ver online**: [https://coderbackend.herokuapp.com/login](https://coderbackend.herokuapp.com/login)

Usuarios de la app

user: admin@app.com
pass: admin

user: user@app.com
pass: user

*Los usuarios son creados con el privilegio de admin.

Mock email
ETHEREAL USER=kr4zsiupbsndpjgc@ethereal.email
ETHEREAL PASS=VB9TCk2tnDp6pPAMV8

TWILIO:
Para recibir wsp se debe enviar el codigo join positive-size a +1 415 523 8886. Si el user logueado tiene permisos de admin le llegara el pedido a su celu, sino llegara a mi telefono. (se realizo de esta manera para que pueda ser probado con facilidad).

