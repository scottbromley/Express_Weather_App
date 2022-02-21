console.log("The client side JavaScript has been loaded into the app!!");

const searchForm = document.querySelector("form");
const search = document.querySelector("input");
const message_one = document.querySelector("#message-1");
const message_two = document.querySelector("#message-2");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  message_one.textContent = "Loading...";
  message_two.textContent = "";
  const location = search.value;

  if (location) {
      fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
          if (data.error) {
            message_one.textContent = data.error;
          } else {
            message_one.textContent = data.address;
            message_two.textContent = "The weather in " + data.search + " is currently "  + data.temperature + " degrees C. There is " + data.wind_speed  + " miles per hour of wind." 
          }
        });
      });
  }
});
