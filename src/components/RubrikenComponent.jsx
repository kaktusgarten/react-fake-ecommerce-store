import { useEffect } from "react";
import { useState } from "react";

// Rubriken Komponente:
const RubrikenComponent = ({ rubrik, setRubrik }) => {
  // useState()
  const [rubriken, setRubriken] = useState([]);

  // Button Click:
  const changeCategorie = (e) => {
    setRubrik(e.target.dataset.categorie);
  };
  const changeCategoryShowAll = () => {
    setRubrik("");
  };

  useEffect(() => {
    // Hier ein Unausgelagerter Api Call innerhalb eine useEffect().
    // Beispiel für ausgelagerten Call im "api/getArticles.jsx" der benutzt wird in "HomePage.jsx"
    const abortController = new AbortController();
    const getRubriken = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products/categories",
          { signal: abortController.signal }
        );
        if (!res.ok) {
          throw new Error("Api läuft nicht");
        }
        const data = await res.json();
        setRubriken(data);
      } catch (e) {
        // console.log(e); // AbortController meckert..
      }
    };

    getRubriken();
  }, []);

  return (
    <>
      {/* Rubriken! */}
      <nav className="my-5 border p-2">
        <div className="mb-4">Rubriken:</div>
        <ul className="flex gap-3">
          <li>
            <button
              data-categorie={rubrik}
              className="btn btn-dash"
              onClick={(e) => {
                changeCategoryShowAll();
              }}
            >
              Show All
            </button>
          </li>
          {rubriken.map((rubrik, index) => (
            <li key={index}>
              <button
                data-categorie={rubrik}
                className="btn"
                onClick={(e) => {
                  changeCategorie(e);
                }}
              >
                {rubrik}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default RubrikenComponent;
