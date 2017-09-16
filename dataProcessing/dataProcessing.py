import sys
import json
import statistics
import heapq
import numpy

#json = sys.argv[1]

def findAveragePerDay(data):
    maxDate = max(transaction["date"] for transaction in data["transactions"])
    minDate = min(transaction["date"] for transaction in data["transactions"])
    return sum(transaction["amount"] for transaction in data["transactions"])/(maxDate-minDate)

def findMedian(data, start, end):
    return statistics.median(transaction["amount"] for transaction in data["transactions"] if transaction["date"] >= start and transaction["date"] <= end)

def findMax(data, start, end):
    return max(transaction["amount"] for transaction in data["transactions"] if transaction["date"] >= start and transaction["date"] <= end)

def findRecurring(data, start, end):
    spentPerDay = numpy.zeros(end-start)
    for transaction in data["transactions"]:
        if transaction["date"] <= end and transaction["date"] >= start:
            spentPerDay[transaction["date"] - start] += transaction["amount"]
    correlation = numpy.correlate(spentPerDay, spentPerDay, "same")
    zeroShiftIndex = numpy.argmax(correlation)
    shiftedCorrelation = numpy.hstack((correlation[zeroShiftIndex:], correlation[:zeroShiftIndex]))
    newCorrelation = numpy.delete(shiftedCorrelation, 0)
    return int(numpy.argmax(newCorrelation)) + 1, max(newCorrelation)

def timeUntilGoal(data):
    dailyAverage = findAveragePerDay(data)
    goalAmount = data["goal"]
    income = data["income"]
    timeToGoal = goalAmount/(income - dailyAverage)
    return timeToGoal



data = {"query": "recurring", "duration": {"start": 0, "end": 5}, "transactions": [{"date": 1, "amount": 1}, {"date": 1, "amount": 1}, {"date": 3, "amount": 5}, {"date": 2, "amount": 1}, {"date": 1, "amount": 1}, {"date": 1, "amount": 2}, {"date": 7, "amount": 10}], "goal": 100, "income": 10}

#data = json.loads(json)
callType = data["query"]
start = data["duration"]["start"]
end = data["duration"]["end"]
if callType == "max":
    returnedObj = findMax(data, start, end)
elif callType == "recurring":
    returnedObj = findRecurring(data, start, end)
elif callType == "goal":
    returnedObj = timeUntilGoal(data)
else:
    returnedObj = None
print (json.dumps({"data": list(returnedObj)}))
