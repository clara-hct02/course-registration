let courseList = document.getElementById("search-results-list")
let worklistOptions = document.getElementById("worklistSelector")
let worklistSelectButton = document.getElementById("worklistSelectButton")
let sampleData =  [
    {name:"Gamer 101", sections:[100,149,132]},
    {name:"Wonyoung 200", sections:[200,291,212]},
    {name:"Discrete Math 420", sections:[400,410,416]},
    {name:"Hybe 400", sections:[423,456,473]},
]

let sampleWorklists = [{worklistName: "sample1", courses:[{name: "Gamer 101", section: 100}]},{worklistName: "testingthis", courses:[]}]
//List of Lists of Courses
let worklists = []
let currentWorklists = sampleWorklists //temporary

let testCourseDisplay = (courseListData) => {
    for (let i = 0; i<sampleData.length;i++) {
        const li = document.createElement("li")

        const courseElement = document.createElement('course-element')

        courseElement.setAttribute("course-name",courseListData[i].name)

        courseElement.addOptions(courseListData[i].sections)

        li.appendChild(courseElement)

        courseList.appendChild(li)
    }
}

let worklistOptionDisplay = (worklists) => {
    for (let i = 0; i < worklists.length; i++) {
        const worklistOption = document.createElement('option')

        worklistOption.value = worklists[i].worklistName
        worklistOption.textContent = worklists[i].worklistName
        worklistOption.className = "worklist-selector"
        worklistOptions.appendChild(worklistOption)
    }
}

let showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
  
    // Show the toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 10); // Small delay to ensure the transition works
  
    // Hide the toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
          document.body.removeChild(toast);
      }, 300); //remove the toast after the fade out transition.
    }, 3000);
  }

  let updateWorklist = () => {
    //worklist they chose
    let worklistName = worklistOptions.value;

    let courseElements = courseList.querySelectorAll('course-element');
    let currentWorklist = {};
    currentWorklists.forEach(worklist => {
        if (worklist.worklistName == worklistName) {
            currentWorklist = worklist;
        }
    });

    let pickedCourses = [];
    for (let courseElement of courseElements) { // Use a for...of loop to enable early returns
        const selectElement = courseElement.getSelectElement(); // Access the <select> element
        const selectedValue = selectElement.value; // Get the value of the selected option
        const courseName = courseElement.getAttribute('course-name');
        const selectedText = selectElement.options[selectElement.selectedIndex].text; // Get the text of the selected option

        if (selectedValue != "default") {
            const exists = currentWorklist.courses.some(course => course.name === courseName);

            if (!exists) {
                let pickedCourseInfo = {
                    name: courseName,
                    section: selectedValue
                };
                pickedCourses.push(pickedCourseInfo);
            } else {
                showToast(`${courseName} is already in the worklist`); //Modified to show course name.
                return; // Immediately stop the function
            }
        }
    }

    if (Object.keys(currentWorklist).length !== 0) { // Check if currentWorklist is not empty object.
        currentWorklist.courses.push(...pickedCourses);
        showToast(`Updated ${worklistName}!`);
        console.log(currentWorklist);
    }
};



worklistSelectButton.addEventListener('click', () => {
    updateWorklist();
})

testCourseDisplay(sampleData);
worklistOptionDisplay(currentWorklists);