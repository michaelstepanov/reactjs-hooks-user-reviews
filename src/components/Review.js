import * as React from 'react';
import {useEffect} from "react";
import imgGen from '@dudadev/random-img';
import {useContext} from "react";
import {DataContext} from "../context/DataContext";
import {deleteReview, editReview, SET_URL, setUrl} from "../store/actions";
import ReviewForm from "./ReviewForm";

const Review = (props) => {
  const {state, dispatch} = useContext(DataContext);
  const {reviews, editingReviewId} = state;
  const {review} = props;

  useEffect(() => {
    if (!review.user.url) {
      // Fetch url and update the user's url
      imgGen().then(url => {
        dispatch(setUrl(review.user.id, url));
      });
    }
  }, [reviews.length]);

  const onEditClick = () => {
    dispatch(editReview(review))
  };

  const onDeleteClick = (id) => {
    dispatch(deleteReview(id))
  };

  return (
    review.id === editingReviewId ?
      <ReviewForm review={review} /> :
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="card">
              <div className="card-horizontal">
                <div className="img-square-wrapper">
                  {
                    review.user.url ?
                      <img src={review.user.url} alt="Image"/> :
                      null
                  }
                </div>
                <div className="card-body">
                  <h4 className="card-title">{review.user.name}</h4>
                  <p className="card-text">{review.comment}</p>
                </div>
              </div>
              <div className="hover-btn">
                <button type="button" className="close" data-dismiss="alert">
                  <a className="btn" href="#!" onClick={() => onDeleteClick(review.id)}>
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </a>
                </button>
                <button type="button" className="close" data-dismiss="alert">
                  <a className="btn" href="#!" onClick={() => onEditClick()}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Review;
