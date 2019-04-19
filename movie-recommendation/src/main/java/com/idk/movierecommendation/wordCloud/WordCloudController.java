package com.idk.movierecommendation.wordCloud;

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
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/wordcloud")
public class WordCloudController {

    @Autowired
    private ReviewsDAO reviewsDAO;


    @GetMapping("/{id}")
    public List<Map<String, Object>> getWordCount(@PathVariable(value = "id") int id) {
        //public Map<String, Integer> getWordCount(@PathVariable(value = "id") int id) {
        List<ReviewsModel> reviewsList=reviewsDAO.getReviewByMovieId(id);
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

        for (int i = 0; i < reviewsList.size(); i++) {
            ReviewsModel temp= reviewsList.get(i);

            String content=temp.getContent();
            //System.out.println(reviewsList.get(i));

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
                            wordCount.put(lwrod, count == null ? 1 : count + 1);
                        }
                    }
                }
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
