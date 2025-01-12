```toml
name = 'Update Investment'
method = 'PUT'
url = 'http://localhost:8080/investments/1'
sortWeight = 4000000
id = '3cc935e7-c947-4417-9161-5e9189b59f0e'

[body]
type = 'JSON'
raw = '''
{
  "name": "Wakala Deposit Updated",
  "currency": "BHD", 
  "startDate": "2025-01-11T20:36:11.783Z",
  "endDate": "2025-04-11T20:36:11.783Z",
  "days": 180
}'''
```
