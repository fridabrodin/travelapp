// Our HTML elements
const date = document.getElementById("date");
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const button = document.getElementById("generate");

async function handleSubmit(event) {
  // event.preventDefault();
  // check what URL was put into the form field
  let news = document.getElementById("name").value;
  // Client.checkForName(news);
  // Send the URL to the server with a POST request
  const article = { news };
  const options = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  }

  // Get back the data including the API
  const res = await fetch("/api", options);
  try {
    const json = await res.json();
    console.log(json);
    let lat = json.geonames[0].lat;
    let long = json.geonames[0].lng;
    let country = json.geonames[0].countryName;
    //Update the UI with the information sent from the server
    date.innerHTML = "Here is some information";
    city.innerHTML = "Country: " + country;
    temp.innerHTML = "Long:" + long;
    content.innerHTML = "Lat:" + lat;
  } catch (error) {
    console.log(error);
  }

}

export { handleSubmit }