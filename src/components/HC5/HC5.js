import React, { useEffect, useMemo } from "react";
import { handleImage } from "../../utils/helper";
import "./hc5.scss";

export default function HC5({ cardDetail }) {
  const formattedData = useMemo(() => {
    const { cards } = cardDetail;
    const newData = cards.map((value) => {
      // new obj to show card detail
      const obj = {
        id: null,
        backgroundImage: "",
        backgroundColor: null,
        url: null,
      };

      obj.id = value.name;

      // handle image
      if (value.bg_image) obj.backgroundImage = handleImage(value.bg_image);

      if (value.url) obj.url = value.url;

      return obj;
    });

    return newData;
  }, [cardDetail]);

  // dynamic width if is_scrollable is true
  useEffect(() => {
    if (cardDetail.is_scrollable && cardDetail.cards.length > 1) {
      const element = document.querySelector(`#${cardDetail.name}`);
      const dynmaicWidth = 100 * cardDetail.cards.length;
      element.style.width = `${dynmaicWidth}%`;
    }
  }, [cardDetail]);

  return (
    <div className="hc5-cards">
      <div className={`hc5 ${cardDetail.name}`} id={cardDetail.name}>
        {formattedData.map((data) => {
          return (
            <a href={data.url} key={data.id}>
              <div
                className="hc5-wrapper"
                style={{ backgroundImage: `url(${data.backgroundImage})` }}
              ></div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
