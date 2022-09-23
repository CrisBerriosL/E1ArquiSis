# 2022-1 / IIC2173 - E0 | Smart cities

## Detalles

Se resolvió la tarea creando una aplicación web con express, una conexión al broker con una aplicación node, una base de datos postgres para guardar la información de los eventos y de los usuarios, un reverse-proxy configuardo con nginx, y certificación https utilizando Lets Encrypt / Certbot.

Cada servicio se encuentra en un contenedor de docker distinto, y todos se pueden levantar usando docker compose.

El servicio quedó deployado en una instancia EC2 de AWS, al que se puede acceder usando los dominios www.smartycities.tk y smartycities.tk .

El comando para iniciar el código es ```sudo docker compose up -d``` desde la carpeta /home/ubuntu/Entrega0 de la instancia EC2.

Para acceder a la instancia por ssh, correr el comando ```ssh -i <.pem key path> ubuntu@ec2-44-208-247-178.compute-1.amazonaws.com``` .

A continuación listo todos los requisitos de la entrega, indicando ✔ si se cumplió (y los comentarios respectivos), y ✖ si no se cumplió.

## Requisitos

### Requisitos funcionales (10p)

* ✔ **RF2: (5p)** ***Esencial*** Debe poder ofrecer en un sitio web la lista de todos los eventos que se han generado en el broker a medida que se vayan recibiendo
  
    Se puede acceder al sitio web en www.smartycities.tk o smartycities.tk , donde se listan los eventos, y se puede ver que si se recarga la página después de unos 20 segundos llegó un nuevo evento.

* ✔ **RF3: (5p)** Se puede crear cuentas de usuario con mail, datos de contacto, nick y contraseñas. Se puede iniciar sesión con las cuentas creadas.
  
    Se puede crear cuentas con los datos pedidos, posteriormente iniciar sesión, y se logró mantener la sesión iniciada utilizando passport.

### Requisitos no funcionales (20p)

* ✔ **RNF1: (5p)** ***Esencial*** Debe poder conectarse al broker mediante el protocolo MQTT usando un daemon que corra de forma constante (puede usar *nohup* u otro método). Se le facilitarán credenciales para conectarse al broker (*hint*: use un archivo simple de intermediario)
    
    Para esto se creó una aplicación de node.js en un contenedor de docker dedicado a la conexión utilizando MQTT. El código se encuentra en la carpeta /mqtt-connection del repositorio.

* ✔ **RNF1: (3p)** Debe haber un proxy inverso (como Nginx o Traefik) configurado.
    
    Se utilizó Nginx en un contenedor de docker, con su archivo de configuraciones en /nginx/nginx.conf

* ✔ **RNF2: (2p)** El servidor debe tener un nombre de dominio de primer nivel (tech, me, tk, ml, ga, com, cl, etc)
    
    Se encuentra en el dominio www.smartycities.tk smartycities.tk

* ✔ **RNF3: (2p)** ***Esencial*** El servidor debe estar corriendo en EC2
* ✔ **RNF4: (4p)** Debe haber una base de datos Postgres o Mongo externa asociada a la aplicación para guardar usuarios y consultarlos.

    Se usó una base de datos Postgres en un contenedor de docker. La aplicación web (en su propio contenedor) y la aplicación de conexión al broker se conectan a la base de datos utilizando Sequelize

* ✔ **RNF5: (4p)** ***Esencial*** El servicio debe estar dentro de un container Docker.

### Variables

#### Docker-Compose (25%) (15p)

Componer servicios es esencial para obtener entornos de prueba confiables, especialmente en las máquinas de los desarrolladores. Arriésguense con este fascinante desafío.

* ✔ **RNF1: (5p)** Lanzar su app web desde docker compose
* ✔ **RNF2: (5p)** Integrar db desde docker compose
* ✔ **RNF3: (5p)** Lanzar su receptor desde docker compose y conectarlo con un volumen a la app web (o base de datos si lo usara)

#### HTTPS (25%) (15p)

La seguridad es esencial para sus usuarios. Perfectamente podrían falsear el contenido del buscacursos y ustedes no se darían cuenta. Deben lograr que sus usuarios se sientan seguros en su aplicación.

* ✔ **RNF1: (7p)** El dominio debe estar asegurado por SSL con Let’s Encrypt.

    Se utilizó un contenedor de docker con la imagen certbot/certbot para generar los certificados de la página. Para esto me guié por la siguiente guía https://www.programonaut.com/setup-ssl-with-docker-nginx-and-lets-encrypt/

* ✔ **RNF2: (3p)** Debe poder redireccionar HTTP a HTTPS.
* ✔ **RNF3: (5p)** Se debe ejecutar el chequeo de expiración del certificado SSL de forma automática 2 veces al día (solo se actualiza realmente si está llegando a la fecha de expiración).
  
    Se creó un cronjob para realizar este procedimiento cada 12 horas. Si desde la terminal de la instancia se corre el comando ```crontab -e``` se puede ver los comandos que se corren. Son los siguientes

    ```0 */12 * * * sudo docker compose -f /home/ubuntu/Entrega0/docker-compose.yml up -d certbot```

    ```0 */12 * * * sudo docker compose -f /home/ubuntu/Entrega0/docker-compose.yml restart nginx```

    El primero levanta el contenedor de certbot, que corre el comando ```certbot renew```, que revisa si los certificados están por expirar, y los regenera solamente si están cercanos a su expiración (menos de 30 días).

    El segundo comando reinicia el contenedor nginx, para que en el caso que se hayan renovado los certificados, estos sean cargados por la configuración de nginx.

    Con el comando ```sudo docker logs --timestamps certbot``` se puede comprobar que efectivamente cada 12 horas se revisan los certificados.

#### Uso de puntos de datos (25%) (15p)

Debe usar las posiciones incluidas en los mensajes y mostrarlas

* ✖ **RF1: (9p)** Debe guardar los puntos incluidos en una base de datos, usando una extension especifica para eso (e.g. PostGIS con postgres)
* ✖ **RF2: (6p)** Debe mostrar en un mapa los puntos de cada mensaje. Sugerimos usar leaflet para esto. Puede renderizar el sitio en servidor de forma estática
* ✖ **RF3: (3p - bonus)** Los puntos deben mostrar el contenido del evento en el mapa