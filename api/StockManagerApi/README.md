# Stock Manager Api

The API is written with ASP.NET Core.

## Deployment

To build this project run

```bash
dotnet build
dotnet publish -c Release -o ../Release
```
To run the build run

```bash
cd ../Release
dotnet StockManagerApi.dll
```

## API Endpoints

- [User](#user)
  - [Register](#register)
  - [Login](#login)
  - [Get user status](#get-user-status)
- [Company](#company)
  - [Create a company](#create-a-company)
  - [Delete a company](#delete-a-company)
  - [Update a company](#update-a-company)
  - [Get all user companies](#get-all-user-companies)
- [Warehouse](#warehouse)
  - [Create a warehouse](#create-a-warehouse)
  - [Update a warehouse](#update-a-warehouse)
  - [Delete a warehouse](#delete-a-warehouse)
  - [Get all company warehouses](#get-all-company-warehouses)
- [Reference](#reference)
  - [Create a reference](#create-a-reference)
  - [Update a reference](#update-a-reference)
  - [Delete a reference](#delete-a-reference)
  - [Get all company references](#get-all-company-references)
- [Article](#article)
  - [Create an article](#create-an-article)
  - [Update an article](#update-an-article)
  - [Delete an article](#delete-an-article)
  - [Get all warehouse articles](#get-all-warehouse-articles)
- [Sale](#sale)
  - [Create a sale](#create-a-sale)

### User

#### Register

```http
POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The username |
| `password` | `string` | **Required**. The password |

#### Login

```http
POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username` | `string` | **Required**. The username |
| `password` | `string` | **Required**. The password |

Set session cookie on successful login.

#### Get user status
```http
GET /api/auth/status
```
Returns the id and username of the user if logged in.
```JSON
{
    "id": 0,
    "username": "string"
}
```

### Company

#### Create a company
```http
POST /api/companies/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. Name of the company |

#### Delete a company
```http
POST /api/companies/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `companyId` | `int` | **Required**. ID of the company |

#### Update a company
```http
POST /api/companies/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `companyId` | `int` | **Required**. ID of the company |
| `newName` | `string` | **Required**. The new name of the company |

#### Get all user companies
```http
GET /api/companies/get
```

Return an array of companies
```JSON
[
  {
    "id": 0,
    "name": "string"
  }
]
```

### Warehouse

#### Create a warehouse
```http
POST /api/warehouses/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name` | `string` | **Required**. The name of the warehouse |
| `id_Company` | `int` | **Required**. The id of the company that owns the warehouse |

#### Update a warehouse
```http
POST /api/warehouses/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `idWarehouse` | `int` | **Required**. The ID of the warehouse |
| `name` | `string` | **Required**. The new name of the warehouse |

#### Delete a warehouse
```http
POST /api/warehouses/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `idWarehouse` | `int` | **Required**. The ID of the warehouse |

#### Get all company warehouses
```http
GET /api/warehouses/get?companyId={companyId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `companyId` | `int` | **Required**. The ID of the company |

Returns an array of warehouses
```JSON
[
  {
    "id": 0,
    "name": "string",
    "id_Company": 0
  }
]
```

### Reference

#### Create a reference
```http
POST /api/reference/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `reference` | `object` | **Required**. The reference object |
| `companyId` | `int` | **Required**. The company ID |

The reference object should have the following properties:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `barcode_value` | `string` | **Required**. The barcode value of the reference |
| `name` | `string` | **Required**. The name of the reference |
| `price` | `float` | **Required**. The price of the reference |

#### Update a reference
```http
POST /api/reference/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**. The ID of the reference |
| `barcode_value` | `string` | **Required**. The new barcode value of the reference |
| `name` | `string` | **Required**. The new name of the reference |
| `price` | `float` | **Required**. The new price of the reference |

#### Delete a reference
```http
POST /api/reference/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `companyId` | `int` | **Required**. The ID of the company |
| `referenceId` | `int` | **Required**. The ID of the reference |


#### Get all company references
```http
GET /api/reference/get?companyId={companyId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `companyId` | `int` | **Required**. The ID of the company |

Returns an array of warehouses
```JSON
[
  {
    "id": 0,
    "barcode_value": "string",
    "name": "string",
    "price": 0
  }
]
```

### Article

#### Create an article
```http
POST /api/article/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_Reference` | `int` | **Required**. The ID of the reference |
| `id_Warehouse` | `int` | **Required**. The ID of the warehouse |
| `expiration` | `date` | **Not required**. The expiration date |

#### Update an article
```http
POST /api/article/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**. The ID of the article |
| `expiration` | `date` | **Not required**. The new expiration date |

#### Delete an article
```http
POST /api/article/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_Article` | `int` | **Required**. The ID of the article |

#### Get all warehouse articles
```http
GET /api/article/get?idWarehouse={idWarehouse}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `idWarehouse` | `int` | **Required**. The ID of the warehouse |

Returns an array of warehouses
```JSON
[
  {
    "id": 0,
    "id_Reference": 0,
    "id_Warehouse": 0,
    "expiration": "2023-05-09T20:12:58.09",
    "name": "string",
    "price": 0
  }
]
```

### Sale

#### Create a sale
```http
POST /api/sale/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id_Company` | `int` | **Required**. The ID of the company |
| `articles` | `object` | **Required**. The array of sold articles |

The articles object should have the following properties:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id` | `int` | **Required**. The ID of the article |
| `id_Reference` | `object` | **Required**. The ID of the article reference |