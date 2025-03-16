let courseList = document.getElementById("search-results-list")
let worklistOptions = document.getElementById("worklistSelector")
let worklistSelectButton = document.getElementById("worklistSelectButton")
let searchForm = document.getElementById("search-form");

let formFilterData = {}

let actualData = []

let sampleWorklists = [{worklistName: "sample1", courses:[{name: "Gamer 101", section: 100}]},{worklistName: "testingthis", courses:[]}]
//List of Lists of Courses
let worklists = []
let currentWorklists = sampleWorklists //temporary

let testCourseDisplay = (courseListData) => {
    for (let i = 0; i<courseListData.length;i++) {
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
    // worklist they chose
    let worklistName = worklistOptions.value;

    let courseElements = courseList.querySelectorAll('course-element');
    let currentWorklist = {};
    currentWorklists.forEach(worklist => {
        if (worklist.worklistName == worklistName) {
            currentWorklist = worklist;
        }
    });

    let pickedCourses = [];
    let anySelectionMade = false; // Flag to check if any selection was made

    for (let courseElement of courseElements) {
        const selectElement = courseElement.getSelectElement();
        const selectedValue = selectElement.value;
        const courseName = courseElement.getAttribute('course-name');
        const selectedText = selectElement.options[selectElement.selectedIndex].text;

        if (selectedValue != "default") {
            anySelectionMade = true; // Set the flag to true if any selection is made
            const exists = currentWorklist.courses.some(course => course.name === courseName);

            if (!exists) {
                let pickedCourseInfo = {
                    name: courseName,
                    section: parseInt(selectedValue, 10) // Convert to number here
                };
                pickedCourses.push(pickedCourseInfo);
            } else {
                showToast(`${courseName} is already in the worklist`);
                return;
            }
        }
    }

    if (!anySelectionMade) {
        showToast("Please select a section for at least one course.");
        return; // Stop the function if no selection was made
    }

    if (Object.keys(currentWorklist).length !== 0) {
        currentWorklist.courses.push(...pickedCourses);
        showToast(`Updated ${worklistName}!`);
        console.log(currentWorklist);
    }
};



worklistSelectButton.addEventListener('click', () => {
    updateWorklist();
})

worklistOptionDisplay(currentWorklists);

function filterCourses(courses, filters) {
    return courses.filter(course => {
      for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
          const filterValue = filters[key];
          if (filterValue !== "all" && course[key] !== filterValue) {
            return false; // Course doesn't match this filter
          }
        }
      }
      return true; // Course matches all filters
    });
}

function filterSectionsByCourse(sections, courseId) {
    return sections.filter(section => section.course === courseId);
}



async function getCourses() {
    try {
      const response = await fetch('http://localhost:3000/courses');
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Return the array of courses
  
    } catch (error) {
      console.error('Fetch Error:', error);
      return []; // Return an empty array in case of an error
    }
  }

  async function getSections() {
    try {
      const response = await fetch('http://localhost:3000/sections');
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data; // Return the sections data
  
    } catch (error) {
      console.error('Fetch Error:', error);
      return []; // Return an empty array on error
    }
  }
  
  async function processSections(courseId) {
    const sections = await getSections();
    if (sections && Array.isArray(sections)) {
      //console.log("Sections array:", sections);
  
      // Filter sections by course ID
      const filteredSections = sections.filter(section => section.course === courseId);
      //console.log("Filtered Sections:", filteredSections);
  
      return filteredSections; // Return the filtered sections
  
    } else {
      console.log("Failed to retrieve sections, or no sections returned.");
      return [];
    }
  }

async function processCourses(){
    let courses = await getCourses();
    let filters = {dept:formFilterData.dept}
    let filtered = filterCourses(courses,filters)
    
    return filtered
}



searchForm.addEventListener('submit',  async (event)=>{
    event.preventDefault();
    courseList.innerHTML = ``
  const formData = new FormData(searchForm);
  const query = formData.get('query');
  const category = formData.get('category');

  formFilterData = {
    query: query,
    dept: category
  };

  const filterCourses = await processCourses();
  console.log(filterCourses);

  actualData = []; // Clear actualData before processing new form submission

  for (const course of filterCourses) {
    const courseSections = await processSections(course._id);
    console.log(courseSections);

    let sectionNumbers = [];
    courseSections.forEach((section) => {
      const parsedSectionCode = parseInt(section.sectionCode);
      if (!isNaN(parsedSectionCode)) {
        sectionNumbers.push(parsedSectionCode);
      }
    });

    actualData.push({
      name: course.title,
      sections: sectionNumbers
    });
  }
  console.log(actualData)
  testCourseDisplay(actualData);
  // Store actualData in session storage
  sessionStorage.setItem('worklists', JSON.stringify(actualData));
})
