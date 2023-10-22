try {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));

  //check if app is in development or production
  const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
      window.location.hostname === "[::1]" ||
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );

  const API_URL = isLocalhost
    ? "http://localhost:4000/api/"
    : "https://pifortune-server.onrender.com/api/";

  const getProduct = async () => {
    const res = await fetch(`${API_URL}product/get/${id}`);
    const data = await res.json();

    console.log(data);
  };

  getProduct();
} catch (error) {
  console.log(error);
}
