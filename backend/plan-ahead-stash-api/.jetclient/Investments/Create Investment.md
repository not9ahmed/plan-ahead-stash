```toml
name = 'Create Investment'
method = 'POST'
url = 'http://localhost:8080/investments'
sortWeight = 1000000
id = 'd81a96b8-1f15-4791-beb8-7c4329ec5115'

[body]
type = 'JSON'
raw = '''
{
  "name": "Sukuk",
  "currency": "USD", 
  "startDate": "2024-01-11T20:36:11.783Z",
  "endDate": "2024-06-11T20:36:11.783Z",
  "days": 60
}'''
```
