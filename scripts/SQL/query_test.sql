USE mydb;


SELECT movies.title, tags.tag
FROM movies, tags, movies_has_tags
WHERE movies.id = movies_has_tags.movies_id AND tags.id = movies_has_tags.tags_id