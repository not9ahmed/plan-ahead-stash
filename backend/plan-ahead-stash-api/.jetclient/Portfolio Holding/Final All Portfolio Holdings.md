```toml
name = 'Final All Portfolio Holdings'
method = 'GET'
url = 'http://localhost:8080/api/portfolios/holdings/'
sortWeight = 2000000
id = '6b96da18-2bf4-4c77-b0b4-78d8bfd86617'

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
