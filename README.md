# NestJS Project. Step_3.
#### Typescrypt, TypeORM

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

В проекте реализованы:
- авторизация, регистрация и работа с ролями;
- работа с профилем, CRUD-операции с данными профиля;
- работа с текстовыми блоками;
- модуль по работе с файлами.

## EER-Diagram DB
<p align="center">
  <img src="./eer_NestJs_step3.png" width="650" alt="EER-diagram" /></a>
</p>

## Installation

```bash
$ npm install
```

## Running the app
1. Предварительно создать файл .development.env (или добавить данные в .production.env) и базу данных. 
2. Путь документации http://&lt;HOST:PORT&gt;/api/docs
3. Доступные операции:
   * Регистрация + авторизация пользователя.
   * Работа с ролями (только для администратора): добавление ролей, удаление.
   * Работа со списком пользователей: получение данных пользователя/пользователей (для авторизованных), изменение данных профиля (для админа), удаление пользователя (для админа).
   * Работа с текстовыми блоками: добавление блока (только для авторизованных пользователей), получение данных по query параметрам (поиск по индивидуальному ключу, по группе), изменение и удаление (только для админа).
   * Работа с файлами: добавление (только для авторизованных), удаление файлов (только для администратора).
 4. Проверка запросов через Postman. Готовый файл NestJs Project.postman_collection.json.
```bash
# development
$ npm run start 

# watch mode
$ npm run start:dev 

# production mode
$ npm run start:prod
```
