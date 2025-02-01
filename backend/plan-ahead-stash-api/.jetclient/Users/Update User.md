```toml
name = 'Update User'
method = 'PUT'
url = 'http://localhost:8080/api/users/4'
sortWeight = 4000000
id = '1d1f06a3-ec2d-4aac-8114-52cc4f25c5e4'

[body]
type = 'JSON'
raw = '''
{
  "username": "GioGio updated",
  "firstName": "Giorno",
  "lastName": "Giovanna",
  "dateOfBirth": "2025-01-22T20:35:59.362+00:00"
}'''
```
