const tripItem = document.getElementById("main_grid");
let clicks = 0;


// clicker will help me with the creation and identification of new entries
function clicker() {
    clicks += 1;
    console.log(clicks);
    return clicks;
}

// checkers onto the date inputs. start date needs to be > than today. End date needs to be > start date
//document.getElementById("end").addEventListener('input', endDateCheck);
document.getElementById("start").addEventListener('input', startDateCheck);

/*
function endDateCheck(event) {
    event.preventDefault()
    const startDate = document.getElementById("start").value;
    const endDate = document.getElementById("end").value;
    if (new Date(endDate) < new Date(startDate)) {
        alert('really? End date before start date?')
        document.getElementById("end").value = '';
    }
}
*/
function startDateCheck(event) {
    event.preventDefault()
    const startDate = document.getElementById("start").value;
    if (new Date(startDate) - new Date() < 0) {
        console.log(startDate);
        alert('Well my friend, time travel is not yet available, so better choose a date in the future...');
        document.getElementById("start").value = '';
    }
}


// stuffed function that extracts all relevant data from APIs + puts it into the webpage
function getPic() {
    const cityEntered = document.getElementById("destination").value;
    const startTrip = document.getElementById("start").value;
    const EndTrip = document.getElementById("end").value;

    let counta = Client.clicker();

    postData('/pixaapi', { pixCity: cityEntered })
        .then((res) => {
            const imgurl = res.hits[0].webformatURL;

            postData('/geoapi', { latLong: cityEntered })
                .then((res) => {
                    const koords = [res.geonames[0].lat, res.geonames[0].lng];

                    const startTripCut = startTrip.substring(6, 7) + '-' + startTrip.substring(9, 10);
                    postData('/weatherapi', { lat: koords[0], lng: koords[1], from: startTripCut, to: startTripCut })
                        .then((res) => {
                            const weatherinfo = [res.data[0].min_temp, res.data[0].max_temp, res.data[0].wind_spd];

                            let NewItem = document.createElement('div');
                            NewItem.className = 'trip_item';
                            NewItem.setAttribute('id', `Div_${counta}`);
                            NewItem.innerHTML = `<h3 class="tripto " id="Item${counta}_title"> </h3>
        <div class="trippic" id="Item${counta}_pic"> </div>
        <div class="tripinfo"> 
          <ul class="liste">
            <li id="Item${counta}_From">        </li>
            <li id="Item${counta}_Weather">         </li>
            <li id="Item${counta}_Wind">     </li>
            
          </ul>
          <input id="Item${counta}_delete_me" type="button" value="" class="delete_button" onclick="return document.getElementById('Div_${counta}').innerHTML =''" > 
        </div>`;

                            tripItem.appendChild(NewItem);

                            const date1 = new Date(startTrip);
                            const date2 = new Date(EndTrip);
                            const Difference_In_Time = date1.getTime() - new Date();
                            const Difference_In_Time2 = date2.getTime() - date1.getTime();
                            // To calculate the no. of days between two dates
                            const startInDays = Math.floor(Difference_In_Time / (1000 * 3600 * 24));
                            const Difference_In_Days = Math.floor(Difference_In_Time2 / (1000 * 3600 * 24));

                            document.getElementById(`Item${counta}_title`).innerHTML = `Your  ${Difference_In_Days}-day trip to ${cityEntered} will start in ${startInDays} day(s)`;
                            document.getElementById(`Item${counta}_pic`).innerHTML = `<img src="${imgurl}">`;
                            document.getElementById(`Item${counta}_From`).innerHTML = `From ${startTrip} to ${EndTrip}`;
                            document.getElementById(`Item${counta}_Weather`).innerHTML = `Typically the temperature is from ${weatherinfo[0]} ° up to ${weatherinfo[1]} °Celcius `;
                            document.getElementById(`Item${counta}_Wind`).innerHTML = `Wind during the period of time is usually ${weatherinfo[2]} knots strong`;
                        })
                })
        })

}

// as already done in Project 3, the weather journal
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};


export { getPic }
export { clicker }

export { startDateCheck }