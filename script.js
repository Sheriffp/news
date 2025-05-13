const apiKey = "cbe03374d05d421eadeb8e8eef55a33b";

const blogContainer = document.getElementById("blog-container");

const SearchField = document.getElementById("search-input");

const SearchButton = document.getElementById("search-btn");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://cors-anywhere.com/https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch(error) {
    console.error("error fetching random news", error)
    return []
  }
}


SearchButton.addEventListener("click", async ()=> {
  const query = SearchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    } catch(error) {
      console.error("error fetching news by query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://cors-anywhere.com/https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch(error) {
    console.error("error fetching query news", error)
    return []
  }
}


function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  
  for (const article of articles) {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle = article.title.length > 30? article.title.slice(0, 30) + "..." : article.title; 
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDescription = article.description.length > 120? article.description.slice(0, 120) + "..." : article.description; 
    description.textContent = truncatedDescription;
    
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click",  ()=> {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  }
}

(async ()=> {
  try {
    const articles = await fetchRandomNews()
    displayBlogs(articles);
  } catch(error) {
    console.error("error fetching random news", error)
  }
})()
