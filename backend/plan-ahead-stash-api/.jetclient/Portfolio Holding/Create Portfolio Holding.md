```toml
name = 'Create Portfolio Holding'
method = 'POST'
url = 'http://localhost:8080/api/portfolios/10/holdings'
sortWeight = 1000000
id = '763085b3-0c68-4d40-a9ec-b9c41bb41276'

[body]
type = 'JSON'
raw = '''
{
  "asset": {
    "id": 2
  },
  "quantity": 20,
  "purchasePrice": 1000.10,
  "purchaseDate": "2025-02-02T20:19:46.298+00:00"
}'''
```
