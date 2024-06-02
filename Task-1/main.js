function validateForm() {
    const form = document.getElementById('resumeForm');
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
            valid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });

    return valid;
}

function generatePreview() {
    if (!validateForm()) {
        return;
    }

    const form = document.getElementById('resumeForm');
    const formData = new FormData(form);
    const template = `
        <div class="resume">
            <h1>{{name}}</h1>
            <p>{{email}}</p>
            <p>{{phone}}</p>
            <p>{{address}}</p>
            <section>
                <h2>Professional Summary</h2>
                <p>{{summary}}</p>
            </section>
            <section>
                <h2>Skills</h2>
                <p>{{skills}}</p>
            </section>
            <section>
                <h2>Education</h2>
                <p>{{education}}</p>
            </section>
            <section>
                <h2>Work Experience</h2>
                <p>{{workExperience}}</p>
            </section>
            <section>
                <h2>Projects</h2>
                <p>{{projects}}</p>
            </section>
        </div>
    `;
    let filledTemplate = template;
    formData.forEach((value, key) => {
        const placeholder = `{{${key}}}`;
        filledTemplate = filledTemplate.replace(new RegExp(placeholder, 'g'), value);
    });
    document.getElementById('preview').innerHTML = filledTemplate;
}

function downloadResume() {
    const previewContent = document.getElementById('preview');
    const doc = new jspdf.jsPDF();
    doc.fromHTML(previewContent.innerHTML, 10, 10);
    doc.save('resume.pdf');
}

window.generatePreview = generatePreview;
window.downloadResume = downloadResume;
