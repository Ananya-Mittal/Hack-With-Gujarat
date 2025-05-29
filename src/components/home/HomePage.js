import React from "react";
import items from "../../mockData/items.json";
import ItemList from "../itemList/ItemList";
import "./HomePage.css";

function HomePage() {
  return (
    <section className="home-container">
      <div className="hero-section">
        <h1>Welcome to Our Collection</h1>
        <p>Discover our carefully curated items just for you</p>
      </div>
      <ItemList items={items} />
    </section>
  );
}

export default HomePage;
