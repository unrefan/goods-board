# Goods board!

Необходимо разработать REST API для сайта “Доска объявлений”
На сайте пользователи выкладывают товары, которые хотели бы продать. Основные возможности:
-	авторизация
-	регистрация
-	получение/редактирование данных текущего пользователя
-	смена пароля (при этом необходимо указать текущий пароль)
-	поиск и сортировка товаров
-	загружать/удалять изображение для товара
-	поиск пользователей
-	создание/редактирование/удаление товара авторизованным пользователем

Ниже описана документация по API которую необходимо реализовать. Идентификация текущего пользователя происходит по сгенерированному токену, который передается в заголовок Authorization.
Уточнение: В тестовом задании необходимо реализовать только back-end. Будет плюсом наличие Swagger в качестве документации.

Ошибки валидации имеют общий вид:

422, Unprocessable Entity
Body:
[
{
"field":"title",
"message":"Title should contain at least 3 characters"
},
…
]
field - название поля к которому относится ошибка message - сообщение об ошибке

Правила валидации Вы выбираете сами.
Сервер должен быть разработан на node.js + mysql + express.



API

Login user
Request:
POST /api/sessions
Body:
{
“email”: ”email@example.com”,
“password”: “qwerty”
}


Responses:

200, OK
Body:
{
“token”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
}

422, Unprocessable Entity
Body:
[
{
"field":"title",
"message":"Title should contain at least 3 characters"
},
…
]


2. Register
   Request:
   POST /api/users
   Body:
   {
   “phone”: “+380xxxxxxxxx”, // optional
   “name”: “Alex”,
   “email”: “alex@mail.com”,
   “password”:”qwerty”,
   }
   Responses:
   200, OK
   Body:
   {
   “token”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
   }

422, Unprocessable Entity
Body:
[
{
"field":"title",
"message":"Title should contain at least 3 characters"
},
…
]



3. Get current user
   Request:

GET /api/users/me
Headers:
{
“Authorization”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
}

Responses:

200, OK
Body:
{
“id”: 1,
“phone”: “+380xxxxxxxxx”,
“name”: “Alex”,
“email”: “alex@mail.com”
}

401, Unauthorized
Body: empty


4. Update current user
   Request: PUT /api/users/me
   Headers:
   {
   “Authorization”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
   }

Body:
{
“phone”: “+380xxxxxx”, //optional
“name”: “Alex”, //optional
“email”: “alex@gmail.com”, //optional
“currentPassword”: “qweery” //optional
“newPassword”: “123456” //required if currentPassword not empty
}


Responses:

200, OK
Body:
{
“id”: 1,
“phone”: “+380xxxxxxxxx”,
“name”: “Alex”,
“email”: “alex@mail.com”
}

422, Unprocessable Entity
Body:
[
{
"field":"title",
"message":"Title should contain at least 3 characters"
},
…
]

401, Unauthorized
Body: empty




5. Get user by ID
   Request:

GET /api/users/<id>

Headers:
{
“Authorization”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
}


Responses:

200, OK
Body:
{
“id”: 1,
“phone”: “+380xxxxxxxxx”,
“name”: “Alex”,
“email”: “alex@mail.com”
}


404, Not found
Body: empty



6. Search users
   Request:

GET /api/users?name=Alex&email=alex@mail.com
Params:
name - (optional)
email - (optional)
Responses:

		200, OK
Body:
[
{
“id”: 1,
“phone”: “+380xxxxxxxxx”,
“name”: “Alex”,
“email”: “alex@mail.com”
}
...
]

7. Search items
   Request:

GET /api/items?title=notebook&userId=1&orderBy=createdAt& orderType=desc

Params:
title - (optional)
userId - (optional)
orderBy - [price|createdAt] (optional, default=createdAt)
orderType - [asc|desc] (optional, default=desc)
Responses
200, OK
Body:
[
{
“id”: 1,
“createdAt”: <timestamp in seconds>,
“title”: “Notebook”,
“price”: 5500.00,
“image”: “http://example.com/images/**/*.jpg”,
“user_id”: 12,
“user”: {
“id”: 1,
“phone”: “+380xxxxxxxxx”,
“name”: “Alex”,
“email”: “alex@mail.com”
}
},
...
]


8. Get item by ID
   Request:

GET /api/items/<id>
Responses:

200, OK
Body:

{
“id”: 1,
“createdAt”: <timestamp in seconds>,
“title”: “Notebook”,
“price”: 5500.00,
“image”: “http://example.com/images/**/*.jpg”,
“user_id”: 12,
“user”: {
“id”: 1,
“phone”: “+380xxxxxxxxx”,
“name”: “Alex”,
“email”: “alex@mail.com”
}
}



404, Not found
Body: empty



9. Update item
   Request:

PUT /api/items/<id>
Headers:
{
“Authorization”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
}

Body:
{
“title”: “Notebook”, //optional
“price”: 5500.00, //optional
}

Responses:

200, OK
Body:
{
“id”: 1,
“createdAt”: <timestamp in seconds>,
“title”: “Notebook”,
“price”: 5500.00,
“image”: “http://example.com/images/**/*.jpg”,
“user_id”: 12,
“user”: {
“id”: 1,
“phone”: “+380xxxxxxxxx”,
“name”: “Alex”,
“email”: “alex@mail.com”
}
}


422, Unprocessable Entity
Body:
[
{
"field":"title",
"message":"Title should contain at least 3 characters"
},
...
]

404, Not found
Body: empty

403, Forbidden
Body: empty

401, Unauthorized
Body: empty


10. Delete item
    Request:
    DELETE /api/item/<id>

Headers:
{
“Authorization”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
}

Responses:

200, OK
Body: empty

404, Not found

Body: empty

403, Forbidden
Body: empty

401, Unauthorized
Body: empty


11. Create item
    Request:

POST /api/items
Headers:
{
“Authorization”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
}

Body:

{
“title”: “Notebook”, //required
“price”: 5500.00, //required
}


Responses:
200, OK
Body:
{
“id”: 1,
“createdAt”: <timestamp in seconds>,
“title”: “Notebook”,
“price”: 5500.00,
“image”: “http://example.com/images/**/*.jpg”,
“user_id”: 12,
“user”: {
“id”: 1,
“phone”: “+380xxxxxxxxx”,
“name”: “Alex”,
“email”: “alex@mail.com”
}
}


422, Unprocessable Entity
Body:
[
{
"field":"title",
"message":"Title is required"
},
…
]

404, Not found
Body: empty

403, Forbidden
Body: empty

401, Unauthorized
Body: empty



12. Upload item image
    Request:

POST /api/items/<id>/image
Headers:
{
“Authorization”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
“Content-Type”: “multipart/form-data”
}

Body:
file=<file>
Responses:

200, OK
Body:
{
“id”: 1,
“createdAt”: <timestamp in seconds>,
“title”: “Notebook”,
“price”: 5500.00,
“image”: “http://example.com/images/**/*.jpg”,
“user_id”: 12,
“user”: {
“id”: 1,
“phone”: “+380xxxxxxxxx”,
“name”: “Alex”,
“email”: “alex@mail.com”
}
}


422, Unprocessable Entity
Body:
[
{
"field":"image",
"message":"The file {file} is too big. "
},
…
]

404, Not found
Body: empty

403, Forbidden
Body: empty

401, Unauthorized
Body: empty


13. Remove item image
    Request:

DELETE /api/items/<id>/image

Headers:
{
“Authorization”: “3f5uh29fh3kjhpx7tyuioiugfvdfr9j8wi6onjf8”
}

Responses:

200, OK
Body: empty

404, Not found
Body: empty

403, Forbidden
Body: empty

401, Unauthorized
Body: empty