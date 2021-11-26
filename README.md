# simple-crud-api
Simple CRUD API

To run project open your terminal and execute next steps:

1. Clone the project:
   `git clone git@github.com:artur-nikitsin/simple-crud-api.git`

2. Enter to the root project directory:
   `cd simple-crud-api`

3. Checkout to develop branch:
   `git checkout develop`

4. Make sure that your port 3000 is free or set another port on .env file
5. Make sure that your current Node version is 16.13.0

6. To start server execute next command:
- for development mode:
   `npm run start:dev` or `yarn start:dev`
- for production mode:
    `npm run start:prod` or `yarn start:prod`

To start e2e testing execute:
  `npm run e2e-test` or `yarn e2e-test`


**Implemented functional in accordance with task:**
* **GET** `/person`:
    * Сервер возвращает статус код 200 и все записи
* **GET** `/person/{personId}`:
    * Сервер возвращает статус код 200 и запись с `id === personId`, если такая запись есть
    * Сервер возвращает статус код 400 и соответствующее сообщение, если `personId` невалиден (не `uuid`)
    * Сервер возвращает статус код 404 и соответствующее сообщение, если запись с `id === personId` не найдена
* **POST** `/person`
    * Сервер возвращает статус код 201 и свежесозданную запись
    * Сервер возвращает статус код 400 и соответствующее сообщение, если тело запроса не содержит обязательных полей
* **PUT** `/person/{personId}`
    * Сервер возвращает статус код 200 и обновленную запись
    * Сервер возвращает статус код 400 и соответствующее сообщение, если `personId` невалиден (не `uuid`)
    * Сервер возвращает статус код 404 и соответствующее сообщение, если запись с `id === personId` не найдена
* **DELETE** `/person/{personId}`
    * Сервер возвращает статус код 204 если запись найдена и удалена
    * Сервер возвращает статус код 400 и соответствующее сообщение, если `personId` невалиден (не `uuid`) 
    * Сервер возвращает статус код 404 и соответствующее сообщение, если запись с `id === personId` не найдена
