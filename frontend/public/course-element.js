class CourseElement extends HTMLElement {
    static get observedAttributes() {
        return ['course-name'];
    }

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a container for the content
        this.container = document.createElement('div');
        shadow.appendChild(this.container);

        // Create and append the select element
        this.selectElement = document.createElement('select');
        this.selectElement.id = 'courseSelect';
        this.selectElement.innerHTML = `
            <option value="default" disable selected>Choose an section</option>
        `;

        // Create and append a label
        this.label = document.createElement('label');
        this.label.textContent = 'Unnamed Course';
        this.label.htmlFor = this.selectElement.id;

        // Append the elements to the container
        this.container.appendChild(this.label);
        this.container.appendChild(this.selectElement);

        // Style the container
        const style = document.createElement('style');
        style.textContent = `
            div {
                font-family: Arial, sans-serif;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
                padding: 10px;
            }
            label {
                font-size: 16px;
                color: black;
            }
            select {
                padding: 5px;
                font-size: 14px;
            }
        `;
        shadow.appendChild(style);
    }

    connectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'course-name') {
            this.label.textContent = newValue || 'Unnamed Course';
        }
    }

    // New method to add options to the select element
    addOptions(options) {
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            this.selectElement.appendChild(opt);
        });
    }

    getSelectElement() {
        return this.selectElement;
    }
}

customElements.define('course-element', CourseElement);
