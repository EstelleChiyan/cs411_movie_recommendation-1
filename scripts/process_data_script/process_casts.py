import csv
import json
import ast

filename = '../csvfiles/casts.csv'
records = []

with open(filename, encoding="utf-8") as f:
	reader = csv.reader(f)
	next(reader)

	for index, row in enumerate(reader):

		print(index)

		# if index == 500:
		# 	break

		movie_id = row[1]

		s = row[0]
		s = s.replace('None', '0')
		x = ast.literal_eval(s.replace('\r','\\r').replace('\n','\\n'))


		# s = s.replace('\"', '')
		# s = s.replace("\'", '\"')

		# x = json.loads(s)

		# for o in x:
		# 	print(o)



		# for actor in x:
		# 	print(actor['id'], actor['name'])



	
