import requests
import json
import time
import re

api_key = 'cfe422613b250f702980a3bbf9e90716'

# global variables
movies_list = []
tags_dict = {}
tags_list = []
movies_has_tags_list = []
studios_dict = {}
studios_list = []
movies_has_studios_list = []

# get movie id from file
movie_id_list = []
with open('../data/movie_id.txt') as f:
	movie_ids = f.read()
	movie_ids = movie_ids.split('\n')
	for movie_id in movie_ids:
		movie_id_list.append(movie_id)


count = 0

def write_to_files(mode):
	with open('../data/movies_data.txt', mode) as f:
		for record in movies_list:
			f.write(record + '\n')

	with open('../data/tags_data.txt', mode) as f:
		for record in tags_list:
			f.write(record + '\n')

	with open('../data/movies_has_tags.txt', mode) as f:
		for record in movies_has_tags_list:
			f.write(record + '\n')

	with open('../data/studios_data.txt', mode) as f:
		for record in studios_list:
			f.write(record + '\n')

	with open('../data/movies_has_studios_data.txt', mode) as f:
		for record in movies_has_studios_list:
			f.write(record + '\n')

# get each movie's detail
for i in range(len(movie_id_list)):
	movie_id = movie_id_list[i]

	payload = {'api_key': api_key}
	r = requests.get('https://api.themoviedb.org/3/movie/%s' % movie_id, params=payload)

	if r.status_code == 200:
		count += 1
	else:
		print('status error ' + str(r.status_code))
		break

	movie = r.json()

	# movies record
	movies_record = ''
	title = movie['title']
	overview = movie['overview'].replace('"', '\\"')
	if overview is None:
		overview = 'NULL'
	poster_path = movie['poster_path']
	if poster_path is None:
		poster_path = 'NULL'
	release_date = movie['release_date']
	if release_date is None:
		release_date = 'NULL'
	runtime = movie['runtime']
	if runtime is None:
		runtime = 'NULL'
	original_language = movie['original_language']
	if original_language is None:
		original_language = 'NULL'
	movies_record = '(%s, "%s", "%s", "%s", "%s", %s, "%s"),' % (movie_id, title, overview, poster_path, release_date, runtime, original_language)
	movies_list.append(movies_record)


	# tags record and movies_has_tags record
	tags = movie['genres']
	for tag in tags:
		if tag['id'] not in tags_dict:
			tags_dict[tag['id']] = tag['name']
			tags_record = '(%s, "%s"),' % (tag['id'], tag['name'])
			tags_list.append(tags_record) 
		movies_has_tags_record = '(%s, %s),' % (movie_id, tag['id'])
		movies_has_tags_list.append(movies_has_tags_record)


	# studios record and movies_has_studios record
	studios = movie['production_companies']
	for studio in studios:
		if studio['id'] not in studios_dict:
			studios_dict[studio['id']] = studio['name']
			studios_record = '(%s, "%s"),' % (studio['id'], studio['name'])
			studios_list.append(studios_record) 
		movies_has_studios_record = '(%s, %s),' % (movie_id, studio['id'])
		movies_has_studios_list.append(movies_has_studios_record)


	write_to_files('w')

	if i == 9:
		break

	if count % 50 == 0:
		print(count)
		time.sleep(1)












