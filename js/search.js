// search.js
function runSearch(rawValue) {
  const value = String(rawValue || "").toLowerCase().trim();
  const sections = document.querySelectorAll(".product-section");
  const searchContainer = document.getElementById("searchResults");
  const noResults = document.getElementById("noResults");
  if (!searchContainer) return;

  let searchHeading = document.getElementById("searchHeading");
  if (!searchHeading) {
    searchHeading = document.createElement("h2");
    searchHeading.id = "searchHeading";
    searchHeading.className = "section-title";
    searchHeading.innerText = "Search Results";
    searchHeading.style.display = "none";
    searchContainer.insertAdjacentElement("beforebegin", searchHeading);
  }

  searchContainer.innerHTML = "";

  if (value) {
    let hasMatch = false;
    const addedNames = new Set();
    sections.forEach((sec) => (sec.style.display = "none"));

    const originalCards = document.querySelectorAll(".product-section .product-card");
    originalCards.forEach((card) => {
      const title = card.querySelector(".product-title")?.innerText.toLowerCase() || "";
      const desc = card.querySelector(".product-desc")?.innerText.toLowerCase() || "";
      const name = card.dataset.name;
      if ((title.includes(value) || desc.includes(value)) && !addedNames.has(name)) {
        hasMatch = true;
        addedNames.add(name);
        searchContainer.appendChild(card.cloneNode(true));
      }
    });

    searchHeading.style.display = "";
    searchContainer.style.display = hasMatch ? "" : "none";
    if (!hasMatch && noResults) {
      noResults.innerHTML = `<img src="assets/icons/NO-RESULTS.svg" alt="No results" /><p>No products found</p>`;
      noResults.style.display = "flex";
    } else if (noResults) noResults.style.display = "none";
  } else {
    sections.forEach((sec) => (sec.style.display = ""));
    searchHeading.style.display = "none";
    searchContainer.style.display = "none";
    if (noResults) noResults.style.display = "none";
  }
}

document.getElementById("search")?.addEventListener("input", (e) => runSearch(e.target.value));
document.getElementById("mobile-search")?.addEventListener("input", (e) => runSearch(e.target.value));
