const form = document.getElementById("form");
const search = document.getElementById("search");

function DayOfWeek() {
    day = new Date()
    number_day = day.getDay()
    days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayLabel = document.getElementById("Dia")
    dayLabel.innerHTML = days[number_day]
}
DayOfWeek()
async function GetWeather(city) {
    try {
        const { coord, weather, main, sys, name, wind } = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + city + `&appid=053fad7e373bb77049e3182c72334a5a`).then(response => response.json());

        const [Weather] = weather

        const NotFound = document.getElementById("notfound")
        NotFound.innerHTML = ""

        const CityAndCountry = `${name}, ${sys.country}`
        const ubication = document.getElementById("Ubicacion")
        ubication.innerHTML = CityAndCountry
        //Clear Clouds
        const Temp = main.temp
        function KelvinToC(Temp) {
            return (Temp - 273.15).toFixed(0)
        }
        const temperature = document.getElementById("Temperatura")
        temperature.innerHTML = KelvinToC(Temp) + '°C'

        const WeatherSky = [Weather][0].main
        const temperaturedetails = document.getElementById("DetallesTemperatura")
        temperaturedetails.innerHTML = WeatherSky

        const CityHumidity = main.humidity
        const humidity = document.getElementById("Humedad")
        humidity.innerHTML = CityHumidity + '%'

        const CityWind = wind.speed
        function MsToKh(CityWind) {
            return (CityWind * 3.6).toFixed(2)
        }
        const windLabel = document.getElementById("Viento")
        windLabel.innerHTML = MsToKh(CityWind) + 'km/h'

        const CityLon = coord.lon
        const lonLabel = document.getElementById("Longitud")
        lonLabel.innerHTML = CityLon

        const CityLat = coord.lat
        const latLabel = document.getElementById("Latitud")
        latLabel.innerHTML = CityLat
        const imgLabel = document.getElementById("weathericon")
        imgLabel.src = `http://openweathermap.org/img/wn/${[Weather][0].icon}@2x.png`
    } catch (err) {
        const NotFound = document.getElementById("notfound")
        NotFound.innerHTML = "City not found"
    }
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = search.value;

    if (city) {
        GetWeather(city)
    }

});
