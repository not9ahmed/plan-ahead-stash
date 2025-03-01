```toml
name = 'Create Asset - Assets Type Nested'
method = 'POST'
url = 'http://localhost:8080/api/assets'
sortWeight = 1250000
id = '1d318a2b-4935-4e86-b973-f8da127985c2'

[body]
type = 'JSON'
raw = '''
{
  "name": "Sukuk 3 Months Ijara",
  "assetType": {
    "id": 13
  }
}'''
```
