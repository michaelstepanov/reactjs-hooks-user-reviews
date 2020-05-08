import * as React from 'react';
import {useEffect} from "react";
import {useState} from "react";
import {useContext} from "react";
import {DataContext} from "../context/DataContext";
import {addReview, updateReview} from "../store/actions";
import {checkNested, getNested} from "../helpers/index";
import {GLOBAL_STORAGE_KEY} from "../store/reducer";
import {buildNewReview} from "../helpers";

const ReviewForm = (props) => {
  const {state, dispatch} = useContext(DataContext);
  const {review} = props;

  const isNewReview = Object.keys(review).length === 0;

  useEffect(() => {
    window.localStorage.setItem(GLOBAL_STORAGE_KEY, state);
  }, [state]);

  const [values, setValues] = useState({
    name: getInitialName(review),
    comment: getInitialComment(review),
  });
  const {name, comment} = values;

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors['name'] = 'Name is empty. Please provide a name.';
    }

    if (!values.comment) {
      errors['comment'] = 'Comment is empty. Please provide a comment.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    const errors = validate(values);
    const errorValues = Object.values(errors);
    if (errorValues.length) {
      let message = errorValues.join('\n');

      return alert(message);
    }

    // If new review is created
    if (isNewReview) {
      // Build new review
      const review = buildNewReview(name, comment);

      dispatch(addReview(review));
    } else {
      // Update existing review
      const updatedReview = {
        ...review,
        comment,
        user: {
          ...review.user,
          name,
        },
      };

      dispatch(updateReview(updatedReview));
    }

    setValues({
      name: '',
      comment: '',
    })
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid">
      <div className="card mt-3">
        <div className="card-body">
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="name"
                  placeholder="Your name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="form-control" />
              </div>
              <div className="form-group">
                <input
                  type="comment"
                  placeholder="Your comment"
                  name="comment"
                  value={comment}
                  onChange={handleChange}
                  className="form-control" />
              </div>
              <button type="submit" className="btn btn-primary pull-right">{isNewReview ? 'Add' : 'Save'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function getInitialName(review) {
  return checkNested(review, 'user', 'name') ?
    getNested(review, 'user', 'name') :
    '';
}

function getInitialComment(review) {
  return checkNested(review, 'comment') ?
    getNested(review, 'comment') :
    '';
}

export default ReviewForm;
