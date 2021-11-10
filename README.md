Consigna:

Arrancar dos instancias del servidor en el que venimos trabajando utilizando PM2 modo fork (sin -i max).

Las dos instancias estarán: una en el puerto 8081 modo fork (parámetro línea de comandos en FORK: cluster interno deshabilitado) y la otra en 8082 modo cluster (parámetro línea de comandos en CLUSTER: cluster interno habilitado). Ambas estarán en modo watch.

Configurar un servidor Nginx para que las rutas entrantes /info y /randoms por el puerto 80 de Nginx se deriven a esas dos instancias, recibiendo la del modo cluster cuatro veces más de tráfico que la instancia en modo fork.

Verificar en la ruta de info, el puerto y el pid de atención y el correcto funcionamiento del balanceador de carga implementado en Nginx. Comprobar que la ruta randoms funcione adecuadamente.

