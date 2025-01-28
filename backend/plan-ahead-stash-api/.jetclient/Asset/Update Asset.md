```toml
name = 'Update Asset'
method = 'PUT'
url = 'http://localhost:8080/api/assets/13'
sortWeight = 4000000
id = '3ea8bd55-cc0a-4f76-9bc0-8eb41f519ccd'

[body]
type = 'JSON'
raw = '''
{
  "name": "Sukuk 3 Months Salam new",
  "assetType": {
    "id": 10
  },
  "startDate": "2025-01-15T20:23:18.257+00:00",
  "maturityDate": "2025-04-15T20:23:18.257+00:00",
  "numberOfDays": 90
}'''
```
