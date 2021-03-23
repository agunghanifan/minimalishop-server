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
2. POST /loginCustomer
3. POST /register
4. GET /products
5. POST /addproduct
6. GET /product/:id
7. PUT /product/:id
8. DELETE /product/:id
9. GET /banners
10. POST /addbanner
11. PUT /banner/:id
12. DELETE /banner/:id
13. GET /carts
14. POST /addtocarts/:idProduct
15. DELETE /carts/:id
16. PATCH /carts/:id/checkout
17. PATCH /carts/:id/:operator

## RESTful Endpoints

### GLOBAL Response
- Response (401) UNAUTHORIZE
``` JSON
    {
        "message": "Unauthorize User"
    },
```

- Response (500) Internal Server Error
``` JSON
    {
        "message": "Internal Server Error"
    },
```

- Response (404) Bad Request
``` JSON
    {
        "message": "Data not Found"
    },
```

### POST /login
routes to login role admin
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

- Response Global (500) Internal Server Error

### POST /loginCustomer
routes to login role customer
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
        "role": "role string"
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

- Response Global (401) Unauthorized
``` JSON
    [
        {
            "message": [
                "Email / Password is wrong, try again."
            ]
        },
    ]
```

- Response Global (500) Internal Server Error

### POST /register
routes to register role customer
- Request Header
```JSON
    not needed        
```

- Request body
```JSON
    {
        "name": "name string",
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
        "password": "passwordhash string",
        "role": "customer string"
    }
```

- Response (400) Bad Request
``` JSON
    [
        {
            "message": [
                "Name is required",
                "Email is required",
                "Email must be unique",
                "Password is required",
                "Password must be at least 6 characters"
            ]
        }
    ]
```

- Response Global (500) Internal Server Error

### GET /products
routes to get all product to show on main dashboard admin
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

- Response Global (401) Unauthorized
- Response Global (500) Internal Server Error

### POST /addproduct
routes to add new product to database
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

- Response Global (401) Unauthorized
- Response Global (500) Internal Server Error

### PUT /product/:id
routes edit selected product with specific ID product
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

- Response Global (401) Unauthorized
- Response Global (500) Internal Server Error

### GET /product/:id
routes to show and fill the edit forms in client admin
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

- Response Global (401) Unauthorized
- Response Global (500) Internal Server Error

### DELETE /product/:id
routes to delete specific product with ID the product
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

- Response Global (401) Unauthorized
- Response Global (500) Internal Server Error

### GET /banners
routes to show all banners in database to client admin
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

- Response Global (401) Unauthorized
- Response Global (500) Internal Server Error

### POST /addbanner
routes to add new banner to database
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

- Response Global (401) Unauthorized
- Response Global (500) Internal Server Error


### PUT /banner/:id
edit banner with specific id
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

- Response Global (401) Unauthorized
- Response Global (500) Internal Server Error

### DELETE /banner/:id
delete banner with specific id
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

- Response Global (401) Unauthorized
- Response Global (500) Internal Server Error

### GET /carts
show all carts in specified User ID

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
        "id": 12 integer,
        "productId": 27 integer,
        "userId": 6 integer,
        "amount": 1 integer,
        "createdAt": "2021-03-23T16:36:26.354Z" date,
        "updatedAt": "2021-03-23T16:36:26.354Z" date,
        "Product": {
            "id": 27 integer,
            "name": "Air Jordan XXXV string" string,
            "image_url": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto/b9f5e4ed-fc6f-4f76-ac65-a6338655ec60/air-jordan-xxxv-basketball-shoe-0l5NqD.jpg" string,
            "price": 4576547 integer,
            "stock": 1 integer,
            "CategoryId": 2 integer,
            "createdAt": "2021-03-21T03:44:14.445Z" date,
            "updatedAt": "2021-03-23T16:39:50.332Z" date
        }
    }
```
- Response Global (401) UNAUTHORIZE
- Response Global (500) Internal Server Error

### POST /addtocarts/:idProduct
add product to carts specified user Id

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
        "id": 12 integer,
        "productId": 27 integer,
        "userId": 6 integer,
        "updatedAt": "2021-03-23T16:36:26.354Z" date,
        "createdAt": "2021-03-23T16:36:26.354Z" date,
        "amount": 1
    },
    true boolean
```

-- Response (400) Bad Request

```JSON
    {
        "message": "Product tersebut sudah ada di dalam Carts"
    },
```

-- Response (400) Bad Request

```JSON
    {
        "message": "Product stock tidak tersedia untuk sekarang"
    },
```
-- Response Global (500) Internal Server Error


### DELETE /carts/:id
delete specified carts with authorize by user id and cart id

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
        "message": "Cart's has been deleted"
    }
```

- Response Global (500) Internal Server Error


### PATCH /carts/:id/checkout
checkout product in specified cart

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
        "message": "Product Stock berhasil di update (pengurangan) dan Cart telah dihapus"
    }
```

- Response (404) Not Found
```JSON
    {
        "message": "Jumlah Product melebihi stock, silahkan kurangi jumlahnya sesuai stock yang tersedia"
    }
```

- Response Global (500) Internal Server Error


### PATCH /carts/:id/:operator
add or reduce amount of cart product amount

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
for add amount
```JSON
    {
        "message": "Jumlah product dalam cart berhasil ditambahkan"
    }
```

- Response (200) Ok
for reduce amount
```JSON
    {
        "message": "Jumlah product dalam cart berhasil dikurangi"
    }
```

- Response (400) Bad Request
for add amount
```JSON
    {
        "message": "Jumlah cart tidak bisa dikurangi, silahkan klik tombol delete untuk membatalkan cart"
    }
```

- Response (400) Bad Request
for delete amount
```JSON
    {
        "message": "Jumlah cart melebihi stock product, kurangi stock untuk dapat menambahkan product"
    }
```

- Response (404) Not Found
```JSON
    {
        "message": "Operator perhitungan tidak ditemukan
    }
```

- Response Global (500) Internal Server Error
