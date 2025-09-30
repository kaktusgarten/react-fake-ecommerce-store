export const getArticles = async (url, signal) => {
  try {
    const res = await fetch(url, { signal });

    if (!res.ok) {
      throw new Error("Api läuft nicht");
    }

    return await res.json();
  } catch (error) {
    // Fehler bewusst nach außen weitergeben
    throw error;
  }
};
