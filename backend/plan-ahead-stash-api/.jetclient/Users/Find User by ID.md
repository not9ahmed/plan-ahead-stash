```toml
name = 'Find User by ID'
method = 'GET'
url = 'http://localhost:8080/api/users/1'
sortWeight = 3500000
id = '5190d59d-c230-46f0-97c4-106b2ee5a956'

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
