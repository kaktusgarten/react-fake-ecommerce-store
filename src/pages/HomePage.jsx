import RubrikenComponent from "../components/RubrikenComponent";
import { useEffect, useState, useContext } from "react";
// Ausgelagerter API-Call:
import { getArticles } from "../api/getArticles";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(
    "https://fakestoreapi.com/products"
  );

  const [articles, setArticles] = useState([]);
  const [rubrik, setRubrik] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [angezeigteArtikel, setAngezeigteArtikel] = useState(articles);

  // useEffect muss immer benutzt werden um auf änderungen zu reagieren. Nicht nur für Api Calls:
  // Hier wird auch gleich gefiltert fall rubrik angegeben wurde:
  useEffect(() => {
    if (rubrik) {
      setAngezeigteArtikel(articles.filter((a) => a.category === rubrik));
    } else {
      setAngezeigteArtikel(articles);
    }
  }, [articles, rubrik]);

  // USE EFFECT - Hole Daten
  // Hier ein ausgelagerter Api Call aus "api/getArticles.jsx" innerhalb eine useEffect().
  // Beispiel für NICHT ausgelagerten Call in "api/getRubriken.jsx"
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const data = await getArticles(currentPage, abortController.signal);
        setArticles(data);
        console.log(data);
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
        <div>{rubrik}</div>
        <div className="p-5 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 flex-wrap">
          {angezeigteArtikel.map((article) => (
            <article key={article.id} className="border p-2">
              <img
                src={article.image}
                alt="Article Image"
                className="mx-auto h-3/6 max-h-[200px] object-contain"
              ></img>
              <div className="h-2/6 text-[0.6em] p-3 mb-3 overflow-auto max-h-[100px]">
                {article.title}
              </div>
              <div className="h-1/6">
                <button className="btn">Add to card</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
