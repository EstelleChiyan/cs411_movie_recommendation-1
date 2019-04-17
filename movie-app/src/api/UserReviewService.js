import axios from "axios";

class UserReviewService{
    retrieveAllUserReviews(userName){
        console.log('excuted service'); 
        return axios.get(`http://localhost:8080/reviews/${userName}`);
    }

    retrieveUserInfo(userName){
        console.log('get user infor');
        return axios.get(`http://localhost:8080/user/${userName}/info`);
    }

    retrieveReview(id){
        console.log('get single review');
        return axios.get(`http://localhost:8080/reviews/${id}/find`);
    }

    deleteReview(id){
        console.log('detele review');
        return axios.delete(`http://localhost:8080/reviews/${id}/delete`);
    }

    updateReview(id,review){

        console.log('update review');
        console.log(id);
        console.log(review);
        console.log('check end');
        return axios.put(`http://localhost:8080/reviews/${id}/update`,review);
    }

}

export default new UserReviewService()