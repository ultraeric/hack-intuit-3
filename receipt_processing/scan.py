import json
import os
import pytesseract
import regex as re
import socket
import sys
from requests import get

try:
    import Image
except ImportError:
    from PIL import Image

# Returns dictionary mapping total to price. None if unable generate dict.
def processImage(url):

    def download(url, file_name):
        with open(file_name, "wb") as file:
            response = get(url)
            file.write(response.content)

    download(url, 'image')

    regex = re.compile('.*[0-9]+\.|,[0-9]+.*')
    r = re.compile('(.*TOTAL.*){s<=2}')

    receipt = pytesseract.image_to_string(Image.open('image'), config = '-psm 6').splitlines()
    matches = [string for string in receipt if re.match(regex, string)]
    total = [string for string in receipt if re.match(r, string)]

    for line in receipt:
        print(line)

    for match in matches:
        print(match)
    for tote in total:
        for word in tote.split():
            if re.match(regex, word):
                try:
                    word = float(word)
                    prices.append(float(word))
                except:
                    continue

    os.remove('image')
    total = {}
    try:
        print("Detected total: {}".format(max(prices)))
        total['total'] = max(prices)
    except:
        return None
    return json.dumps(total)

url = sys.argv[1]
me = socket.socket()
me.connect(('localhost', 9080))
me.sendall(processImage(url))
me.close()
