// Our HTML elements
const intro = document.getElementById("intro");
const city = document.getElementById("city");
const when = document.getElementById("when");
const content = document.getElementById("content");

//Set value for travel date as the date of today
document.getElementById("travel-date").valueAsDate = new Date();

async function handleSubmit(event) {
  // event.preventDefault();

  // Check what city and travel date was put into the form field
  let news = document.getElementById("name").value;
  let travelDate = document.getElementById("travel-date").value;

  // Client.checkForName(news);

  // Send the city and date to the server with a POST request
  const information = { news, travelDate };
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
    intro.innerHTML = "Sounds fun! So, you are going to";
    city.innerHTML = json.city + " in " + json.days + " days";
    when.innerHTML = "Typical weather for then is: " + json.description + ", and about " + json.temp + "°C";
  } catch (error) {
    console.log(error);
  }

}

export { handleSubmit }



