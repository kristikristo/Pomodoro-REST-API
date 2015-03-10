# README #

The repository for the Node.JS + Express Server REST API platform.

**Code in not maintained since Pomodoro is not using this REST API anymore (switched to Parse)**

## Documentation ##

- *Content-Type: application/json*.  
- Authorization : Bearer SESSION_ID for private endpoints  
- http://piceria--api-herokuapp-com-oa8jngxn4qes.runscope.net/  

#### GET /api/products ####
Retrieve the list of all products

Response (array of objects)
```json
[
	{
		"_id": "53f29dc50170ff3337000002",
		"photo": "http://www.google.com",
		"ingredients": "Djath, Mocarela",
		"description": "Pica margarita perbehet nga blablabla",
		"name": "Pizza Margarita",
		"type": "pizza",
		"__v": 0,
		"created_at": "2014-08-19T00:43:49.581Z",
		"updated_at": "2014-08-19T00:43:49.580Z",
		"sizes": {
			"large": 500,
			"medium": 350
		}
	},
]
```

#### GET /api/products/:product_id ####
Retrieve information about a specific product

Respone
```json
{
	"_id": "53f29dc50170ff3337000002",
	"photo": "http://www.google.com",
	"ingredients": "Djath, Mocarela",
	"description": "Pica margarita perbehet nga blablabla",
	"name": "Pizza Margarita",
	"type": "pizza",
	"__v": 0,
	"created_at": "2014-08-19T00:43:49.581Z",
	"updated_at": "2014-08-19T00:43:49.580Z",
	"sizes": {
	"large": 500,
	"medium": 350
}
```

#### GET /api/products/type/:product_type ####
Retrieve products by their type (sandwich/pizza) 
Response is the same as the above examples

#### GET /api/products/type/:product_type/limit/:limit_number ####
Retrieve product list based on the limit number (usually 4) and product type (Pizza/Sandwich) 
Response is the same as the above examples

#### GET /api/products/price/:product_id/:pizza_size ####
Get the price for the product based on the size (medium/large)

Respone
```json
{
	"price": 350
}
```

#### POST /api/internal/products ####
Post a new product. **Endpoint will be deleted**

#### GET /api/ingredients ####
Retrieve the list of available ingredients

Respone
```json
{
	"meat": {
		"x": 35,
		"y": 25
	},
	"premium_meat": {
		"x": 24,
		"y": 20
	},
	"vegetables": {
		"a": 10,
		"b": 20
	}
}
```

#### GET /api/ingredients/price/:cat/:ingredient ####
Retrieve the price for a specific ingredient based on his category

Respone
```json
{
	"price": 350
}
```

#### GET /api/orders/list ####
Retrieve the list of orders done by the user. Will require user session.

#### GET /api/orders/check/:tracking_code ####
Retrieve the status of the order

You can test the existing endpoints at *heroku*  
http://piceria-api.herokuapp.com/

For debugging:  
*http://piceria--api-herokuapp-com-oa8jngxn4qes.runscope.net/*