import time
import machine
import urequests


from config import Config
config = Config()


def open_door(pin):
    pin = machine.Pin(pin, machine.Pin.OUT)

    pin.on()
    time.sleep(1)
    pin.off()


while True:
    response = urequests.get("https://gintoki.bednarski.dev/api/lockers/" + config.locker + "/commands", headers={"key": config.key})

    print(response.status_code)
    print(response.json())

    for command in response.json():
        open_door(command["pin"])

    time.sleep(1)
