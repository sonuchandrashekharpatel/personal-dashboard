const authorName = document.getElementById("author-name")
const crypto = document.getElementById("crypto")
const time = document.getElementById("time")
const weather = document.getElementById("weather")

function updateTime() {
    const date = new Date()
    const currTime = date.toLocaleTimeString("en-us", {timeStyle: "short"})
    time.textContent = currTime
}
setInterval(updateTime, 1000)

try {
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    if(!res.ok) {
        throw Error ("Something went wrong")
    }
    const data = await res.json()
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    authorName.textContent = "By: " + data.user.name

} catch (err) {
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Nzk1MDE5NjV8&ixlib=rb-4.1.0&q=80&w=1080")`
    authorName.textContent = "By: Andrew Ridley"
}

try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    if(!res.ok) {
        throw Error("Something went wrong")
    }
    const data = await res.json()
    console.log(data)
    
    crypto.innerHTML = `
        <div class="crypto-top">
            <img class="crypto-icon" src=${data.image.small}>
            <p>${data.name}</p>
        </div>
        <p>📈  ₹ ${data.market_data.current_price.inr}</p>
        <p>🔼  ₹ ${data.market_data.high_24h.inr}</p>
        <p>🔽  ₹ ${data.market_data.low_24h.inr}</p>
    `
} catch (err) {
    console.log(err)
}

navigator.geolocation.getCurrentPosition(async position => {
    try {

        const lon = position.coords.longitude
        const lat = position.coords.latitude
    
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`)
        if(!res.ok) {
            throw Error("Weather data not available")
        }
        const data = await res.json()
            console.log(data)
            console.log(data.name, data.main.temp)
    
            const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            weather.innerHTML =`
                <div class="weather-top">
                    <img  class="weather-icon"src="${weatherIcon}" alt="weather icon">
                    <p class="temp">${Math.round(data.main.temp)}°C</p>
                </div>
                <p class="location">${data.name}</p>
            `
    } catch (err) {
        console.log(err)
    }
})
