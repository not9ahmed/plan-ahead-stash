```toml
name = 'Create Portfolio Holding'
method = 'POST'
url = 'http://localhost:8080/api/portfolios/1/holdings'
sortWeight = 1000000
id = '763085b3-0c68-4d40-a9ec-b9c41bb41276'

[body]
type = 'JSON'
raw = '''
{
  "name": "Car Business",
  "userId": 2
}'''
```
