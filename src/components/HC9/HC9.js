import React, { useMemo } from "react";
import { handleImage } from "../../utils/helper";
import "./hc9.scss";

export default function HC9({ cardDetail }) {
  const formattedData = useMemo(() => {
    const { cards } = cardDetail;
    const newData = cards.map((value) => {
      const obj = {
        name: "",
        background: "",
        url: "",
      };

      //name for key
      obj.name = value.name;

      // handle image
      if (value.bg_image) obj.background = handleImage(value.bg_image);

      // handle url
      if (value.url) obj.url = value.url;

      return obj;
    });

    return newData;
  }, [cardDetail]);

  const navigate = (url) => {
    window.location.href = url;
  };

  return (
    <div className="hc9-cards">
      <div className="hc9">
        {formattedData.map((data) => {
          return (
            <div className="hc9-wrapper" onClick={() => navigate(data.url)}>
              <img src={data.background} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
