


// // const cityName = localStorage.getItem('city');




// // const city = document.getElementById('city');
// // city.innerText = cityName

// // const server = async () => {


// //     // const Server_Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=afbc99db955a3347823752de85e7e55a&units=metric`;


// //     const response = await fetch(Server_Url);
// //     const data = await response.json();

// //     return dataDetail(data);


// // }





// // const dataDetail = (data) => {

// //     if (!data.weather || data.weather.length === 0) {
// //         console.log("Weather data not available");

// //         const error = document.getElementById("error-msg");
// //         error.style.display = "block";

// //         const none = document.getElementById("rainDetail");
// //         none.style.display = "none"

// //         return;
// //     }









// //     const country = document.getElementById('country');
// //     const temp = document.getElementById('temp');
// //     const icon = document.getElementById('weathericon');
// //     const main = document.getElementById('weat-main');
// //     const desc = document.getElementById('weat-desc');
// //     const feel = document.getElementById('weat-feel');
// //     const vis = document.getElementById('visibility');
// //     const speed = document.getElementById('wind-speed');

// //     const dashboard = document.getElementById("weather-dashboard");

// //     const weathIcon = data.weather[0].icon;


// //     const iconLink = `https://openweathermap.org/img/wn/${weathIcon}@2x.png`



// //     country.innerText = data.sys.country;
// //     temp.innerText = data.main.temp;
// //     main.innerText = data.weather[0].main;
// //     desc.innerText = data.weather[0].description;
// //     speed.innerText = data.wind.speed;
// //     feel.innerText = data.main.feels_like;
// //     vis.innerText = data.visibility;

// //     icon.src = "https://openweathermap.org/img/wn/${data.weather[0].icon}"

// //     icon.src = iconLink


// //     if (data.weather[0].main === "Mist") {

// //         dashboard.style.backgroundImage = "url('mist1.gif')"
// //         dashboard.style.backgroundSize = "100% 100%";

// //     } else if (data.weather[0].main === "Thunderstorm") {

// //         dashboard.style.backgroundImage = "url('thunder.jpg')"
// //         dashboard.style.backgroundSize = "100% 100%";

// //     } else if (data.weather[0].main === "Rain") {

// //         dashboard.style.backgroundImage = "url('rain.webp')"
// //         dashboard.style.backgroundSize = "100% 100%";

// //     }
// //     else if (data.weather[0].main === "Snow") {

// //         dashboard.style.backgroundImage = "url('Snow')"
// //         dashboard.style.background = "linear-gradient(rgb(37 34 34),rgb(0 0 0 / 30%)),url(photo-1682687220499-d9c06b872eee.avif)"
// //         dashboard.style.backgroundSize = "100% 100%";

// //     } else if (data.weather[0].main === "Clear") {

// //         dashboard.style.backgroundImage = "url('clearsky1.jpg')"
// //         dashboard.style.backgroundSize = "100% 100%";

// //     }
// //     else if (data.weather[0].main === "Clouds") {

// //         dashboard.style.backgroundSize = "100% 100%";
// //         dashboard.style.background = "linear-gradient(rgb(37 34 34),rgb(0 0 0 / 30%)),url(brokencloud.jpg)"
// //         dashboard.style.backgroundRepeat = "no-repeat";


// //     }
// //     else if (data.weather[0].main === "Drizzle") {

// //         dashboard.style.backgroundImage = "url('drizzle.avif')"
// //         dashboard.style.backgroundSize = "100% 100%";


// //     }
// //     else if (data.weather[0].main === "Smoke") {

// //         dashboard.style.backgroundImage = "url('smoke.webp')"
// //         dashboard.style.backgroundSize = "100% 100%";

// //     }
// //     else if (data.weather[0].main === "Haze") {

// //         dashboard.style.backgroundImage = "url('haze.jpg')"
// //         dashboard.style.backgroundSize = "100% 100%";

// //     }
// //     else if (data.weather[0].main === "Fog") {

// //         dashboard.style.backgroundImage = "url('fog.jpg')"
// //         dashboard.style.backgroundSize = "100% 100%";

// //     }





// //     return data;
// // }

// // server();



// // const display = document.getElementById("open");

// // const smNav = document.getElementById('sm-nav');

// // display.addEventListener('click', (e) => {
// //     smNav.style.display = "block";
// //     smNav.style.transition = " 2.1s ease-in";



// //     console.log('adasd')
// // })
// // const close = document.getElementById("close");
// // close.addEventListener('click', (e) => {

// //     smNav.style.display = "none";


// // })



const CityName = document.querySelector("#name");
const showNextButton = document.querySelector("#showNext");
const dataContainer = document.querySelector("#data");

let myHttp = new XMLHttpRequest();
let array = [];
let currentIndex = 0;

// استرداد البيانات من التخزين المحلي إذا كانت موجودة
if (localStorage.getItem("Array") !== null) {
  array = JSON.parse(localStorage.getItem("Array"));
}

function GetDatat(type) {
  myHttp.open(
    "GET",
    ` https://api.weatherapi.com/v1/search.json?key=e670e7c089cc4f86be1162726241912&q=${type}`
  );
  myHttp.send();

  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState === 4 && myHttp.status === 200) {
      array = JSON.parse(myHttp.response);
      localStorage.setItem("Array", JSON.stringify(array));
      currentIndex = 0; // إعادة المؤشر لبداية القائمة
      dataContainer.innerHTML = ""; // مسح البيانات السابقة
    }
  });
}

function DisplayNext() {
  if (currentIndex < array.length) {
    const item = array[currentIndex];

    const cartona = `
    
      
        <figure class="name mt-5">
          <figcaption>${item.name || "Unknown Name"}</figcaption>
          <img src="https://flagsapi.com/${item.country || " GB"}/shiny/32.png">
        </figure>
        <figure class="temperature">
          <img src="https://openweathermap.org/img/wn/10d@4x.png">
          <figcaption>
            <span>${item.lon || "N/A"}</span>
            <sup>o</sup>
          </figcaption>
        </figure>
        <p class="description">${item.region || "No description available"}</p>
        <ul>
          <li>
            <span>Clouds</span>
            <i class="fa-solid fa-cloud"></i>
            <span id="clouds">${item.lat || 0}</span>%
          </li>
          <li>
            <span>Humidity</span>
            <i class="fa-solid fa-droplet"></i>
            <span id="humidity">${item.humidity || 12}</span>%
          </li>
          <li>
            <span>Pressure</span>
            <i class="fa-solid fa-gauge"></i>
            <span id="pressure">${item.pressure || 30}</span>hPa
          </li>
        </ul>
      
   
     `;

    dataContainer.innerHTML += cartona; // إضافة العنصر الجديد
    currentIndex++; // الانتقال إلى العنصر التالي
  } else {
    alert("No more items to display!");
  }
}

// استدعاء البيانات عند إدخال اسم المدينة
CityName.addEventListener("blur", function (e) {
  GetDatat(e.target.value);
});

// عرض العنصر التالي عند الضغط على الزر
showNextButton.addEventListener("click", DisplayNext);


// let id = '9505fd1df737e20152fbd78cdb289b6a';
// let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
// let city = document.querySelector('.name');
// let form = document.querySelector("form");
// let temperature = document.querySelector('.temperature');
// let description = document.querySelector('.description');
// let valueSearch = document.getElementById('name');
// let clouds = document.getElementById('clouds');
// let humidity = document.getElementById('humidity');
// let pressure = document.getElementById('pressure');
// let main = document.querySelector('main');
// form.addEventListener("submit", (e) => {
//     e.preventDefault();  
//     if(valueSearch.value != ''){
//         searchWeather();
//     }
// });
// const searchWeather = () => {
//     fetch(url+'&q='+ valueSearch.value)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             if(data.cod == 200){
//                 city.querySelector('figcaption').innerHTML = data.name;
//                 city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
//                 temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
//                 temperature.querySelector('span').innerText = data.main.temp;
//                 description.innerText = data.weather[0].description;

//                 clouds.innerText = data.clouds.all;
//                 humidity.innerText = data.main.humidity;
//                 pressure.innerText = data.main.pressure;
//             }else{
//                 main.classList.add('error');
//                 setTimeout(() => {
//                     main.classList.remove('error');
//                 }, 1000);
//             }
//             valueSearch.value = '';
//         })
// }
// // search Default
// const initApp = () => {
//     valueSearch.value = 'Washington';
//     searchWeather();
// }
// initApp();