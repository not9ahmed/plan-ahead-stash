```toml
name = 'Create Asset'
method = 'POST'
url = 'http://localhost:8080/api/assets'
sortWeight = 1000000
id = 'f2826498-94a4-4ff8-a5c9-7100de810a62'

[body]
type = 'JSON'
raw = '''
{
  "name": "Sukuk 6 Months Salam new",
  "assetType": {
    "id": 17
  },  
  "startDate": "2025-01-15T20:23:18.257+00:00",
  "maturityDate": "2025-04-15T20:23:18.257+00:00",
  "numberOfDays": 90
}'''
```
