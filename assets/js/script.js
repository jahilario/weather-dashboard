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
  }//5-day forcast
  function getForecast(searchValue) {
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial")
    .then(function(response){
  
      return response.json();
    })
    .then(function(data){
      console.log(data)
      var forecastEl = document.querySelector("#forecast");
      forecastEl.innerHTML = "<h3 class=\"mt-3\">5-Day Forecast:</h3>";
      forecastRowEl = document.createElement("div");
      forecastRowEl.className = "\"row\"";
      for (var i = 0; i < data.list.length; i++) {
  
        
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
  
          //body for forcast
          var colEl = document.createElement("div");
          colEl.classList.add("col-md-3");
          var cardEl = document.createElement("div");
          cardEl.classList.add("card", "bg-primary", "text-white");
          var windEl = document.createElement("p");
          windEl.classList.add("card-text");
          windEl.textContent = "Wind Speed: " + data.list[i].wind.speed + " MPH";
          var humidityEl = document.createElement("p");
          humidityEl.classList.add("card-text");
          humidityEl.textContent = "Humidity : " + data.list[i].main.humidity + " %";
          var bodyEl = document.createElement("div");
          bodyEl.classList.add("card-body", "p-2");
          var titleEl = document.createElement("h4");
          titleEl.classList.add("card-title");
          titleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString()
          var imgEl = document.createElement("img")
          imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png" )
          var p1El = document.createElement("p");
          p1El.classList.add("card-text");
          p1El.textContent = "Temp: " + data.list[i].main.temp_max + " °F";
          var p2El = document.createElement("p");
          p2El.classList.add("card-text");
          p2El.textContent = "Humidity: " + data.list[i].main.humidity + "%";
  
          colEl.appendChild(cardEl);
          bodyEl.appendChild(titleEl);
          bodyEl.appendChild(imgEl);
          bodyEl.appendChild(windEl);
          bodyEl.appendChild(humidityEl);
          bodyEl.appendChild(p1El);
          bodyEl.appendChild(p2El);
          cardEl.appendChild(bodyEl);
          forecastEl.appendChild(colEl);
        }
      }
    });
  }
  
  

  
  document.querySelector("#search-button").addEventListener("click", getSearchVal);
  