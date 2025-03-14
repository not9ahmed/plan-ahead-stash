```toml
name = 'Delete Portfolio Holdings'
method = 'GET'
url = 'http://localhost:8080/api/portfolios/10/holdings/'
sortWeight = 5000000
id = 'b6c03ec3-c00e-4095-b72e-d6aa07a8f5ab'

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
