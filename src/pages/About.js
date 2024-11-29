import React from "react";
import './About.css'; // Styling untuk About page

function About() {
  return (
    <div className="about-container">
      {/* Logo Foot Avenue */}
      <div className="about-logo">
        <img src="/Logo baru.png" alt="Foot Avenue Logo" className="about-logo-img" />
      </div>

      <h1 className="about-title">About Foot Avenue</h1>
      <p className="about-description">
        Foot Avenue is an e-commerce platform dedicated to providing a wide range of sneakers from renowned brands. 
        Our app offers a seamless shopping experience where users can browse through a curated collection of sneakers, 
        view detailed product information including prices, sizes, and images, and make purchases directly through the app.
      </p>
      <p className="about-description">
        Designed with user convenience in mind, Foot Avenue features an intuitive interface that makes it easy to search 
        for sneakers, filter products by category, and check out with just a few clicks. Whether you’re looking for the 
        latest sneaker releases or a classic style, Foot Avenue helps sneaker enthusiasts find exactly what they're looking for.
      </p>
      <p className="about-description">
        Our goal is to create a platform that offers not only an extensive collection of sneakers but also a community 
        where sneaker lovers can connect, discover new trends, and make informed purchases. Foot Avenue is your one-stop 
        shop for all your sneaker needs.
      </p>
    </div>
  );
}

export default About;
