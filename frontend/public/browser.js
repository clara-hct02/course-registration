let courseList = document.getElementById("search-results-list")
let sampleData =  [
    {name:"Gamer 101"},
    {name:"Wonyoung 200"},
    {name:"Discrete Math 420"},
    {name:"Hybe 400"},
]

let testCourseDisplay = () => {
    for (let i = 0; i<sampleData.length;i++) {
        const li = document.createElement("li")

        const courseElement = document.createElement('course-element')

        courseElement.setAttribute('course-name',sampleData[i].name)

        li.appendChild(courseElement)

        courseList.appendChild(li)
    }
}

testCourseDisplay()