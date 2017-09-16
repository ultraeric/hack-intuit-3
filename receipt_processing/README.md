# Receipt Processing

### This is a work in progress, with many improvements ahead of it!

Input URL on script invocation `sys.argv[1]` and print extracted total expense as a json on stdout. Empty json if total is unextractable.

Usage: `python3 scan.py <url>`

```
receipt_processing git:(reciepts) ✗ python3 scan.py https://i0.wp.com/www.printablesample.com/wp-content/uploads/2017/03/Grocery-Receipt-1.jpg
TOTAL 14.23
{"total": 14.23}
➜  receipt_processing git:(reciepts) ✗
```

### TODO - Future Impl:

- Extract date of purchase from receipt; alternatively timestamp on upload
- Extract place of purchase, either w/ receipt or geolocation ping
- Extract type of expenses, e.g furniture, gas, grocery from types of items bought
- Extract method of transaction, e.g cash, card (credit/debit)
- Itemize reciept and return full dictionary mapping items to prices
- Notification to scan receipts/log data when near cashiers
- Preprocessing step to normalize, transform and "clean up" receipts before processing step for more accurate OCR
- Train Tesseract to better recognize monospaced receipt fonts: currently seems to be trained on more traditional fonts (Arial, Helvetica, TNR)
