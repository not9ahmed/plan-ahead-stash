```toml
name = 'Delete User'
method = 'DELETE'
url = 'http://localhost:8080/api/users/'
sortWeight = 5000000
id = '6c6b5850-74b4-46d2-a9a8-0fdc9127d251'

[body]
type = 'JSON'
raw = '''
{
  "username": "GioGio",
  "firstName": "Giorno",
  "lastName": "Giovanna",
  "dateOfBirth": "2025-01-22T20:35:59.362+00:00"
}'''
```
