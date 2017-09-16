# Receipt Processing

### This is a work in progress

Input an URL as `sys.argv[1]` and print jsonified total on stdout. None if undetectable.

Usage: `python3 scan.py <url>`

```
receipt_processing git:(reciepts) ✗ python3 scan.py https://i0.wp.com/www.printablesample.com/wp-content/uploads/2017/03/Grocery-Receipt-1.jpg
TOTAL 14.23
{"total": 14.23}
➜  receipt_processing git:(reciepts) ✗
```

### TODO:
- Train Tesserac to better recognize receipt font
- Itemize reciept and return full dictionary
- Extract date of purchase
- Extract place of purchase
- Extract type of expenses
- Extract method of transaction
