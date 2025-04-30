const params = new URLSearchParams(window.location.search);
const id = params.get("picId");

const myKey = "KPCKRfpaFG3Zke49zXyihp9SnbxV1fj2YY9q5hxrUhh7jcpGueP0Xpje";
const url = "https://api.pexels.com/v1/photos/";
const titleNav = document.getElementById("titolo-main");
titleNav.innerText = "Dettaglio " + id;

fetch(url + id, {
  method: "GET",
  headers: {
    Authorization: `${myKey}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("error in fetch");
    }
    return response.json();
  })
  .then((data) => {
    generateDetail(data);
  })
  .catch((error) => {
    console.log(error);
  });

const generateDetail = (pic) => {
  const row = document.getElementById("detail-container");
  row.innerHTML = "";

  const col = document.createElement("div");
  col.className = "col-12";
  const card = document.createElement("div");
  card.className = "card mb-4 shadow-sm";
  const img = document.createElement("img");
  img.src = pic.src.original;
  img.className = "bd-placeholder-img card-img-top";
  card.appendChild(img);
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = pic.photographer;
  const text = document.createElement("p");
  text.className = "card-text";
  text.textContent = pic.alt;
  const footer = document.createElement("div");
  footer.className = "d-flex justify-content-between align-items-center";
  const small = document.createElement("small");
  small.className = "text-muted";
  small.textContent = pic.id;
  footer.appendChild(small);

  cardBody.appendChild(title);
  cardBody.appendChild(text);
  cardBody.appendChild(footer);

  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);

  //change bg of page
  const main = document.getElementsByTagName("main")[0];
  console.log(main);

  main.style.backgroundColor = pic.avg_color;
};
