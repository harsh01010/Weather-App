loc = `new delhi`;
const key = `fee915bc2f0cffb4bf8676829193719c`;

let l = document.querySelector(".loc");
let temp = document.querySelector(".temprature");
let wind = document.querySelector(".wind");
let press = document.querySelector(".pressure");

function KtoC(k) {
  return (k - 273.15).toFixed(3);
  const inp = document.querySelector(".inp");
}

const initial = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`;
async function updateData(url) {
  if (loc !== "") {
    try {
      const response = await fetch(url);
      const result = await response.json();
      l.innerHTML = `<h1>
	  ${loc.toUpperCase()}</h1>`;
      console.log(url);
      console.log(result);
      //updating  the temprature
      let t = KtoC(result.main.temp);
      let min_t = KtoC(result.main.temp_min);
      let max_t = KtoC(result.main.temp_max);
      let feels = KtoC(result.main.feels_like);
      temp.innerHTML = `Temprature :${t}&deg;C</br>Minimum Temprature :${min_t}&deg;C</br>Maximum Temprature :${max_t}&deg;C</br>Feels Like :${feels}&deg;C`;

      //updating wind speed
      let ws = (result.wind.speed * 1.60934).toFixed(3);
      let wd = result.wind.deg;
      wind.innerHTML = `Wind Speed: ${ws} Kmph</br>Wind Flow Angle:${wd}&deg;`;

      //updating pressures
      let pre = (result.main.pressure * 0.000987).toFixed(3);
      let humid = result.main.humidity;
      let weather = result.weather[0].main;
      press.innerHTML = `Pressure: ${pre}atm</br>Humidity:  ${humid}%</br>Weather: ${weather}`;
    } catch (error) {
		l.innerHTML = `<h1>Enter A Valid Location!</h1>`;
		temp.innerHTML = "N.A.";
		wind.innerHTML = "N.A.";
		press.innerHTML = "N.A.";
		
      console.error(error);
    } finally {
      console.log("process completed");
    }
  } else {
    alert("enter a valid location!");
    console.log("enter a valid location");
  }
}
updateData(initial);
// taking location form the input bar

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    console.log("hello world");
    loc = document.querySelector(".form-control").value;
    var new_url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${key}`;
    updateData(new_url);
  }
});
