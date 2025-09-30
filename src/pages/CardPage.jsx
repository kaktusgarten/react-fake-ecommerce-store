import { useEffect, useState } from "react";
import { getArticles } from "../api/getArticles";
// import CardArticleComponent from "../components/CardArticleComponent";

const CardPage = () => {
  const [articles, setArticles] = useState([]);
  const [cardArticles, setCardArticles] = useState([]);

  // Filter-Effekt: läuft neu, wenn articles sich ändern
  useEffect(() => {
    const cartIds = JSON.parse(localStorage.getItem("cart")) || [];
    // von ChatGPT gefiltert:
    const filtered = articles.filter((a) => cartIds.includes(String(a.id)));
    setCardArticles(filtered);
  }, [articles]);

  // 1.
  // Ueber LocalStorage die Articles holen, Alternative: diesen useEffect auskommentieren und den dadrunter einkommentieren
  useEffect(() => {
    setArticles(JSON.parse(localStorage.getItem("articleData")) || []);
  }, []);

  // 2.
  // Über API Call die Articles holen und nicht über LocalStorage
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const fetchData = async () => {
  //     try {
  //       const data = await getArticles(
  //         "https://fakestoreapi.com/products",
  //         abortController.signal
  //       );
  //       setArticles(data);
  //     } catch (e) {
  //       if (e.name === "AbortError") return;
  //       console.error("Fehler beim Laden:", e.message);
  //     }
  //   };

  //   fetchData();

  //   return () => abortController.abort();
  // }, []);

  return (
    <div className="border p-5">
      <div className="mb-4">Card Page!</div>
      {cardArticles.length === 0 && <div>Keine Artikel im Warenkorb</div>}
      {cardArticles.map((article) => (
        <article
          key={article.id}
          className="border border-black p-3 flex gap-3 mb-3"
        >
          <div>
            <img
              className="border w-[100px] h-[100px] object-contain"
              src={article.image}
              alt={article.title}
            />
          </div>
          <div>
            <div>{article.title}</div>
            <div className="text-sm text-gray-500">{article.price} €</div>
          </div>
        </article>
        // <CardArticleComponent article={article} key={article.id} />
      ))}
    </div>
  );
};

export default CardPage;
