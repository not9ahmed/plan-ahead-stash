```toml
name = 'Bulk Create Asset'
method = 'POST'
url = 'http://localhost:8080/api/assets/bulk'
sortWeight = 2000000
id = '2db8a769-0dcc-4e9f-9454-9dbec2d56ad9'

[body]
type = 'JSON'
raw = '''
[
  {
    "name": "Sukuk 3 Months Ijara",
    "assetType": {
      "id": 1
    },
    "startDate": "2025-01-15T20:23:18.257+00:00",
    "maturityDate": "2025-04-15T20:23:18.257+00:00",
    "numberOfDays": 90
  },
  {
    "name": "Sukuk 3 Months Salam",
    "assetType": {
      "id": 1
    },
    "startDate": "2025-01-15T20:23:18.257+00:00",
    "maturityDate": "2025-04-15T20:23:18.257+00:00",
    "numberOfDays": 90
  }
]'''
```
