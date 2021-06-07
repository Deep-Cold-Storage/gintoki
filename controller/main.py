import urequests
import time

from config import Config

config = Config()

params = {
    "key": config.key
}

while True:
    response = urequests.get("https://gintoki.bednarski.dev/api/lockers/" + config.locker + "/commands", params=params)
    print(response)

    time.sleep(5)
