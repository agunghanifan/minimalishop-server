# ecommerce-server
API server untuk e-commerce website

##API DOCUMENTATIONS

This app has:
1. RESTfull endpoints
2. CRUD operations
3. JSON formatted sessions

THIS app has dependency:
1. Express JS Framework
2. PostgreSQL
3. Sequelize ORM
4. JSON Web Token JS
5. Bcrypt JS
6. Cors JS
7. dotenv JS

THIS app has dev dependency:
1. Jest JS

Endpoints List:
1. POST /login
2. GET /products
3. POST /addproduct
4. GET /product/:id
5. PUT /product/:id
6. DELETE /product/:id
7. GET /banners
8. POST /addbanner
9. PUT /banner/:id
10. DELETE /banner/:id

## RESTful Endpoints

### GLOBAL Response
- Response (401) UNAUTHORIZE
``` JSON
    [
        {
            "message": [
                "Unauthorize User"
            ]
        },
    ]
```

- Response (500) Internal Server Error
``` JSON
    [
        {
            "message": [
                "Internal Server Error"
            ]
        },
    ]
```

- Response (404) Bad Request
``` JSON
    [
        {
            "message": "Data not Found"
        },
    ]
```

### POST /login
- Request Header
```JSON
    not needed        
```

- Request body
```JSON
    {
        "email": "email string",
        "password": "password string",
    }
```

- Response (200) Ok
```JSON
    {
        "id": number,
        "name": "name string",
        "email": "email string",
        "access_token": "sdfuJLKUIOEURndmsafk7348274 string",
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Email / Password wajib diisi"
            ]
        },
    ]
```

- Response (401) Unauthorized
``` JSON
    [
        {
            "message": [
                "Email / Password is wrong, try again."
            ]
        },
    ]
```

### GET /products
- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```
    not needed
```

- Response (200) Ok
```JSON
    [
        {
            "id": number,
            "name": "name string",
            "image_url": "image_url string",
            "price": number,
            "stock": number,
            "category": "category string",
        },
    ]
```

### POST /addproduct
- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```JSON
    [
        {
            "name": "name string",
            "image_url": "image_url string",
            "price": number,
            "stock": number,
            "CategoryId": number,
        },
    ]
```

- Response (201) Created
```JSON
    {
        "id": number,
        "name": "name string",
        "image_url": "image_url string",
        "price": number,
        "stock": number,
        "CategoryId": number,
        "updatedAt": "2021-03-11T02:48:47.400Z" date,
        "createdAt": "2021-03-11T02:48:47.400Z" date,
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Name is required",
                "Image URL is required",
                "Price is required",
                "Stock is needed",
            ]
        },
    ]
```

### PUT /product/:id
- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```JSON
    [
        {
            "name": "name string",
            "image_url": "image_url string",
            "price": number,
            "stock": number,
            "CategoryId": number,
        },
    ]
```

- Response (200) Ok
```JSON
    {
        "id": number,
        "name": "name string",
        "image_url": "image_url string",
        "price": number,
        "stock": number,
        "CategoryId": number,
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Name is required",
                "Image URL is required",
                "Price is required",
                "Stock is needed",
            ]
        },
    ]
```

### GET /product/:id
- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```
    not needed
```

- Response (200) Ok
```JSON
    [
        {
            "name": "name string",
            "image_url": "image_url string",
            "price": number,
            "stock": number,
            "CategoryId": number,
        },
    ]
```

### DELETE /product/:id
- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```
- Request body
```
    not needed
```

- Response (200) Ok
```JSON
    {
        "message": "product deleted"
    }
```

### GET /banners
- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```
    not needed
```

- Response (200) Ok
```JSON
    [
        {
            "id": number,
            "title": "title string",
            "image_url": "image_url string",
            "status": "status string",
        },
    ]
```

### POST /addbanner
- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```JSON
    [
        {
            "title": "title string",
            "image_url": "image_url string",
            "status": "status string",
        },
    ]
```

- Response (201) Created
```JSON
    [
        {
            "id": number,
            "title": "title string",
            "image_url": "image_url string",
            "status": "status string",
            "updatedAt": "2021-03-11T02:48:47.400Z" date,
            "createdAt": "2021-03-11T02:48:47.400Z" date,
        },
    ]
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Title is required",
                "Image URL is required",
                "Status is required",
            ]
        },
    ]
```


### PUT /banner/:id
- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```

- Request body
```JSON
    [
        {
            "title": "title string",
            "image_url": "image_url string",
            "status": "status string",
        },
    ]
```

- Response (200) Ok
```JSON
    {
        "id": number,
        "title": "title string",
        "image_url": "image_url string",
        "status": "status string",
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Title is required",
                "Image URL is required",
                "Status is required",
            ]
        },
    ]
```

### DELETE /banner/:id

- Request Header
```JSON
    [
        {
            "headers" : "access_token"
        }
    ]      
```
- Request body
```
    not needed
```

- Response (200) Ok
```JSON
    {
        "message": "banner deleted"
    }
```












