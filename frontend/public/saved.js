async function getSavedScheduleIDs() {
    console.log("getting IDs");
    const response = await fetch('/getSavedScheduleIDs', {
      method: 'POST',
      body: JSON.stringify({userid: id})
    })

    const myobject = await response.json();
    const select = document.getElementById('schedule-select');

    for(index in myobject) {
        var opt = myobject[index];
        select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    }
}

async function getSavedSchedule(event) {
    event.preventDefault();
    console.log("listener added");

    var scheduleName = document.getElementById("schedule-select");

    const response = await fetch('/getSavedSchedule', {
      method: 'POST',
      body: JSON.stringify({userid: id, name: scheduleName})
    })
  
    const myobject = await response.json();
}

window.onload = function() {
    getSavedScheduleIDs();
    document.getElementById("choose-schedule").addEventListener("submit", getSavedSchedule);
}