import urequests
import time

from config import Config

config = Config()

while True:
    response = urequests.get("https://gintoki.bednarski.dev/api/lockers/" + config.locker + "/commands", headers={"key": config.key})

    print(response.status_code)
    print(response.json())

    time.sleep(5)
