

import requests

response = requests.get('http://192.168.1.102:8000/motor/status/5')

if response.status_code == 200:
    data = response.json()
    print(type(data["motor_status"]))
    if data['motor_status']:
        print("On")
    else:
        print("OFF")

else:
    print("Something Went Wrong")