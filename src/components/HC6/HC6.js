import React, { useEffect, useMemo } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { handleTitle, handleImage } from "../../utils/helper";

import "./hc6.scss";

export default function HC6({ cardDetail }) {
  const formattedData = useMemo(() => {
    const { cards } = cardDetail;
    const newData = cards.map((value) => {

      // new obj to show over card
      const obj = {
        title: "",
        description: "",
        image: "",
        url: "",
      };

      // handle image
      if (value.icon) obj.image = handleImage(value.icon);

      // handle title
      if (value.formatted_title && value.formatted_title.entities) {
        obj.title = handleTitle(value.formatted_title);
      } else {
        obj.title = value.title;
      }

      if (value.url) obj.url = value.url;

      return obj;
    });

    return newData;
  }, [cardDetail]);

  // calculate dynamic width on basis of number of cards
  useEffect(() => {
    if (cardDetail.is_scrollable && cardDetail.cards.length > 1) {
      const element = document.querySelector(`#${cardDetail.name}`);
      const dynmaicWidth = 100 * cardDetail.cards.length;
      element.style.width = `${dynmaicWidth}%`;
    }
  }, [cardDetail]);

  return (
    <div className="hc6-cards">
      <div className="hc6" id={cardDetail.name}>
        {formattedData.map((data) => {
          return (
            <a href={data.url} key={data.title}>
              <div className="hc6-wrapper">
                <div className="hc6-content">
                  <div className="hc6-image">
                    <img src={data.image} alt="img" />
                  </div>
                  <p
                    className="title"
                    dangerouslySetInnerHTML={{ __html: data.title }}
                  ></p>
                  <ArrowForwardIosIcon />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
