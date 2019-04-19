import csv

filename = '../csvfiles/movies.csv'
records = []

with open(filename, encoding="utf-8") as f:
	reader = csv.reader(f)
	next(reader)

	for index, row in enumerate(reader):
		# convert date format to MySQL date format
		date = row[4]
		if len(date.split('/')) == 3:
			date = date.split('/')
			if int(date[2]) > 20:
				date[2] = '19' + date[2]
			date = date[2] + '-' + date[0] + '-' + date[1]
		else:
			date = ''

		movie_id = row[0]
		title = 'NULL'
		overview = 'NULL'
		poster_path = 'NULL'
		release_date = 'NULL'
		runtime = 'NULL'
		original_language = 'NULL'

		if row[1] != '':
			title = row[1]
		if row[2] != '':
			row[2] = row[2].replace('"', '\'')
			overview = row[2]
		if row[3] != '':
			poster_path = row[3]
		if date != '':
			release_date = date
		if row[5] != '':
			runtime = row[5]
		if row[6] != '':
			original_language = row[6]

		record = '(%s, "%s", "%s", "%s", "%s", %s, "%s"),\n' % (movie_id, title, overview, poster_path, release_date, runtime, original_language)
		records.append(record)


with open('movies_sql.txt', 'w') as f:
	for i in range(500):
		f.write(records[i])

	
