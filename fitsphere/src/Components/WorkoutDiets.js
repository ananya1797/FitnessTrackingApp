import React from 'react';
import Navbar from './Navbar';
import '../styles/Diets.css';
// import '../styles/WorkoutDiets.css';

function WorkoutDiets() {
  return (
    <div>
      <Navbar/>
      <div className="diets-container">
      <div className="contact-button">
        <button className="btn-contact">Contact a Dietician</button>
      </div>

      <div className="motivation-section">
        <h1>Fuel Your Body, Fuel Your Life</h1>
        <p>"Let food be thy medicine, and medicine be thy food." – Hippocrates</p>
        <p>Start small, think big. Fuel your body right to unlock your true potential.</p>
      </div>

      <div className="diet-buttons">
        <div className="diet-button">
          <button className="diet-btn" onClick={() => document.getElementById('breakfast').scrollIntoView()}>
            Breakfast Diets
          </button>
        </div>
        <div className="diet-button">
          <button className="diet-btn" onClick={() => document.getElementById('lunch').scrollIntoView()}>
            Lunch Diets
          </button>
        </div>
        <div className="diet-button">
          <button className="diet-btn" onClick={() => document.getElementById('dinner').scrollIntoView()}>
            Dinner Diets
          </button>
        </div>
      </div>

      <div id="breakfast" className="diet-section">
        <h2>Breakfast Diets</h2>
        <div className="diet-content">
          <p>Start your day strong with a healthy breakfast! Here are some options:</p>
          <ul>
            <li><a href="https://www.example.com/healthy-breakfast1" target="_blank" rel="noopener noreferrer">Avocado Toast with Eggs</a></li>
            <li><a href="https://www.example.com/healthy-breakfast2" target="_blank" rel="noopener noreferrer">Oatmeal with Berries and Almonds</a></li>
            <li><a href="https://www.example.com/healthy-breakfast3" target="_blank" rel="noopener noreferrer">Greek Yogurt with Granola</a></li>
          </ul>
          <div className="image-placeholder">[Insert Image for Breakfast]</div>
        </div>
      </div>

      <div id="lunch" className="diet-section">
        <h2>Lunch Diets</h2>
        <div className="diet-content">
          <p>Power up your afternoon with these healthy lunch options:</p>
          <ul>
            <li><a href="https://www.example.com/healthy-lunch1" target="_blank" rel="noopener noreferrer">Quinoa Salad with Grilled Chicken</a></li>
            <li><a href="https://www.example.com/healthy-lunch2" target="_blank" rel="noopener noreferrer">Vegetable Stir Fry with Tofu</a></li>
            <li><a href="https://www.example.com/healthy-lunch3" target="_blank" rel="noopener noreferrer">Chicken and Hummus Wrap</a></li>
          </ul>
          <div className="image-placeholder">[Insert Image for Lunch]</div>
        </div>
      </div>

      <div id="dinner" className="diet-section">
        <h2>Dinner Diets</h2>
        <div className="diet-content">
          <p>End your day right with a nutritious dinner:</p>
          <ul>
            <li><a href="https://www.example.com/healthy-dinner1" target="_blank" rel="noopener noreferrer">Grilled Salmon with Asparagus</a></li>
            <li><a href="https://www.example.com/healthy-dinner2" target="_blank" rel="noopener noreferrer">Zucchini Noodles with Tomato Basil Sauce</a></li>
            <li><a href="https://www.example.com/healthy-dinner3" target="_blank" rel="noopener noreferrer">Chicken and Veggie Skewers</a></li>
          </ul>
          <div className="image-placeholder">[Insert Image for Dinner]</div>
        </div>
      </div>

    </div>
    </div>
  );
}

export default WorkoutDiets;
