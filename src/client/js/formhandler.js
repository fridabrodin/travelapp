// Our HTML elements
const date = document.getElementById("date");
const cityName = document.getElementById("city");
const temp = document.getElementById("temp");
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
    let city = json.data[0].city_name;
    let description = json.data[0].weather.description;

    //Update the UI with the information sent from the server
    date.innerHTML = "Sounds fun! So, you are going to";
    cityName.innerHTML = city;
    temp.innerHTML = "The weather right now is: " + description;
  } catch (error) {
    console.log(error);
  }

}

export { handleSubmit }



