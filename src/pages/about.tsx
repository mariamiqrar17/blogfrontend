import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <img src="/about-image.jpg" alt="About" className="about-image" />
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu sapien sit amet magna
            tempus tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Donec quis lacinia metus.
          </p>
          <p>
            Nulla facilisi. In hac habitasse platea dictumst. Morbi convallis enim eget lectus
            fermentum, nec venenatis lectus dapibus. Fusce consequat augue a mauris tempor, sed
            tincidunt sem congue.
          </p>
        </div>
      </div>
      <style jsx>{`
        .about-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .about-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .about-image {
          max-width: 200px;
          align-self: flex-end;
        }
        .about-text {
          margin-top: 20px;
        }
        @media (max-width: 768px) {
          .about-content {
            flex-direction: column;
            align-items: center;
          }
          .about-image {
            align-self: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
