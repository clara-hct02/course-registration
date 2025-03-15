async function getSavedScheduleIDs() {
    const response = await fetch('/getSavedScheduleIDs', {
      method: 'GET'
    })

    const myobject = await response.json();
    const select = document.getElementById('schedule-select');

    for(index in myobject) {
        var opt = myobject[index];
        select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    }
}

async function getSavedSchedule() {
    var scheduleID = document.getElementById("schedule-select");
    
    const response = await fetch('/getSavedSchedule' + scheduleID, {
        method: 'GET'
      })
  
      const myobject = await response.json();
      const select = document.getElementById('schedule-select');
}