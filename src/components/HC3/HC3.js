import React, { useState, useEffect } from "react";
import { handleTitle, handleImage, read, save } from "../../utils/helper";

import "./hc3.scss";

export default function HC3({ cardDetail }) {
  const [currentCard, setCard] = useState(null);
  const [formattedData, setData] = useState([]);

  const initial = () => {
    return read("removeCards") ? read("removeCards") : {};
  };

  const [removedCard, setRemovedCards] = useState(initial);

  useEffect(() => {
    if (cardDetail) {
      const { cards } = cardDetail;
      const newData = cards.map((value, index) => {
        const obj = {
          name: "",
          title: "",
          description: "",
          backgroundImage: "",
          cta: {
            text: "",
            bg_color: "",
            text_color: "",
            url: "",
          },
        };

        //for unqiue selector
        if (value.name) obj.name = value.name.split(" ")[0] + index;

        // handle image
        if (value.bg_image) obj.backgroundImage = handleImage(value.bg_image);

        // handle title
        if (value.formatted_title && value.formatted_title.entities.length) {
          obj.title = handleTitle(value.formatted_title);
        } else {
          obj.title = value.title;
        }

        // handle desc
        if (
          value.formatted_description &&
          value.formatted_description.entities.length
        ) {
          obj.description = handleTitle(value.formatted_description);
        } else {
          obj.description = value.description;
        }

        //cta
        if (value.cta.length) {
          const cta = value.cta[0];
          obj.cta.text = cta.text;
          obj.cta.bg_color = cta.bg_color;
          obj.cta.text_color = cta.text_color;
          obj.cta.url = cta.url;
        }

        return obj;
      });
      setData(newData);
    }
  }, [cardDetail]);

  useEffect(() => {
    if (cardDetail.is_scrollable && formattedData.length) {
      const element = document.getElementById(`${cardDetail.name}`);
      const dynmaicWidth = 100 * formattedData.length;
      element.style.width = `${dynmaicWidth}%`;
    }
  }, [formattedData]);

  const handleClick = (index, selector) => {
    try {
      setCard(index);
      const element = document.querySelector(`.hc3-wrapper.${selector}`);
      const scrollElement = document.querySelector(".hc3-cards");
      scrollElement.style.overflowX = "hidden";
      element.style.transform = "translateX(10px)";
    } catch (err) {
      console.warn(err);
    }
  };

  const remindLater = () => {
    try {
      // remove card
      setData((prev) => {
        return prev.splice(currentCard, 1);
      });

      //hide slide-bar
      const scrollElement = document.querySelector(".hc3-cards");
      scrollElement.style.overflowX = "scroll";
      const card = document.querySelector(`.hc3-wrapper`);
      card.style.transform = "none";
      setCard(null);
    } catch (err) {
      console.warn(err);
    }
  };

  const dismissNow = () => {
    setRemovedCards((prev) => {
      return {
        ...prev,
        [currentCard]: true,
      };
    });
    const removedCard = read("removeCards");
    const obj = {
      ...removedCard,
      [currentCard]: true,
    };
    save("removeCards", obj);
  };

  return (
    <div className="hc3-cards">
      <div className="hc3" id={cardDetail.name}>
        {formattedData.map((data, index) => {
          return (
            <>
              {!removedCard.hasOwnProperty(index.toString()) && (
                <div className="hc3-container">
                  {currentCard === index && (
                    <div className="slide-sec">
                      <button onClick={remindLater}>Remind later</button>
                      <button onClick={dismissNow}>Dissmiss now</button>
                    </div>
                  )}
                  <div
                    className={`hc3-wrapper ${data.name}`}
                    style={{ backgroundImage: `url(${data.backgroundImage})` }}
                    onClick={() => handleClick(index, data.name)}
                    key={data.title}
                  >
                    <div className="hc3-content">
                      <h2
                        className="title"
                        dangerouslySetInnerHTML={{ __html: data.title }}
                      ></h2>
                      <p
                        className="desc"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      ></p>
                      <a
                        className="hc3-btn"
                        style={{
                          backgroundColor: data.cta.bg_color,
                          color: data.cta.text_color,
                        }}
                        href={data.cta.url}
                      >
                        {data.cta.text}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}
