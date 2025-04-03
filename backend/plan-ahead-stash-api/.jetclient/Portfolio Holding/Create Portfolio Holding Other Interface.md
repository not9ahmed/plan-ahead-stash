```toml
name = 'Create Portfolio Holding Other Interface'
method = 'POST'
url = 'http://localhost:8080/api/portfolios/10/holdings'
sortWeight = 7000000
id = '13348140-cf0a-4f05-8f3b-36c87a750a39'

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
