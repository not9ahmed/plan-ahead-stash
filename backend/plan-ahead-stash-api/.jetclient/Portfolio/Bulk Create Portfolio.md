```toml
name = 'Bulk Create Portfolio'
method = 'POST'
url = 'http://localhost:8080/api/portfolios/bulk'
sortWeight = 8000000
id = '70326a47-67b6-4ccb-978b-45ebe733f611'

[body]
type = 'JSON'
raw = '''
[
  {
    "name": "Something saving",
    "userId": 1
  },
  {
    "name": "Pension Fund",
    "userId": 1
  },
  {
    "name": "Car Business",
    "userId": 1
  }
]'''
```
