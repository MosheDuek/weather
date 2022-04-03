const container = document.getElementById('content');

function colorChange(temp) {
console.log(temp)

    if ((temp > 20) && (temp < 26)) {
       console.log('green')
        
    }

    else if ((26 < temp) && (temp < 29)) {
       console.log('yellow')
       
    }

    else if (temp > 30) {
        console.log('red')
    }

    else if (temp < 16) {
       console.log('blue')
    }

    else{
        console.log('white');
    }
   
}


let success = (pos) => {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    document.getElementById('beton').addEventListener('click', async () => {

        try {
            let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=he&appid=7828f6d29c61fe43f6006e99536a461b`).then((res) => (res.json()))
            console.log(data.main.temp);
            document.title = ` מזג אוויר - ${data.name}`
            container.innerHTML = `<div class="card">
            <h2>${data.name}</h2>
            <div class="top">
                <div class="deg">
                    <span id="color">${(data.main.temp -=273.15).toFixed(2)} &#8451;</span>
                    <span class="desc">${data.weather[0].description}</span>
                </div>
                <div class="deg-min-max">
                    <span class="max"><b>מקס':</b>${(data.main.temp_max -= 273.15).toFixed(1)} &#8451;</span>
                    <span class="min"><b>מינ':</b>${(data.main.temp_min -= 273.15).toFixed(1)} &#8451;</span>
                </div>
                <div class="more-desc">
                    <span><b>מהירות הרוח: </b>${data.wind.speed}קמ"ש </span>
                    <span><b> לחות:</b> ${data.main.humidity}%</span>
                </div>
            </div>

           <!-- <div class="bottom">
                <h2>tomorrow</h2>
                <div class="tom">
                    <span><b>מחר יהיה:</b> 23.5 C</span>
                </div>
            </div> -->
            

        </div>`
        console.log(data.main.temp);
            colorChange(25);

        } catch (err) {
            console.log('error ' + err);
        }


    })
}
let error = (err) => {
    alert('לא הצלחנו לזהות את המיקום שלך בדוק בהגדרות האם המיקום פועל ונסה שוב')
}
navigator.geolocation.getCurrentPosition(success, error)


