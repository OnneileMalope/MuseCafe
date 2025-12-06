document.addEventListener("DOMContentLoaded", function () {
  const cityTabs = document.querySelectorAll(".city-tab");
  const locationDetails = document.querySelectorAll(".location-details");
  const cardButtons = document.querySelectorAll(".card-btn");

  if (locationDetails.length > 0) {
    locationDetails[0].classList.add("active");
  }

  cityTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const city = this.getAttribute("data-city");

      cityTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      locationDetails.forEach((detail) => {
        detail.classList.remove("active");
        if (detail.id === city) {
          detail.classList.add("active");

          detail.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  });

  cardButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const city = this.getAttribute("data-city");

      cityTabs.forEach((tab) => {
        tab.classList.remove("active");
        if (tab.getAttribute("data-city") === city) {
          tab.classList.add("active");
        }
      });

      locationDetails.forEach((detail) => {
        detail.classList.remove("active");
        if (detail.id === city) {
          detail.classList.add("active");

          detail.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  });

  window.saveLocation = function (city) {
    const locations = JSON.parse(
      localStorage.getItem("savedLocations") || "[]"
    );

    if (!locations.includes(city)) {
      locations.push(city);
      localStorage.setItem("savedLocations", JSON.stringify(locations));

      alert(
        "Location saved! You can view saved locations in your browser storage."
      );

      const button = event.target.closest(".action-btn.save");
      if (button) {
        button.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        button.style.backgroundColor = "#4CAF50";
        button.style.borderColor = "#4CAF50";
        button.style.color = "white";
        button.disabled = true;
      }
    }
  };

  window.findNearestLocation = function () {
    const input = document.getElementById("locationInput");
    const results = document.getElementById("locationResults");

    if (!input.value.trim()) {
      results.innerHTML =
        '<p style="color: #ff6b6b; text-align: center;">Please enter an address or zip code.</p>';
      return;
    }

    results.innerHTML =
      '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Finding nearest location...</div>';

    setTimeout(() => {
      const mockResults = [
        {
          name: "Downtown Muse Cafe",
          distance: "0.8 miles",
          address: "123 Coffee Street",
          time: "15 min drive",
        },
        {
          name: "Uptown Muse Cafe",
          distance: "2.1 miles",
          address: "456 Park Avenue",
          time: "25 min drive",
        },
        {
          name: "Waterfront Muse Cafe",
          distance: "3.5 miles",
          address: "789 Bay View Drive",
          time: "35 min drive",
        },
      ];

      let html = '<h3 style="margin-bottom: 20px;">Nearest Locations:</h3>';
      mockResults.forEach((location) => {
        html += `
                    <div class="result-item" style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                        <h4 style="margin: 0 0 10px 0;">${location.name}</h4>
                        <p style="margin: 5px 0;"><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
                        <p style="margin: 5px 0;"><i class="fas fa-road"></i> ${location.distance} away (${location.time})</p>
                    </div>
                `;
      });

      results.innerHTML = html;
    }, 1500);
  };

  function initializeSavedLocations() {
    const savedLocations = JSON.parse(
      localStorage.getItem("savedLocations") || "[]"
    );
    savedLocations.forEach((city) => {
      const saveBtn = document.querySelector(
        `[onclick="saveLocation('${city}')"]`
      );
      if (saveBtn) {
        saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
        saveBtn.style.backgroundColor = "#4CAF50";
        saveBtn.style.borderColor = "#4CAF50";
        saveBtn.style.color = "white";
        saveBtn.disabled = true;
      }
    });
  }

  initializeSavedLocations();

  document
    .getElementById("locationInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        findNearestLocation();
      }
    });

  const geolocateBtn = document.createElement("button");
  geolocateBtn.innerHTML =
    '<i class="fas fa-location-crosshairs"></i> Use My Location';
  geolocateBtn.className = "find-btn";
  geolocateBtn.style.marginTop = "10px";
  geolocateBtn.onclick = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          document.getElementById("locationInput").value = `${lat}, ${lng}`;
          findNearestLocation();
        },
        function (error) {
          alert("Unable to get your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  document.querySelector(".location-finder").appendChild(geolocateBtn);
});
