import React, { useEffect, useState } from "react";
import axios from "axios";
import HC6 from "./components/HC6/HC6";
import HC3 from "./components/HC3/HC3";
import HC5 from "./components/HC5/HC5";
import HC9 from "./components/HC9/HC9";
import HC1 from "./components/HC1/HC1";
import Loader from "./components/Loader/Loader";
import "./App.scss";

function App() {
  // save card detail
  const [allCards, setCardsDetail] = useState([]);

  // common loading state
  const [isloading, setLoading] = useState(false);

  useEffect(() => {

    // fetching all cards detail
    async function getCards() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://run.mocky.io/v3/04a04703-5557-4c84-a127-8c55335bb3b4"
        );

        const { card_groups } = data;

        const uniqueCards = Array.from(
          new Set(card_groups.map((a) => a.id))
        ).map((id) => {
          return card_groups.find((a) => a.id === id);
        });

        setCardsDetail(uniqueCards);
      } catch (err) {
        console.warn(err);
      } finally {
        setLoading(false);
      }
    }

    getCards();
  }, []);

  return (
    <div className="App">
      <header>FamPay</header>
      {isloading && <Loader />}
      <div className="container">
        {allCards.map((cardDetail) => {
          const { design_type } = cardDetail;
          switch (design_type) {
            case "HC6": {
              return <HC6 cardDetail={cardDetail} />;
            }
            case "HC9": {
              return <HC9 cardDetail={cardDetail} />;
            }
            case "HC1": {
              return <HC1 cardDetail={cardDetail} />;
            }
            case "HC5": {
              return <HC5 cardDetail={cardDetail} />;
            }
            case "HC3": {
              return <HC3 cardDetail={cardDetail} />;
            }

            default: {
              return null;
            }
          }
        })}
      </div>
    </div>
  );
}

export default App;
