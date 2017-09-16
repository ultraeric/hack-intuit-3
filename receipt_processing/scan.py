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

    download(url, '/tmp/image')

    regex = re.compile('.*[0-9]+\.|,[0-9]+.*')
    r = re.compile('(.*TOTAL.*){s<=3}')

    receipt = pytesseract.image_to_string(Image.open('/tmp/image'), config = '-psm 6').splitlines()
    matches = [string for string in receipt if re.match(regex, string)]
    total = [string for string in receipt if re.match(r, string)]

    # Uncomment for debugging purposes
    '''
    for line in receipt:
        print(line)
    for match in matches:
        print(match)
    '''

    prices = []
    for tote in total:
        # print(tote)
        for word in tote.split():
            if re.match(regex, word):
                try:
                    word = float(word)
                    prices.append(float(word))
                except:
                    continue

    os.remove('/tmp/image')
    total = {}
    try:
        #print("Detected total: {}".format(max(prices)))
        total['total'] = max(prices)
    except:
        #print("Couldn't find a total.")
        pass
    return json.dumps(total)

print(processImage(sys.argv[1]))
