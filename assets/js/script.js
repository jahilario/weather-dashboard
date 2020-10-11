function getSearchVal() {
    var searchValue = document.querySelector("#search-city").value;
    searchWeather(searchValue);
    
  }

  function searchWeather(searchValue) {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
  
      // clear any old content
      todayEl = document.querySelector("#today");
      todayEl.textContent = "";
  
      // weather for today
      var titleEl = document.createElement("h2")
      titleEl.classList.add("card-title");
      titleEl.textContent = data.name + " (" + new Date().toLocaleDateString() + ")";
      var cardEl = document.createElement("div");
      cardEl.classList.add("card");
      var windEl = document.createElement("p");
      windEl.classList.add("card-text");
      var humidEl = document.createElement("p");
      humidEl.classList.add("card-text");
      var tempEl = document.createElement("p");
      tempEl.classList.add("card-text");
      humidEl.textContent = "Humidity: " + data.main.humidity + " %";
      tempEl.textContent = "Temperature: " + data.main.temp + " °F";
      var cardBodyEl = document.createElement("div");
      cardBodyEl.classList.add("card-body");
      var imgEl = document.createElement("img");
      imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
  
      titleEl.appendChild(imgEl)
      cardBodyEl.appendChild(titleEl);
      cardBodyEl.appendChild(tempEl);
      cardBodyEl.appendChild(humidEl);
      cardBodyEl.appendChild(windEl);
      cardEl.appendChild(cardBodyEl);
      todayEl.appendChild(cardEl);
  
      getForecast(searchValue);
      getUVIndex(data.coord.lat, data.coord.lon);
    }
  )}

  //UV Index
    function getUVIndex(lat, lon) {
    fetch("http://api.openweathermap.org/data/2.5/uvi?appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=" + lat + "&lon=" + lon)
    .then(function(response){
      return response.json();
    }).then(function(data){
      var bodyEl = document.querySelector(".card-body");
      var uvEl = document.createElement("p");
      uvEl.textContent = "UV Index: "
      var buttonEl = document.createElement("span");
      buttonEl.innerHTML = data.value;
  
      bodyEl.appendChild(uvEl);
      uvEl.appendChild(buttonEl);
    })
  }
  
  

  
  document.querySelector("#search-button").addEventListener("click", getSearchVal);
  