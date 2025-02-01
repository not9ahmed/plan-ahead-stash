```toml
name = 'Update Portfolio'
method = 'PUT'
url = 'http://localhost:8080/api/portfolios/2'
sortWeight = 4000000
id = '0bacaefc-32ec-4650-b974-a278790aea09'

[body]
type = 'JSON'
raw = '''
{
  "name": "Car Business Updated",
  "userId": 3
}'''
```
