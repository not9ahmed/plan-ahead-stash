```toml
name = 'Find Portfolio Holdings By ID'
method = 'GET'
url = 'http://localhost:8080/api/portfolios/10/holdings/'
sortWeight = 6000000
id = 'ccca23e2-458f-4a8b-b0f7-5a0886e50ebe'

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
