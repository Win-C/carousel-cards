import React, { useState } from "react";
import "./Carousel.css";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import Card from "./Card";

/** Carousel
 *  
 *  Props: 
 *  - cardData: [{src, caption}, ...]
 *  - title
 * 
 *  State:
 *  - cardIdx: 
 *  - leftArrow: hidden (default) / visible
 *  - rightArrow: hidden / visible (default)
 *  
 *  App -> Carousel -> Card 
 * 
 */
function Carousel(props) {
  const [cardIdx, setCardIdx] = useState(0);
  const [leftArrow, setLeftArrow] = useState("hidden");
  const [rightArrow, setRightArrow] = useState("visible");
  const card = props.cardData[cardIdx];
  const total = props.cardData.length;

  /** Function that sets useStates right arrow clicked */
  function goForward() {
    if (cardIdx === 1) {      // next time cardIdx === 2
      setRightArrow("hidden");
      setLeftArrow("visible");
      setCardIdx(cardIdx + 1);
    } else if (cardIdx === 0){ // next time cardIdx === 1
      setRightArrow("visible");
      setLeftArrow("visible");
      setCardIdx(cardIdx + 1);
    } else {                      // next time cardIdx === 0
      setRightArrow("visible");
      setLeftArrow("hidden");
      setCardIdx(cardIdx + 1);
    }
  }; 

 /** Function that sets useStates left arrow clicked */
  function goBackward() {
    if (cardIdx === 1) {  // next time cardIdx === 0 
      setRightArrow("visible");
      setLeftArrow("hidden");
      setCardIdx(0);
    } else if (cardIdx === 2) {  // next time cardIdx === 1
      setRightArrow("visible");
      setLeftArrow("visible");
      setCardIdx(cardIdx - 1);
    } else {                      // next time cardIdx === 2
      setRightArrow("hidden");
      setLeftArrow("visible");
      setCardIdx(cardIdx - 1);
    }
  };

  return (
    <div className="Carousel">
      <h1>{props.title}</h1>
      <div className="Carousel-main">
        <i
          className="fas fa-chevron-circle-left fa-2x"
          onClick={goBackward}
          data-testid="left-arrow"
          style={{visibility: leftArrow}}
        />
        <Card
          caption={card.caption}
          src={card.src}
          currNum={cardIdx + 1}
          totalNum={total}
        />
        <i
          className="fas fa-chevron-circle-right fa-2x"
          onClick={goForward}
          data-testid="right-arrow"
          style={{visibility: rightArrow}}
        />
      </div>
    </div>
  );
}

Carousel.defaultProps = {
  cardData: [
    {
      src: image1,
      caption: "Photo by Richard Pasquarella on Unsplash"
    },
    {
      src: image2,
      caption: "Photo by Pratik Patel on Unsplash"
    },
    {
      src: image3,
      caption: "Photo by Josh Post on Unsplash"
    }
  ],
  title: "Shells from far away beaches."
};

export default Carousel;
