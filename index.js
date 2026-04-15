const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

// Fetching weather alerts
async function fetchWeatherAlerts(state) {
  
  try {
    const response = await fetch(
      `https://api.weather.gov/alerts/active?area=${state}`
    );

    if(!response.ok) {
      throw new Error("Unable to fetch alerts");
    }

    const data = await response.json();
    console.log(data); 

    displayAlerts(data);
    clearUI();
  }
    
    catch (error) {
    console.error("Fetch error:", error);
    handleError(error);
  }
}

// Displaying alerts
 function displayAlerts(data) {
  alertsDisplay.innerHTML = "";

  const alerts = data.features;

  const summary = document.createElement("h3");
  summary.textContent = `${data.title}: ${alerts.length}`;
  alertsDisplay.appendChild(summary);

  //List
  const list = document.createElement("ul");

  alerts.forEach(alert => {
    const li = document.createElement("li");
    li.textContent = alert.properties.headline;
    list.appendChild(li);
  });

  alertsDisplay.appendChild(list);
  }

  //Clearing the UI
  function clearUI() {
    stateInput.value = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
  }

  //Handling errors
  function handleError(error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  }

  // Event listener
  fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();

    if (!state) {
      handleError(new Error("Please enter a state abbreviation"));
      return;
    }

    fetchWeatherAlerts(state)
  })