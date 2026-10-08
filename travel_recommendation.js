// JSON file se data load karo
let travelData = {};

fetch("travel_recommendation_api.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    travelData = data; // data save kar lo
  })
  .catch(function (error) {
    console.log("Error loading data: " + error);
  });

// Search button dabane par
document.getElementById("searchBtn").addEventListener("click", function () {
  var keyword = document.getElementById("searchInput").value.toLowerCase().trim();
  searchRecommendations(keyword);
});

// Enter key dabane par bhi search ho
document.getElementById("searchInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    var keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    searchRecommendations(keyword);
  }
});

// Clear button - input aur results saaf karo
document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("searchInput").value = "";
  document.getElementById("results").innerHTML = "";
});

// Keyword ke hisaab se recommendations nikalo
function searchRecommendations(keyword) {
  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // purane results saaf karo
  var items = [];

  if (keyword.includes("beach")) {
    items = travelData.beaches || []; // beach/beaches likha to beaches dikhao
  } else if (keyword.includes("temple")) {
    items = travelData.temples || []; // temple/temples likha to temples dikhao
  } else if (keyword.includes("country")) {
    items = travelData.countries || []; // country/countries likha to countries dikhao
  } else {
    // warna country ke naam se match karo (jaise japan, italy)
    var all = travelData.countries || [];
    items = all.filter(function (c) {
      return c.name.toLowerCase().includes(keyword);
    });
  }

  if (items.length === 0) {
    resultsDiv.innerHTML = "<p>No recommendations found. Try beach, temple, or country.</p>";
    return;
  }

  // har item ka card banao aur dikhao
  items.forEach(function (item) {
    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      "<img src='" + item.imageUrl + "' alt='" + item.name + "'>" +
      "<h3>" + item.name + "</h3>" +
      "<p>" + item.description + "</p>";
    resultsDiv.appendChild(card);
  });
}
