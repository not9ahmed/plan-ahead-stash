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
    "id": 5
  },
  "quantity": 20,
  "purchasePrice": 9999.10,
  "purchaseDate": "2025-09-03T20:19:46.298+00:00"
}'''
```
