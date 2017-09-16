import csv
import itertools
import numpy as np
import json
import sys

argum = [sys.argv[1], int(sys.argv[2])]
#read csv file
results = np.genfromtxt('USA_All_States.csv', delimiter=",")
#[[ageCategory, above/below, columnIndex], ....]
#ageCategory = refer to paper, below = 0, above = 1
columnatr = [
[0, 0, 8], #8th column index, 04
[1, 0, 9], #9th, 05
[2, 0, 10], #10th, 06
[3, 0, 11], #11th, 07
[4, 0, 12], #12th, 08
[5, 0, 13], #13th, 09
[6, 0, 14], #14th, 10
[7, 0, 15], #15th, 11
[8, 0, 16], #16th, 12
[9, 0, 17], #17th, 13
[10, 0, 18], #18th, 14
[11, 0, 19], #19th, 15
[12, 0, 20], #20th, 16
[0, 1, 37], #33
[1, 1, 38], #34
[2, 1, 39], #35
[3, 1, 40], #36
[4, 1, 41], #37
[5, 1, 42], #38
[6, 1, 43], #39
[7, 1, 44], #40
[8, 1, 45], #41
[9, 1, 46], #42
[10, 1, 47], #43
[11, 1, 48], #44
[12, 1, 49] #45
]

#determines belowPovertyPopulationOfDem/PovertyPopulationOfDem
def getPovRisk(state, age):
	#sets below and above poverty population
	#loops through to get column indices that match age
	for elem in columnatr:
		#determines if ageCategories match
		if elem[0] == ageCategory(age):
			#below poverty column index
			if elem[1] == 0:
				belowColInd = elem[2]
			else:
				aboveColInd = elem[2]
	rowInd = rowIndex(state) #row index based on state
	below = results[rowInd, belowColInd] #population below poverty in that demographic
	above = results[rowInd, aboveColInd] #population above poverty in that demographic
	return below/(below + above)


#determines which category number the age belongs to
def ageCategory(age):
	if age < 5:
		return 0
	if age == 5:
		return 1
	if age <= 11:
		return 2
	if age <= 14:
		return 3
	if age == 15:
		return 4
	if age <= 17:
		return 5
	if age <= 24:
		return 6
	if age <= 34:
		return 7
	if age <= 44:
		return 8
	if age <= 54:
		return 9
	if age <= 64:
		return 10
	if age <= 74:
		return 11
	return 12
#using state, determines which row in data
def rowIndex(s):
	if s == "AL":
		return 1
	if s == "AK":
		return 2
	if s == "AZ":
		return 3
	if s == "AR":
		return 4
	if s == "CA":
		return 5
	if s == "CO":
		return 6
	if s == "CT":
		return 7
	if s == "DC":
		return 8
	if s == "DE":
		return 9
	if s == "FL":
		return 10
	if s == "GA":
		return 11
	if s == "HI":
		return 12
	if s == "ID":
		return 13
	if s == "IL":
		return 14
	if s == "IN":
		return 15
	if s == "IA":
		return 16
	if s == "KS":
		return 17
	if s == "KY":
		return 18
	if s == "LA":
		return 19
	if s == "ME":
		return 20
	if s == "MD":
		return 21
	if s == "MA":
		return 22
	if s == "MI":
		return 23
	if s == "MN":
		return 24
	if s == "MS":
		return 25
	if s == "MO":
		return 26
	if s == "MT":
		return 27
	if s == "NE":
		return 28
	if s == "NV":
		return 29
	if s == "NH":
		return 30
	if s == "NJ":
		return 31
	if s == "NM":
		return 32
	if s == "NY":
		return 33
	if s == "NC":
		return 34
	if s == "ND":
		return 35
	if s == "OH":
		return 36
	if s == "OK":
		return 37
	if s == "OR":
		return 38
	if s == "PA":
		return 39
	if s == "PR":
		return 40
	if s == "RI":
		return 41
	if s == "SC":
		return 42
	if s == "SD":
		return 43
	if s == "TN":
		return 44
	if s == "TX":
		return 45
	if s == "UT":
		return 46
	if s == "VT":
		return 47
	if s == "VA":
		return 48
	if s == "WA":
		return 49
	if s == "WV":
		return 50
	if s == "WI":
		return 51
	if s == "WY":
		return 52
	print('ENTERED INVALID STATE... try again')

print(json.dumps({"risk" : getPovRisk(argum[0], argum[1])}))
