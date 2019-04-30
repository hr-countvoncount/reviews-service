import React from "react";
import emptyStar from "../../public/images/airbnb-empty-star.png";
import halfStar from "../../public/images/airbnb-half-star.png";
import fullStar from "../../public/images/airbnb-full-star.png";

class RatingStars extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: null,
      categories: [
        "accuracy",
        "communication",
        "cleanliness",
        "location",
        "check-in",
        "value"
      ]
    };
  }

  componentDidMount() {
    this.calculateRating(this.props.reviews);
    this.renderCategoryStars();
  }

  calculateRating(reviews) {
    let total = 0;
    let average;

    for (let i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
    }

    average = total / reviews.length;
    let firstDigit = Number(average.toString()[0]);

    if (
      0.5 - (average - firstDigit) > -0.25 &&
      0.5 - (average - firstDigit) <= 0.25
    ) {
      average = firstDigit + 0.5;
    } else {
      average = firstDigit;
    }

    this.setState(
      {
        rating: average + 1.5
      },
      () => {
        this.renderStars();
      }
    );
  }

  renderStars() {
    let rating = this.state.rating;

    for (let i = 0; i < 5; i++) {
      let star = document.getElementById(`star${i}`);
      if (rating - i >= 1) {
        star.setAttribute("src", fullStar);
      } else if (rating - i === 0.5) {
        star.setAttribute("src", halfStar);
      } else {
        star.setAttribute("src", emptyStar);
      }
    }
  }

  calculateCategoryRatings(rating) {
    let firstDigit = Number(rating.toString()[0]);

    if (
      0.5 - (rating - firstDigit) > -0.25 &&
      0.5 - (rating - firstDigit) <= 0.25
    ) {
      return firstDigit + 0.5;
    } else {
      return firstDigit;
    }
  }

  renderCategoryStars() {
    let categories = this.state.categories;

    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < 5; j++) {
        let star = document.getElementsByClassName(
          `${categories[i]}-category-star${j}`
        );
        if (this.calculateCategoryRatings(Math.random() * 2 + 4) - j >= 1) {
          star[0].setAttribute("src", fullStar);
        } else if (
          this.calculateCategoryRatings(Math.random() * 2 + 4) - j ===
          0.5
        ) {
          star[0].setAttribute("src", halfStar);
        } else {
          star[0].setAttribute("src", emptyStar);
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div id="star-container">
          <img id="star0" />
          <img id="star1" />
          <img id="star2" />
          <img id="star3" />
          <img id="star4" />
        </div>
        <div className="rating-category-container">
          <div className="first-column">
            <div className="rating-category">
              Accurary
              <div className="left-star-category-container">
                <img className="accuracy-category-star0" />
                <img className="accuracy-category-star1" />
                <img className="accuracy-category-star2" />
                <img className="accuracy-category-star3" />
                <img className="accuracy-category-star4" />
              </div>
            </div>
            <br />
            <div className="rating-category">
              Communication
              <div className="left-star-category-container">
                <img className="communication-category-star0" />
                <img className="communication-category-star1" />
                <img className="communication-category-star2" />
                <img className="communication-category-star3" />
                <img className="communication-category-star4" />
              </div>
            </div>
            <br />
            <div className="rating-category">
              Cleanliness
              <div className="left-star-category-container">
                <img className="cleanliness-category-star0" />
                <img className="cleanliness-category-star1" />
                <img className="cleanliness-category-star2" />
                <img className="cleanliness-category-star3" />
                <img className="cleanliness-category-star4" />
              </div>
            </div>
          </div>
          <div className="second-column">
            <div className="rating-category">
              Location
              <div className="right-star-category-container">
                <img className="location-category-star0" />
                <img className="location-category-star1" />
                <img className="location-category-star2" />
                <img className="location-category-star3" />
                <img className="location-category-star4" />
              </div>
            </div>
            <br />
            <div className="rating-category">
              Check-in
              <div className="right-star-category-container">
                <img className="check-in-category-star0" />
                <img className="check-in-category-star1" />
                <img className="check-in-category-star2" />
                <img className="check-in-category-star3" />
                <img className="check-in-category-star4" />
              </div>
            </div>
            <br />
            <div className="rating-category">
              Value
              <div className="right-star-category-container">
                <img className="value-category-star0" />
                <img className="value-category-star1" />
                <img className="value-category-star2" />
                <img className="value-category-star3" />
                <img className="value-category-star4" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RatingStars;
