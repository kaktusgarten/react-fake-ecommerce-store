import { useEffect } from "react";
import { NavLink } from "react-router";
import { useState } from "react";

const RubrikenComponent = () => {
  const [rubriken, setRubriken] = useState([]);

  useEffect(() => {
    // Hier ein Unausgelagerter Api Call innerhalb eine useEffect(). Beispiel für ausgelagerten Call im getArticles.jsx!
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
        console.log(data);
        setRubriken(data);
      } catch (e) {
        // console.log(e); // meckert wegen AbortController
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
