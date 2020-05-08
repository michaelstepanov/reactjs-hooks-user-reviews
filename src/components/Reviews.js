import * as React from 'react';
import {useContext} from "react";
import {DataContext} from "../context/DataContext";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import {useEffect} from "react";
import {GLOBAL_STORAGE_KEY} from "../store/reducer";

const Reviews = () => {
  const {state} = useContext(DataContext);
  const {reviews, editingReviewId} = state;

  useEffect(() => {
    window.localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <>
      {
        reviews.length ?
          <ul className="list-group workers">
            {reviews.map((review) => {
              return <Review key={review.id} review={review} />
            })}
          </ul> :
          null
      }
      {
        editingReviewId ?
          null :
          <ReviewForm review={{}} />
      }
    </>
  );
};

export default Reviews;
