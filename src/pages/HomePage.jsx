import RubrikenComponent from "../components/RubrikenComponent";
import { useEffect, useState, useContext } from "react";
// Ausgelagerter API-Call:
import { getArticles } from "../api/getArticles";
import ArticleComponent from "../components/ArticleComponent";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(
    "https://fakestoreapi.com/products"
  );

  const [articles, setArticles] = useState([]);
  const [rubrik, setRubrik] = useState("");
  const [angezeigteArtikel, setAngezeigteArtikel] = useState(articles);

  // useEffect muss immer benutzt werden um auf Änderungen in den States zu reagieren.
  // angezeigteArtikel wäre sonst leer, weil erst unten im api-call die articles gesetzt werden.
  // Hier wird auch gleich gefiltert fall Rubrik angegeben wurde:
  useEffect(() => {
    if (rubrik) {
      setAngezeigteArtikel(articles.filter((a) => a.category === rubrik));
    } else {
      setAngezeigteArtikel(articles);
    }
  }, [articles, rubrik]);

  // useEffect - Hole Daten
  // Hier ein ausgelagerter Api Call aus "api/getArticles.jsx" innerhalb eine useEffect().
  // Beispiel für NICHT ausgelagerten Call in "api/getRubriken.jsx"
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const data = await getArticles(currentPage, abortController.signal);
        setArticles(data);
      } catch (e) {
        if (e.name === "AbortError") return; // Abord Controller.. später checken
        console.error("Fehler beim Laden:", e.message);
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [currentPage]);

  return (
    <>
      <div className="border p-5">
        <div>Homepage!</div>
        <RubrikenComponent rubrik={rubrik} setRubrik={setRubrik} />
        <h2>{rubrik}</h2>
        <div className="p-5 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 flex-wrap">
          {angezeigteArtikel.map((article) => (
            <ArticleComponent article={article} key={article.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
