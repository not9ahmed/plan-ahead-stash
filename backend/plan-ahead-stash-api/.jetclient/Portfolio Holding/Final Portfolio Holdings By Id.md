```toml
name = 'Final Portfolio Holdings By Id'
method = 'GET'
url = 'http://localhost:8080/api/portfolios/10/holdings/'
sortWeight = 3000000
id = '1137a552-6b1e-4c8b-a238-8361ed84718d'

[body]
type = 'JSON'
raw = '''
{
  "portfolio": {
    "id": 12
  },
  "asset": {
    "id": 1
  },
  "quantity": 20,
  "purchasePrice": 1000.10,
  "purchaseDate": "2025-02-02T20:19:46.298+00:00"
}'''
```
