// DOM Elements
const courseList = document.getElementById("search-results-list");
const worklistOptions = document.getElementById("worklistSelector");
const worklistSelectButton = document.getElementById("worklistSelectButton");
const searchForm = document.getElementById("search-form");

// Data
let formFilterData = {};
let actualData = [];
let sampleWorklists = [{ worklistName: "sample1", courses: [{ name: "Gamer 101", section: 100 }] }, { worklistName: "testingthis", courses: [] }];
let currentWorklists = sampleWorklists; // Temporary worklists

// Helper Functions
const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
};

const worklistOptionDisplay = (worklists) => {
    worklists.forEach(worklist => {
        const worklistOption = document.createElement('option');
        worklistOption.value = worklist.worklistName;
        worklistOption.textContent = worklist.worklistName;
        worklistOption.className = "worklist-selector";
        worklistOptions.appendChild(worklistOption);
    });
};

const testCourseDisplay = (courseListData) => {
    courseListData.forEach(course => {
        const li = document.createElement("li");
        const courseElement = document.createElement('course-element');
        courseElement.setAttribute("course-name", course.name);
        courseElement.addOptions(course.sections);
        li.appendChild(courseElement);
        courseList.appendChild(li);
    });
};

// Data Fetching and Processing
async function getCourses() {
    try {
        const response = await fetch('http://localhost:3000/courses');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
        return [];
    }
}

async function getSections() {
    try {
        const response = await fetch('http://localhost:3000/sections');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
        return [];
    }
}

async function processSections(courseId) {
    const sections = await getSections();
    if (sections && Array.isArray(sections)) {
        return sections.filter(section => section.course === courseId);
    } else {
        console.error("Failed to retrieve sections, or no sections returned.");
        return [];
    }
}

async function processCourses() {
    const courses = await getCourses();
    const filters = { dept: formFilterData.dept };
    return courses.filter(course => {
        for (const key in filters) {
            if (filters.hasOwnProperty(key)) {
                const filterValue = filters[key];
                if (filterValue !== "all" && course[key] !== filterValue) return false;
            }
        }
        return true;
    });
}

// Event Listeners
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    courseList.innerHTML = '';
    const formData = new FormData(searchForm);
    const query = formData.get('query');
    const category = formData.get('category');

    formFilterData = { query: query, dept: category };
    const filterCourses = await processCourses();

    actualData = [];
    for (const course of filterCourses) {
        const courseSections = await processSections(course._id);
        const sectionNumbers = courseSections.map(section => parseInt(section.sectionCode, 10)).filter(num => !isNaN(num));
        actualData.push({ name: course.title, sections: sectionNumbers });
    }

    testCourseDisplay(actualData);
    sessionStorage.setItem('worklists', JSON.stringify(actualData));
});

worklistSelectButton.addEventListener('click', () => {
    const worklistName = worklistOptions.value;
    const currentWorklist = currentWorklists.find(worklist => worklist.worklistName === worklistName) || { courses: [] };
    const pickedCourses = [];
    let anySelectionMade = false;
    let duplicateFound = false; // Add a flag to track duplicate course

    const courseElements = courseList.querySelectorAll('course-element');
    for (const courseElement of courseElements) {
        const selectElement = courseElement.getSelectElement();
        const selectedValue = selectElement.value;
        const courseName = courseElement.getAttribute('course-name');

        if (selectedValue !== "default") {
            anySelectionMade = true;
            if (!currentWorklist.courses.some(course => course.name === courseName)) {
                pickedCourses.push({ name: courseName, section: parseInt(selectedValue, 10) });
            } else {
                showToast(`${courseName} is already in the worklist`);
                duplicateFound = true; // Set the flag
                break; // Exit the loop
            }
        }
    }

    if (duplicateFound) { // Check the flag after the loop
        return; // Exit the function if a duplicate was found
    }

    if (!anySelectionMade) {
        showToast("Please select a section for at least one course.");
        return;
    }

    if (Object.keys(currentWorklist).length !== 0) {
        currentWorklist.courses.push(...pickedCourses);
        showToast(`Updated ${worklistName}!`);
        console.log(currentWorklist);
    }
});

// Initialization
worklistOptionDisplay(currentWorklists);