import requests
import json
import time
import random

api_key = 'cfe422613b250f702980a3bbf9e90716'

# global variables
review_list = [];
time1 = (2018, 1, 1, 0, 0, 0, 0, 0, 0)
time2 = (2019, 4, 13, 0, 0, 0, 0, 0, 0)
startTime = time.mktime(time1)
endTime = time.mktime(time2)

# get movie id from file
movie_id_list = []

with open('../data/movie_id.txt') as f:
	movie_ids = f.read()
	movie_ids = movie_ids.split('\n')
	for movie_id in movie_ids:
		movie_id_list.append(movie_id)

count = 0

# get each movie's review
for i in range(10):
    user_id = 0
    movie_id = movie_id_list[i]

    payload = {'api_key': api_key}
    r = requests.get('https://api.themoviedb.org/3/movie/%s/reviews' % movie_id, params=payload)

    if(r.status_code == 200):
        count += 1
    else:
        print('status error' + str(r.status_code))
        continue
    
    reviews = r.json();

    for res in reviews['results']:
        id = res['id'];
        content = res['content'].replace('"', '\\"')
        content = content.replace(')', '\\)')
        content = content.replace('(', '\\(')
        #content = content.replace('[', '\\[')
        #content = content.replace(']', '\\]')
        #content = content.replace('\n', '\\n')
        #content = content.replace('\t', '\\t')
        output = ''.join(c for c in content if c < '\U00010000')
        userName = res["author"]
        t = random.randint(startTime, endTime)
        postDate = time.localtime(t)
        postDate = time.strftime('%Y-%m-%d', postDate)
        record = '("%s", "%s", "%s", %s, %s),' % (id, output, postDate, movie_id, user_id)
        review_list.append(record)
        user_id += 1

with open('../data/reviews_data.txt', 'w', encoding = 'utf-8') as f:
    for record in review_list:
        f.write(record + '\n')