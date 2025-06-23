import React from "react";
import "./DietPlans.css"; 
import breakfastImage from "../images/breakfast.jpeg";
import lunchImage from "../images/lunch.jpeg";
import dinnerImage from "../images/dinner.jpeg";
import snackImage from "../images/snack.jpeg";

const DietPlans = () => {
  const plans = [
    {
      meal: "Breakfast",
      recipe: "Fruit Toast with Avocado",
      cuisine: "American",
      calories: 320,
      image: breakfastImage,
    },
    {
      meal: "Lunch",
      recipe: "Roti Dal and Salad",
      cuisine: "Indian",
      calories: 450,
      image: lunchImage,
    },
    {
      meal: "Dinner",
      recipe: "Paneer Veggie Bowl",
      cuisine: "Mediterranean",
      calories: 500,
      image: dinnerImage,
    },
    {
      meal: "Snack",
      recipe: "Choco Greek Yogurt with Chia Seeds",
      cuisine: "Greek",
      calories: 180,
      image: snackImage,
    },
  ];

  return (
    <div className="diet-plans-wrapper mt-5 mb-5">
      <h2 className="mb-4 text-center fw-bold text-success">Daily Diet Recommendations</h2>
      <div className="row g-4 justify-content-center">
        {plans.map((plan, index) => (
          <div className="col-md-6 col-lg-5" key={index}>
            <div className="diet-card card shadow border-0 rounded-4">
              <img
                src={plan.image}
                alt={plan.meal}
                className="diet-image card-img-top rounded-top-4"
              />
              <div className="card-body bg-white rounded-bottom-4">
                <h5 className="card-title fw-semibold text-success">{plan.meal}</h5>
                <p className="card-text mb-1"><strong>Recipe:</strong> {plan.recipe}</p>
                <p className="card-text mb-1"><strong>Cuisine:</strong> {plan.cuisine}</p>
                <p className="card-text"><strong>Calories:</strong> {plan.calories} kcal</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DietPlans;
