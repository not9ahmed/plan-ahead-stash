```toml
name = 'Bulk Create Asset Type'
method = 'POST'
url = 'http://localhost:8080/api/assetsType/bulk'
sortWeight = 5000000
id = 'b2e110d5-055d-4c2e-b700-2e3b13e23ad4'

[body]
type = 'JSON'
raw = '''
[
  {
    "name": "Fixed Deposit"
  },
  {
    "name": "T-Bills"
  },
  {
    "name": "Sukuk Ijara"
  },
  {
    "name": "Sukuk AlSalam"
  },
  {
    "name": "Wakala Deposit"
  },
  {
    "name": "Crowdfunding"
  }
]'''
```
