package com.idk.movierecommendation.wordCloud;

import com.idk.movierecommendation.rating.RatingDAO;
import com.idk.movierecommendation.rating.RatingModel;
import com.idk.movierecommendation.rating.RatingRowMapper;
import com.idk.movierecommendation.reviews.ReviewsDAO;
import com.idk.movierecommendation.reviews.ReviewsModel;
import com.idk.movierecommendation.user.UserDAO;
import com.idk.movierecommendation.user.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.text.BreakIterator;
import java.util.*;
import java.util.stream.*;


import java.lang.*;
import com.idk.movierecommendation.reviews.ReviewsDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.idk.movierecommendation.reviews.ReviewsModel;
//import sun.security.util.Length;
//
//import javax.validation.Valid;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.StringTokenizer;
import java.text.BreakIterator;
import static java.lang.Math.toIntExact;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/cuswordcloud")
@RestController
public class WordCloudCusController {

    @Autowired
    private ReviewsDAO reviewsDAO;

    @Autowired
    private RatingDAO ratingDAO;

    public static double cosineSimilarity(double[] vectorA, double[] vectorB) {
        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;
        for (int i = 0; i < vectorA.length; i++) {
            dotProduct += vectorA[i] * vectorB[i];
            normA += Math.pow(vectorA[i], 2);
            normB += Math.pow(vectorB[i], 2);
        }
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }


    @GetMapping("/{Userid}/{Movieid}")
    public List<Map<String, Object>> getSimilarCustomer(@PathVariable("Userid")int Userid, @PathVariable("Movieid") int Movieid) {



        List<RatingModel> ratings= ratingDAO.getAllRating();

        HashMap<Integer,Integer> dis_user = new HashMap<Integer,Integer>();
        HashMap<Integer,Integer> dis_movie = new HashMap<Integer,Integer>();
        HashMap<Integer, List<Integer>> user_movie= new HashMap<Integer,List<Integer>>();
        HashMap<Integer, List<Integer>> user_score= new HashMap<Integer,List<Integer>>();
        Integer num_user=0;
        Integer num_movie=0;
        Map<Integer, Double> user_similarity = new HashMap<Integer, Double>();

        //Get user-movie-rating matrix basic information
        for (int i = 0; i < ratings.size(); i++) {
            RatingModel rating=ratings.get(i);
            Integer user_id=rating.getUser_id();
            Integer movie_id=rating.getMovie_id();
            Integer score=rating.getRating();
            if(user_movie.containsKey(user_id)){
                List<Integer> m_temp=user_movie.get(user_id);
                List<Integer> r_temp=user_score.get(user_id);
                m_temp.add(movie_id);
                r_temp.add(score);
                user_movie.put(user_id,m_temp);
                user_score.put(user_id,r_temp);
            }
            else{
                List<Integer> m_temp = new ArrayList<>();
                List<Integer> r_temp = new ArrayList<>();
                m_temp.add(movie_id);
                r_temp.add(score);
                user_movie.put(user_id,m_temp);
                user_score.put(user_id,r_temp);

            }

            if (dis_user.containsKey(user_id)){
                num_user+=0;
            }
            else{
                dis_user.put(user_id,num_user);
                num_user+=1;

            }
            if (dis_movie.containsKey(movie_id)){
                num_movie+=0;
            }
            else {
                dis_movie.put(movie_id, num_movie);
                num_movie += 1;
            }
        }
        //Construct and initialize Matrix
        double [][] rating_matrix= new double[num_user][num_movie];

        for (int i = 0; i < num_user; i++) {
            for (int j = 0; j < num_movie; j++) {
                rating_matrix[i][j] = (double)0;
            }
        }

        for ( Integer userId : user_movie.keySet() ){
            int row_pos=dis_user.get(userId);
            List<Integer> temp_movies=user_movie.get(userId);
            List<Integer> temp_scores=user_score.get(userId);
            for(int i=0; i<temp_movies.size(); i++){
                int temp_movie_id=temp_movies.get(i);
                int temp_movie_rating=temp_scores.get(i);
                int col_pos=dis_movie.get(temp_movie_id);
                rating_matrix[row_pos][col_pos]=(double)temp_movie_rating;
            }
        }


        double[] target=rating_matrix[dis_user.get(Userid)];


        for(Integer userId : user_movie.keySet()){
            if (userId!=Userid){
                double[] temp=rating_matrix[dis_user.get(userId)];

                double similarity=cosineSimilarity(target,temp);
                user_similarity.put(userId,similarity);

            }
        }

        Map<Integer, Double> sortedMap =
                user_similarity.entrySet().stream()
                        .sorted(Collections.reverseOrder(Map.Entry.comparingByValue()))
                        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                                (e1, e2) -> e2, LinkedHashMap::new));
        //System.out.println(sortedMap);
        List<Integer> UserRank = new ArrayList<Integer>();
        UserRank.addAll(sortedMap.keySet());



        //List<Integer> customers= sortedMap.keySet();
        Map<Integer,Double> UserRankMap= new HashMap<>();
        for(int i=0; i<UserRank.size();i++){
            UserRankMap.put(UserRank.get(i),(double)i);
        }

        List<ReviewsModel> reviewsList=reviewsDAO.getReviewByMovieId(Movieid);
        //List<String> words=new ArrayList<String>();
        Map<String, Integer>wordCount = new HashMap<String, Integer>();
        //List<String> sentences=new ArrayList<String>();
        ArrayList ret = new ArrayList();



        String[] stopwords = {"a", "able", "about",
                "across", "after", "all", "almost", "also", "am", "among", "an",
                "and", "any", "are", "as", "at", "b", "be", "because", "been",
                "but", "by", "c", "can", "cannot", "could", "d", "dear", "did",
                "do", "does", "e", "either", "else", "ever", "every", "f", "for",
                "from", "g", "get", "got", "h", "had", "has", "have", "he", "her",
                "hers", "him", "his", "how", "however", "i", "if", "in", "into",
                "is", "it", "its", "j", "just", "k", "l", "least", "let", "like",
                "likely", "m", "may", "me", "might", "most", "must", "my",
                "neither", "n", "no", "nor", "not", "o", "of", "off", "often",
                "on", "only", "or", "other", "our", "own", "p", "q", "r", "rather",
                "s", "said", "say", "says", "she", "should", "since", "so", "some",
                "t", "than", "that", "the", "their", "them", "then", "there",
                "these", "they", "this", "tis", "to", "too", "twas", "u", "us",
                "v", "w", "wants", "was", "we", "were", "what", "when", "where",
                "which", "while", "who", "whom", "why", "will", "with", "would",
                "x", "y", "yet", "you", "your", "z","very","movie"};
        double init_factor=2.0;
        double factor=0.8;

        for (int i = 0; i < reviewsList.size(); i++) {
            ReviewsModel temp= reviewsList.get(i);

            String content=temp.getContent();
            //System.out.println(reviewsList.get(i));
            Integer temp_userid=temp.getUserId();



            //System.out.println(temp_userid);
            if(UserRankMap.containsKey(temp_userid)){
                //System.out.println("Contain");


                double power=UserRankMap.get(temp_userid)-1.0;
                //System.out.println(power);
                double user_factor=init_factor* Math.pow(factor,power);
                //System.out.println(user_factor);
                BreakIterator iterator = BreakIterator.getSentenceInstance(Locale.US);
                iterator.setText(content);
                int start = iterator.first();
                //put paragraph into sentences
                for (int end = iterator.next(); end != BreakIterator.DONE; start = end, end = iterator.next()){
                    String sentence=content.substring(start,end);
                    //split sentence to words
                    String[] word_list = sentence.split("\\P{L}+");
                    for (String word: word_list) {
                        //if(stopwords.contains(word))
                        //System.out.println(word);
                        if(word.length()<3){
                            continue;
                        }
                        else{
                            String lwrod=word.toLowerCase();
                            Integer flag=0;
                            for(String stopword: stopwords){
                                if(lwrod.equals(stopword) ){
                                    flag=1;
                                    //break;
                                }
                            }
                            if(flag==1){
                                continue;
                            }
                            else{
                                Integer count = wordCount.get(lwrod);
                                wordCount.put(lwrod, count == null ? 1 : count + (int)user_factor);
                            }
                        }
                    }
                }
            }
            else{
                System.out.println("NotContain");
            }
        }

        for (Map.Entry<String, Integer> entry : wordCount.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            // ...
            Map<String, Object> temp = new HashMap<String, Object>();
            temp.put("text", key);
            temp.put("value", value);
            ret.add(temp);
        }

        return ret;
    }

}
