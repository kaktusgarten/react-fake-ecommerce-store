const ArticleComponent = ({ article }) => {
  // BUTTON:
  const addToCardButton = (e) => {
    const id = e.target.dataset.id;
    console.log(id);

    const existing = JSON.parse(localStorage.getItem("cart")) || [];
    if (!existing.includes(id)) {
      existing.push(id);
      localStorage.setItem("cart", JSON.stringify(existing));
    }

    const articleStoreData =
      JSON.parse(localStorage.getItem("articleData")) || [];

    const exists = articleStoreData.some(
      (element) => element.id === article.id
    );
    if (!exists) {
      const updatedArticles = [...articleStoreData, article];
      localStorage.setItem("articleData", JSON.stringify(updatedArticles));
    }
  };

  return (
    <>
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
          <button
            data-id={article.id}
            className="btn"
            onClick={(e) => {
              addToCardButton(e);
            }}
          >
            Add to card
          </button>
        </div>
      </article>
    </>
  );
};

export default ArticleComponent;
