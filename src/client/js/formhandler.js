//Set value for travel date as the date of today
document.getElementById("travel-date").valueAsDate = new Date();

async function handleSubmit(event) {
  // event.preventDefault();

  // Check what city and travel date was put into the form field
  let location = document.getElementById("location").value;
  let travelDate = document.getElementById("travel-date").value;

  // Client.checkForName(news);

  // Send the city and date to the server with a POST request
  const information = { location, travelDate };
  const options = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(information),
  }

  // Get back the data including the API
  const res = await fetch("/api", options);
  try {
    //The data we are getting back from the server
    const json = await res.json();
    console.log(json);

    //Update the UI with the information sent from the server
    document.getElementById("intro").innerHTML = "You are going to " + json.weather.city + " in " + json.weather.days + " days!";
    document.getElementById("when").innerHTML = "Typical weather for then is: " + json.weather.description + ", and about " + json.weather.temp + "°C";
    document.getElementById("countryinfo").innerHTML = json.weather.city + " is in " + json.countryInfo.country + ", " + json.countryInfo.region + ".";
    document.getElementById("location-image").src = json.images.image;
    document.querySelector("figcaption").innerHTML = "Photo from <a href=\"https://pixabay.com/\" target=\"_blank\">Pixabay.com</a>";

  } catch (error) {
    console.log(error);
  }

}

export { handleSubmit }



