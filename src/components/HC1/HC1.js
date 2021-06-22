import React, { useMemo, useEffect } from "react";
import { handleTitle, handleImage } from "../../utils/helper";

import "./hc1.scss";

export default function HC1({ cardDetail }) {
  const formattedData = useMemo(() => {
    const { cards } = cardDetail;
    const newData = cards.map((value) => {
      const obj = {
        title: "",
        image: "",
        url: "",
        bgColor: "",
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
      if (value.bg_color) obj.bgColor = value.bg_color;

      return obj;
    });

    return newData;
  }, [cardDetail]);

  useEffect(() => {
    if (cardDetail.is_scrollable && cardDetail.cards.length > 1) {
      const element = document.querySelector(`#${CSS.escape(cardDetail.id)}`);
      const dynmaicWidth = 100 * cardDetail.cards.length;
      element.style.width = `${dynmaicWidth}%`;
    }
  }, [cardDetail]);
  return (
    <div className="hc1-cards">
      <div className="hc1" id={cardDetail.id}>
        {formattedData.map((data) => {
          return (
            <a href={data.url} key={data.title}>
              <div
                className="hc1-wrapper"
                style={{ backgroundColor: `${data.bgColor}` }}
              >
                <div className="hc1-content">
                  <div className="hc1-image">
                    <img src={data.image} alt="img" />
                  </div>
                  <p
                    className="title"
                    dangerouslySetInnerHTML={{ __html: data.title }}
                  ></p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
