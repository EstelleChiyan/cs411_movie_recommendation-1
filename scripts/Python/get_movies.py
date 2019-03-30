import requests
import json
import time

api_key = 'cfe422613b250f702980a3bbf9e90716'

count = 0

movie_id_list = []


# for page in range (1, 26):

	payload = {'api_key': api_key, 'page': page}
	r = requests.get('https://api.themoviedb.org/3/movie/popular', params=payload)
	movies = r.json()
	results = movies['results']

	for movie in results:
		movie_id_list.append(movie['id'])
		count += 1
		print(count)


with open('movie_id.txt', 'w') as f:
	for movie_id in movie_id_list:
		f.write(str(movie_id) + '\n')