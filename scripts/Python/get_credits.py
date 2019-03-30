import requests
import json
import time

api_key = 'cfe422613b250f702980a3bbf9e90716'

# global variables
casts_dict = {}
movies_has_casts_list = []
directors_dict = {}
movies_has_directors_list = []


# get movie id from file
movie_id_list = []
with open('../data/movie_id.txt') as f:
	movie_ids = f.read()
	movie_ids = movie_ids.split('\n')
	for movie_id in movie_ids:
		movie_id_list.append(movie_id)


count = 0

# get each movie's credit
for i in range(10):
	movie_id = movie_id_list[i]

	payload = {'api_key': api_key}
	r = requests.get('https://api.themoviedb.org/3/movie/%s/credits' % movie_id, params=payload)

	if r.status_code == 200:
		count += 1
	else:
		print('status error ' + str(r.status_code))
		break

	credit = r.json()

	# casts record and movies_has_casts record
	for cast in credit['cast']:
		casts_dict[cast['id']] = cast['name']
		movies_has_casts_record = '(%s, %s),' % (movie_id, cast['id'])
		movies_has_casts_list.append(movies_has_casts_record)


print(count)
print(casts_dict)
print(movies_has_casts_record)











