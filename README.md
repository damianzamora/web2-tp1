Nombre: Zamora Damian 

Examen Parcial 1 – Programación Web II

Objetivo: 
Desarrollar una aplicación web completa (frontend + consumo de API) que implemente un 
CRUD (Create, Read, Update, Delete) utilizando promesas con fetch o la librería axios, 
interactuando con un endpoint creado por ustedes en MockAPI. El tema del CRUD es libre pero 
no se pueden utilizar usuarios / productos genéricos, elegir un tema específico. Deberá estar 
correctamente representado en el frontend y backend. 

## Tema elegido:
Se crea un e-commerce de tienda de video juegos el cual muestra los productos en su index.html y tiene una seccion admin.html el cual permite dar de alta juegos como tambien modificarlos o eliminarlos.
Se conecta a una api alojada en mockApi, y su conexion se hace mediante la libreria AXIOS.

URL endpoint mockApi : 
https://mockapi.io/clone/68c56790a712aaca2b68ad09

## Colecciones de postman

Get All games
``curl --location 'https://68c56790a712aaca2b68ad08.mockapi.io/api/parcial1/games'``

Delete game by Id
``curl --location --request DELETE 'https://68c56790a712aaca2b68ad08.mockapi.io/api/parcial1/games/4' \
--data ''``

Put game
``curl --location --request PUT 'https://68c56790a712aaca2b68ad08.mockapi.io/api/parcial1/games/4' \
--header 'Content-Type: application/json' \
--data '{
    "name": "FIFA 17",
    "platform": "PS5",
    "price": 100,
    "description": "Simulador de futbol mejor catalogado de la historia.",
    "img": "https://img.redbull.com/images/c_limit,w_1500,h_1000/f_auto,q_auto/redbullcom/2016/09/20/1331818914269_2/fifa-17-marco-reus",
    "id": "2",
    "genero": "Other"
}'``

## Capturas de pantalla 

index.html

<img width="1877" height="860" alt="image" src="https://github.com/user-attachments/assets/5416f030-1e47-4745-9848-6ecac6661697" />

admin.html

<img width="1893" height="803" alt="image" src="https://github.com/user-attachments/assets/10e7581b-395a-4699-b9cd-5f08591be3df" />

Data en mockApi

<img width="763" height="850" alt="image" src="https://github.com/user-attachments/assets/280e6c28-9142-4684-a6b9-3e576fef28b5" />


