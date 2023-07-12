let defaultcity = 'Mumbai';

let API = "402c3c77cbc234cb2d3e07affb5a9f6e"

function editcity(){
  let city = prompt("Please enter your city name");
  
  if (city != null) {
    console.log(city)
    defaultcity = city;
    fetc(defaultcity, API);
  };

};

fetc(defaultcity, API);

document.querySelector('#btnshare').disabled = false;

let date = new Date();
let day = date.toDateString().slice(3);
let time = date.toTimeString().slice(0, 5);
cat("#day", day);
cat("#time", time);


function fetc(defaultcity, API){
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultcity}&units=metric&appid=${API}`
  fetch(url)
  .then(response => response.json())
  .then(data => {
    writeData(data);
  })
  .catch(error => console.error(error));
};

function writeData(data) {
  document.querySelector('#winddeg').classList.add(`-rotate-[${data.wind.deg}deg]`);
  document.querySelector('#icon').src = `asset/${data.weather[0].icon}@2x.png`;
  cat('#temp', data.main.feels_like+"°");
  cat('#cityname', data.name);
  cat('#info', data.weather[0].description);
  cat('#humidity', data.main.humidity+"%");
  cat('#windspeed', data.wind.speed+" m/s");
  cat('#visibility', (data.visibility/1000)+" km");
  cat('#pressure', (data.main.pressure*0.00098)+" atm");
  cat('#shmin', data.main.temp_min+" c");
  cat('#shmax', data.main.temp_max+" c");

  // Convert to milliseconds and
  // then create a new Date object
  let dateObj = new Date(data.sys.sunrise * 1000);
  let utcString = dateObj.toUTCString();
  let time = utcString.slice(-11, -4);
  cat('#rise', time);

  let dateObj2 = new Date(data.sys.sunset * 1000);
  let utcString2 = dateObj2.toUTCString();
  let time2 = utcString2.slice(-11, -4);
  cat('#set', time2);

}

function cat(id, props){
  document.querySelector(id).innerText = props;
}

