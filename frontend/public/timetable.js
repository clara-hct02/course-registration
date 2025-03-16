async function getRegisteredCourses(id) {
  const response = await fetch(`http://localhost:3000/course-lists/${id}`, {
    method: "GET",
  });

  const myobject = await response.json();
  return myobject;
}

async function getSectionDetails(id) {
  const response = await fetch(`http://localhost:3000/sections/${id}`, {
    method: "GET",
  });

  const myobject = await response.json();
  return myobject;
}

async function getCourseMetaDetails(id) {
  const response = await fetch(`http://localhost:3000/courses/${id}`, {
    method: "GET",
  });

  const myobject = await response.json();
  return myobject;
}

function addMinutesToTime(timeString, minutesToAdd) {
  // Split the time string into hours and minutes
  const [hours, minutes] = timeString.split(":").map(Number);

  // Calculate the total minutes
  let totalMinutes = hours * 60 + minutes + minutesToAdd;

  // Calculate the new hours and minutes
  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;

  // Format the new hours and minutes as a string
  const formattedHours = String(newHours).padStart(2, "0");
  const formattedMinutes = String(newMinutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

// Array of course objects
// let courses = [
//   { name: "Mathematics", day: "Monday", start: "09:00", end: "11:00" },
//   { name: "English", day: "Tuesday", start: "10:00", end: "12:00" },
//   { name: "Science", day: "Wednesday", start: "09:30", end: "10:30" },
//   { name: "History", day: "Thursday", start: "11:00", end: "12:30" },
//   { name: "Physics", day: "Friday", start: "13:00", end: "15:00" },
// ];

// Generate timetable rows
async function generateTimetable() {
  const timetableBody = document.querySelector("#timetable tbody");

  // just use index 0 for noew
  let arr = JSON.parse(sessionStorage.getItem("registrations"));
  let reg = await getRegisteredCourses(arr[0]);
  let courseIds = reg["courses"];
  let coursesData = [];
  for (const courseId of courseIds) {
    console.log(courseId);
    courseData = await getSectionDetails(courseId);
    if (courseData) {
      coursesData.push(courseData);
    }
  }
  let courses = [];
  console.log(coursesData);

  for (const courseData of coursesData) {
    for (const meetingDay of courseData.meetingTimes) {
      const courseDetails = await getCourseMetaDetails(courseData.course);
      const courseInstance = {
        name: `${courseDetails.dept} ${courseDetails.courseCode} ${courseData.sectionCode}`,
        day: meetingDay,
        start: courseData.startTime,
        end: addMinutesToTime(courseData.startTime, courseData.meetingLength),
      };
      courses.push(courseInstance);
    }
  }

  console.log(courses);

  timetableBody.innerHTML = ""; // Clear existing rows

  // Create hours (e.g., 8:00 to 18:00 in 30-minute increments)
  const hours = [];
  for (let h = 8; h < 18; h++) {
    hours.push(`${h.toString().padStart(2, "0")}:00`);
    hours.push(`${h.toString().padStart(2, "0")}:30`);
  }

  // Create a row for each time slot
  hours.forEach((hour) => {
    const row = document.createElement("tr");

    // Add the time label as the first column
    const hourCell = document.createElement("th");
    hourCell.textContent = hour;
    row.appendChild(hourCell);

    // Add empty cells for each day of the week
    [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].forEach((day) => {
      const cell = document.createElement("td");
      cell.id = `${day}-${hour}`; // Unique ID for each cell
      row.appendChild(cell);
    });

    timetableBody.appendChild(row);
  });

  // Populate the courses with merged and colored cells
  courses.forEach((course) => {
    const start = new Date(`1970-01-01T${course.start}`);
    const end = new Date(`1970-01-01T${course.end}`);
    const duration = (end - start) / (30 * 60 * 1000); // Calculate duration in 30-minute blocks
    const firstCellId = `${course.day}-${course.start}`;
    const firstCell = document.getElementById(firstCellId);

    if (firstCell) {
      firstCell.innerHTML = `<div class="course">${course.name}</div>`;
      firstCell.rowSpan = duration; // Merge cells based on duration
      firstCell.style.backgroundColor = "lightblue"; // Add custom background color
      firstCell.style.color = "white"; // Ensure text color is readable

      // Remove the now-unused cells
      let currentTime = new Date(start);
      currentTime.setMinutes(currentTime.getMinutes() + 30);
      while (currentTime < end) {
        const nextCellId = `${course.day}-${currentTime
          .toTimeString()
          .slice(0, 5)}`;
        const nextCell = document.getElementById(nextCellId);
        if (nextCell) {
          nextCell.remove();
        }
        currentTime.setMinutes(currentTime.getMinutes() + 30);
      }
    }
  });
}

// Initial timetable generation
generateTimetable();
