let data = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    setupDarkMode();
});

// Load student/faculty data from JSON
function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(json => {
            data = json;
            setupEventListeners();
        })
        .catch(err => {
            console.error('Error loading data:', err);
            alert('Failed to load data.json');
        });
}

// Set up dark mode toggle
function setupDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Set up Student & Faculty buttons
function setupEventListeners() {
    document.getElementById('student-btn').addEventListener('click', handleStudentSearch);
    document.getElementById('faculty-btn').addEventListener('click', handleFacultySearch);
}

function handleStudentSearch() {
    const regNo = document.getElementById('student-reg').value.trim();
    const resultDiv = document.getElementById('student-result');

    if (!regNo) {
        resultDiv.innerHTML = `<div class="result-card" style="color:red;">Please enter a registration number.</div>`;
        return;
    }

    const student = data.students.find(s => s.reg_no === regNo);
    if (!student) {
        resultDiv.innerHTML = `<div class="result-card" style="color:red;">No student found.</div>`;
        return;
    }

    resultDiv.innerHTML = `
        <div class="result-card">
            <h3>Hall Information</h3>
            <p><strong>Registration No:</strong> ${student.reg_no}</p>
            <p><strong>Hall:</strong> ${student.hall}</p>
            <p><strong>Seat:</strong> ${student.seat}</p>
            <p><a href="${student.map_link}" target="_blank">View Hall Location</a></p>
            <div class="qr-code">
                <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(student.map_link)}&size=150x150" />
                <p>Scan for directions</p>
            </div>
            <button id="download-pdf">Download Hall Ticket</button>
        </div>
    `;

    document.getElementById('download-pdf').addEventListener('click', () => {
        downloadPDF(student); // This comes from generatePDF.js
    });
}

function handleFacultySearch() {
    const name = document.getElementById('faculty-name').value.trim().toLowerCase();
    const resultDiv = document.getElementById('faculty-result');

    if (!name) {
        resultDiv.innerHTML = `<div class="result-card" style="color:red;">Please enter a faculty name.</div>`;
        return;
    }

    const faculty = data.faculty.find(f => f.name.toLowerCase() === name);
    if (!faculty) {
        resultDiv.innerHTML = `<div class="result-card" style="color:red;">Faculty not found.</div>`;
        return;
    }

    resultDiv.innerHTML = `
        <div class="result-card">
            <h3>Duty Information</h3>
            <p><strong>Name:</strong> ${faculty.name}</p>
            <p><strong>Halls:</strong> ${faculty.halls.join(', ')}</p>
            <p><strong>Total Students:</strong> ${faculty.total_students}</p>
        </div>
    `;
}
