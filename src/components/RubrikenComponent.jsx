import { useEffect } from "react";
import { useState } from "react";

const RubrikenComponent = () => {
  const [rubriken, setRubriken] = useState([]);

  useEffect(() => {
    // Hier ein Unausgelagerter Api Call innerhalb eine useEffect().
    // Beispiel für ausgelagerten Call im "api/getArticles.jsx" der benutzt wird in "HomePage.jsx"
    const abortController = new AbortController();
    const getRubriken = async () => {
      try {
        console.log("Rubriken Component useEffect");
        const res = await fetch(
          "https://fakestoreapi.com/products/categories",
          { signal: abortController.signal }
        );
        if (!res.ok) {
          throw new Error("Api läuft nicht");
        }
        const data = await res.json();
        console.log("HAllo");
        console.log(data);
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
        Rubriken:
        <ul className="flex gap-3">
          {rubriken.map((rubrik, index) => (
            <li key={index}>
              <button className="btn">{rubrik}</button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default RubrikenComponent;
