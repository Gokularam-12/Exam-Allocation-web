# Exam Hall & Faculty Allotment System

A simple web application to manage exam hall seating and faculty duty allocation.

## Features

- Student login to get hall, seat, and QR code for location
- Faculty login to see assigned halls and total students
- Download official hall ticket as PDF with QR code
- Admin panel to upload and preview CSV data for students and faculty
- Dark mode toggle for better user experience
- Responsive and clean design

## Technologies Used

- HTML5, CSS3, JavaScript
- jsPDF for PDF generation
- PapaParse for CSV parsing
- Google Maps integration for hall location
- QR code generation via external API

## How to Use

1. Clone or download this repository.
2. Open `index.html` in a modern browser.
3. For students: Enter registration number and click "Get Hall Info".
4. For faculty: Enter faculty name and click "Get Duty Info".
5. Download hall ticket PDF if available.
6. Admins can open `admin.html` to upload student/faculty CSV files for preview.

## File Structure

- `index.html` - Main app page for students and faculty
- `admin.html` - Admin CSV upload and preview
- `data.json` - Data file containing student and faculty records
- `script.js` - Main JavaScript for app logic
- `generatePDF.js` - PDF generation for hall tickets
- `style.css` - Styling for the entire app
- `README.md` - This documentation

## Notes

- This is a frontend-only demo app; CSV uploads are previewed but not saved.
- Use a local server (like VSCode Live Server or Python's `http.server`) to avoid CORS issues when loading `data.json`.

## License

MIT License
