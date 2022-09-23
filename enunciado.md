# 2022-1 / IIC2173 - E0 | Smart cities

## Introduccion al proyecto del curso 

El futuro de la ciudad apunta a ofrecer más y más comodidades a sus habitantes. No solamente se intenciona que se puedan cumplir los servicios básicos propios de cada ciudad (seguridad, limpieza, tráfico en carreteras, etc) sino que se pide que estos servicios sean cada vez mas eficientes y completos. 

Uno de los servicios más criticos de las ciudades, es su capacidad de respuesta frente a emergencias, algo clave especialmente en regiones propensas a desastres. En este sentido, los equipos de respuesta temprana (ERT) frente a desastres son sumamente importantes para lograr disminuir desde un primer momento las posibles consecuencias de un desastre

Estos equipos están compuestos por una unión interdisciplinaria de equipos. Médicos, bomberos, policías, administradores, ingenieros, directores de tránsito se unen para responder a estas emergencias. El concepto de smart cities empodera a estos equipos mediante tecnologías útiles, como equipamiento de coordinacion, sensores de posición para los equipos, drones de observación, sensores de tráfico, capacidades de ruteo, entre otros.  Estas tecnologías proveen la capacidad de tener informacion para tomar decisiones clave y hacer mas eficiente este trabajo.

## Enunciado 

LegitBusiness, una consultora líder del mercado lo ha contratado para introducirse en este campo. Como primera prueba de concepto, le han pedido que se conecte a un nodo de ejemplo, que emite eventos de diversas emergencias. Estos eventos tienen el siguiente schema JSON y se publican en el canal **global-emergencies**

```
{
    "type":"string",
    "lat":float,
    "lon":float,
    "location":"string",
    "message":"string",
    "level":int
}
```
Por ejemplo
```
{
    "type":"alert",
    "lat":-70.61487974212355,
    "lon":-33.49905829980417,
    "location":"Campus san joaquín",
    "message":"Orc attack, trebuchets and molotovs",
    "level":1000
}
```

Debe crear una plataforma que pueda recibir usuarios y mostrar una lista de estos eventos desde el canal global. Tiene la opción de crear un mapa con esta información, para darle más valor.

## Especificaciones

Para esta tarea personal, “Entrega 0”, la idea es que todos aprendan la base de una aplicación montada en la web, por lo que deberán crear y configurar un servicio web que implemente un pequeño servicio de rastreo de usuarios. Los usuarios deben poder crear una cuenta y registrarse con las mismas credenciales.

Pueden desarrollar su solución con el framework que deseen de esta lista

Servicio web

* Ruby
    * Rails
* Python
    * FastAPI
    * Django 
* Javascript
    * Koa
    * Express
* Brainfuck
    * ???
* Malbolge
    * ??? ???

Lenguajes para el servicio de conexión a broker

* Ruby
* Python
* Javascript
* Go
* C#
* C/C++
* Brainfuck
* Malbolge

Cada servidor tendrá que tener un dominio asignado. Los dominios TK, ML o GA son gratuitos, y pueden conseguirlos fácilmente en Freenom o en el github student pack. Finalmente, en el servidor deberán configurar un servicio proxy inverso con NGINX que esté escuchando en el puerto 443, asegurado con SSL.

Para esto, podrán usar Let's Encrypt, un servicio gratuito de implementación de HTTPS

Finalmente, solo pueden usar los siguientes proveedores en la nube, y sus servicios IaaS

* AWS
* GCP

Los ayudantes podrán responder sus dudas en AWS. Además, las ayudantías se referirán a AWS. Las siguientes herramientas / plataformas están prohibidas y no se corregirá nada que ocupe sus servicios:

* Heroku
* Ciertos servicios de AWS
    * LightSail
    * Elastic Beanstalk
    * Amplify
    * Cognito (para esta entrega)
* Netlify
* Firebase (excepto para notificaciones móviles)

Y cualquier BaaS que implemente funcionalidad fuera de su código. 

## Puntaje

Esta entrega consiste en dos partes, la parte mínima (que todos deben lograr) que vale 50% de la nota final y una parte variable que también vale 50%. Sobre la parte variable, tendrán 3 opciones para trabajar, de las que deberán escoger 2. Cada una de las que escojan para evaluar vale 25% de la nota final, y realizar una tercera parte puede dar hasta 5 décimas.

Los requisitos marcados como ***Esencial*** son obligatorios para que su tarea sea revisada. De no cumplir con estos, su tarea no será revisada.

### Requisitos funcionales (10p)

* **RF2: (5p)** ***Esencial*** Debe poder ofrecer en un sitio web la lista de todos los eventos que se han generado en el broker a medida que se vayan recibiendo
* **RF3: (5p)** Se puede crear cuentas de usuario con mail, datos de contacto, nick y contraseñas. Se puede iniciar sesión con las cuentas creadas.

### Requisitos no funcionales (20p)

* **RNF1: (5p)** ***Esencial*** Debe poder conectarse al broker mediante el protocolo MQTT usando un daemon que corra de forma constante (puede usar *nohup* u otro método). Se le facilitarán credenciales para conectarse al broker (*hint*: use un archivo simple de intermediario)
* **RNF1: (3p)** Debe haber un proxy inverso (como Nginx o Traefik) configurado.
* **RNF2: (2p)** El servidor debe tener un nombre de dominio de primer nivel (tech, me, tk, ml, ga, com, cl, etc)
* **RNF3: (2p)** ***Esencial*** El servidor debe estar corriendo en EC2.
* **RNF4: (4p)** Debe haber una base de datos Postgres o Mongo externa asociada a la aplicación para guardar usuarios y consultarlos.
* **RNF5: (4p)** ***Esencial*** El servicio debe estar dentro de un container Docker.

### Variables

#### Docker-Compose (25%) (15p)

Componer servicios es esencial para obtener entornos de prueba confiables, especialmente en las máquinas de los desarrolladores. Arriésguense con este fascinante desafío.

* **RNF1: (5p)** Lanzar su app web desde docker compose
* **RNF2: (5p)** Integrar db desde docker compose
* **RNF3: (5p)** Lanzar su receptor desde docker compose y conectarlo con un volumen a la app web (o base de datos si lo usara)

#### HTTPS (25%) (15p)

La seguridad es esencial para sus usuarios. Perfectamente podrían falsear el contenido del buscacursos y ustedes no se darían cuenta. Deben lograr que sus usuarios se sientan seguros en su aplicación.

* **RNF1: (7p)** El dominio debe estar asegurado por SSL con Let’s Encrypt.
* **RNF2: (3p)** Debe poder redireccionar HTTP a HTTPS.
* **RNF3: (5p)** Se debe ejecutar el chequeo de expiración del certificado SSL de forma automática 2 veces al día (solo se actualiza realmente si está llegando a la fecha de expiración).

#### Uso de puntos de datos (25%) (15p)

Debe usar las posiciones incluidas en los mensajes y mostrarlas

* **RF1: (9p)** Debe guardar los puntos incluidos en una base de datos, usando una extension especifica para eso (e.g. PostGIS con postgres)
* **RF2: (6p)** Debe mostrar en un mapa los puntos de cada mensaje. Sugerimos usar leaflet para esto. Puede renderizar el sitio en servidor de forma estática
* **RF3: (3p - bonus)** Los puntos deben mostrar el contenido del evento en el mapa

## Recomendaciones

* Lo más importante no es que la aplicación esté funcionando al 100%, sino que el servidor exista y se pueda acceder a la aplicación correctamente. 
* Les sugerimos fuertemente invertir el mínimo de tiempo en la interfaz visual. Al menos para esta entrega basta con que se pueda llevar a cabo las funcionalidades solicitadas. Fíjense en la proporcion entre RNF y RF

### Roadmap sugerido

Para simplificar esta primera entrega, le sugerimos seguir los siguientes pasos

* Ejecute pruebas de concepto para conectarse al cliente MQTT
* Levante un servidor web que pueda leer este output
* Ponga su servicio en un container
* Levante una máquina en AWS EC2 y abra los puertos
* Instale docker en la máquina
* Copie su aplicacion y construya el container
* Corra su servicio

## Entrega

Se les proporcionará un repositorio de Github Classroom donde pueden subir su código e ir registrando sus commits. 

Deben subir el código de su solución junto al archivo de configuración de Nginx (o Traefik u otro) en el repositorio que se les asignará vía github classroom.
También deben entregar el archivo .pem asociado al servidor EC2 para tener los
respectivos accesos y poder realizar una buena corrección.
Además, para poder facilitar la corrección deben generar un README.md que señale:

* Consideraciones generales
* Nombre del dominio
* Método de acceso al servidor con archivo .pem y ssh (no publicar estas credenciales en el repositorio).
* Puntos logrados o no logrados y comentarios si son necesarios para cada aspecto a evaluar en la Parte mínima y en la Parte variable.
* De realizar un tercer requisito variable también explicitar en el readme.

Pueden sobrescribir este README sin problemas o cambiarle el nombre

Además, y como algo muy importante: **ESTÁ ABSOLUTAMENTE PROHIBIDO SUBIR SU ARCHIVO .PEM A SU REPOSITORIO DE GITHUB.** Si hacen esto se les calificará con nota 1. Para esto se les habilitará un buzón de canvas para que nos lo compartan.

Esta entrega es estrictamente individual y será revisada para casos de copia.

## Enlaces relevantes

* https://education.github.com/pack
* https://aws.amazon.com/es/
* [Docker - Instalación](https://docs.docker.com/engine/install/ubuntu/)
* https://www.tutorialspoint.com/docker/docker_compose.htm
* https://phoenixnap.com/kb/ssh-to-connect-to-remote-server-linux-or-windows
* https://www.digitalocean.com/community/tags/deployment?type=tutorials
* https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/
* https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04-es
* https://www.freenom.com/es/index.html?lang=es
* [Youtube - Freenom Tutorial](https://www.youtube.com/watch?v=XvyjIG2F-cs)
* https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/
* [Documentación AWS SES](https://docs.aws.amazon.com/ses/latest/dg/Welcome.html)
* [Documentación de OpenStreetMap]( https://wiki.openstreetmap.org/wiki/API_v0.6)
* [MQTT.js tutorial](https://www.emqx.com/en/blog/mqtt-js-tutorial)

## Ayudantías Útiles

* **Ayudantía 1** - Cloud 1: AWS, Linux y EC2 - 12/08/22
* **Ayudantía 2** - Cloud 2: Docker, Docker-Compose y alternativas - 19/08/22
* **Ayudantía 3** - Cloud 3: Deployment básico - 26/08/22

## Apoyo

Pueden usar el Slack del curso en el canal #E0 para dudas más rápidas
