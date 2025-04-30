const myKey = "KPCKRfpaFG3Zke49zXyihp9SnbxV1fj2YY9q5hxrUhh7jcpGueP0Xpje";
const url = "https://api.pexels.com/v1/search?query=";
const primeBtn = document.getElementById("prime-btn");
const secondBtn = document.getElementById("second-btn");
const searchBar = document.getElementById("searchbar");

const fetchImages = (searchPara) => {
  fetch(url + searchPara, {
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
      const photos = data.photos;
      generateAlbum(photos);
    })
    .catch((error) => {
      console.log(error);
    });
};

const generateAlbum = (pics) => {
  const row = document.getElementById("album-container");
  row.innerHTML = "";

  pics.forEach((pic) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    const card = document.createElement("div");
    card.className = "card mb-4 shadow-sm";
    const img = document.createElement("img");
    img.src = pic.src.tiny;
    img.className = "bd-placeholder-img card-img-top";
    img.addEventListener("click", () => seeDetail(pic.id));
    card.appendChild(img);
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = pic.photographer;
    title.addEventListener("click", () => seeDetail(pic.id));
    const text = document.createElement("p");
    text.className = "card-text";
    text.textContent = pic.alt;
    const footer = document.createElement("div");
    footer.className = "d-flex justify-content-between align-items-center";
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";
    const viewBtn = document.createElement("button");
    viewBtn.type = "button";
    viewBtn.className = "btn btn-sm btn-outline-secondary";
    viewBtn.textContent = "View";
    const hideBtn = document.createElement("button");
    hideBtn.type = "button";
    hideBtn.className = "btn btn-sm btn-outline-secondary";
    hideBtn.textContent = "Hide";
    hideBtn.addEventListener("click", deletePic);
    btnGroup.appendChild(viewBtn);
    btnGroup.appendChild(hideBtn);
    const small = document.createElement("small");
    small.className = "text-muted";
    small.textContent = pic.id;
    footer.appendChild(btnGroup);
    footer.appendChild(small);

    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(footer);

    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });
};

const deletePic = () => {
  const cardToRemove = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
  cardToRemove.remove();
};

const beginSearch = () => {
  event.preventDefault();
  const input = document.getElementById("searchText").value;
  fetchImages(input);
};

const seeDetail = (picId) => {
  window.location.assign("./detail.html?picId=" + picId);
};

primeBtn.addEventListener("click", () => fetchImages("space"));
secondBtn.addEventListener("click", () => fetchImages("food"));
searchBar.addEventListener("submit", beginSearch);

// window.onload = () => {
//   fetchImages();
// };
