class CourseElement extends HTMLElement {
    static get observedAttributes() {
        return ['course-name']; // Monitor only the 'course-name' attribute
    }

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a container for the content
        this.container = document.createElement('div');
        shadow.appendChild(this.container);
    }

    connectedCallback() {
        this.updateContent();
    }

    attributeChangedCallback() {
        this.updateContent();
    }

    updateContent() {
        const courseName = this.getAttribute('course-name') || 'Unnamed Course';

        // Populate the container with course name and checkbox
        this.container.innerHTML = `
            <style>
                div {
                    font-family: Arial, sans-serif;
                    display: flex; /* Enables flexbox */
                    align-items: center;
                    justify-content: space-between; /* Ensures proper spacing */
                    padding: 10px;
                    background-color: none;
                    border-radius: 4px;
                    
                }
                label {
                    font-size: 16px;
                    color: black;
                    margin-right: 5px; /* Adjust the spacing between the label and checkbox */
                }
                input[type="checkbox"] {
                    margin-left: 0; /* Remove extra margin if any */
                    transform: scale(1.5);
                }
            </style>
            <label>${courseName}</label>
            <input type="checkbox" id="courseCheckbox">
        `;
    }
}

customElements.define('course-element', CourseElement);
