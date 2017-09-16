import pytesseract
import regex as re
import sys

try:
    import Image
except ImportError:
    from PIL import Image

pic = sys.argv[1]

# Returns dictionary mapping items and total to price.
def processImage(filename):
    regex = re.compile('.*[0-9]+\.|,[0-9]+.*')
    r = re.compile('(.*TOTAL.*){s<=2}')

    receipt = pytesseract.image_to_string(Image.open(pic), config = '-psm 6').splitlines()
    matches = [string for string in receipt if re.match(regex, string)]
    total = [string for string in receipt if re.match(r, string)]

    prices = []
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

    #print("Detected total: {}".format(max(prices)))

    return matches, total

processImage(pic)
