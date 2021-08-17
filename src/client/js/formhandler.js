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
    //Update the UI with the information sent from the server
    date.innerHTML = "So, this is what our analyze says about the article:";
    city.innerHTML = "Agreement: " + json.agreement;
    temp.innerHTML = "Subjectivity: " + json.subjectivity;
  } catch (error) {
    console.log(error);
  }

}

export { handleSubmit }