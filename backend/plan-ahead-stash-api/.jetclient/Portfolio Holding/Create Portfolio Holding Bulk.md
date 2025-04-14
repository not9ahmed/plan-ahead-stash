```toml
name = 'Create Portfolio Holding Bulk'
method = 'POST'
url = 'http://localhost:8080/api/portfolios/10/holdings/bulk'
sortWeight = 4000000
id = 'd0ace950-a656-40bf-99dc-5e5c3c83a5f2'

[body]
type = 'JSON'
raw = '''
[
  {
    "portfolio": {
      "id": 10
    },
    "asset": {
      "id": 2
    },
    "quantity": 20,
    "purchasePrice": 1000.10,
    "purchaseDate": "2025-02-02T20:19:46.298+00:00"
  },
  {
    "portfolio": {
      "id": 10
    },
    "asset": {
      "id": 2
    },
    "quantity": 20,
    "purchasePrice": 1000.10,
    "purchaseDate": "2025-02-02T20:19:46.298+00:00"
  }
]'''
```
