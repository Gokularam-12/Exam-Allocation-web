function downloadPDF(student) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 62, 80);
    doc.text('OFFICIAL HALL TICKET', 105, 20, { align: 'center' });

    // Institution info
    doc.setFontSize(12);
    doc.text('University Examination Center', 105, 30, { align: 'center' });

    // Divider
    doc.line(20, 35, 190, 35);

    // Student info
    doc.setFontSize(14);
    doc.text('Student Information:', 20, 45);
    doc.setFontSize(12);
    doc.text(`Registration Number: ${student.reg_no}`, 20, 55);
    doc.text(`Hall Number: ${student.hall}`, 20, 65);
    doc.text(`Seat Number: ${student.seat}`, 20, 75);

    // QR Code
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(student.map_link)}&size=100x100`;
    doc.addImage(qrCodeUrl, 'JPEG', 80, 85, 50, 50);
    doc.text('Scan for hall location', 105, 140, { align: 'center' });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.line(20, 160, 190, 160);
    doc.text('This is an official document. Please present this ticket at the exam hall.', 105, 170, { align: 'center' });
    doc.text('© 2025 University Examination System', 105, 180, { align: 'center' });

    // Save PDF
    doc.save(`HallTicket_${student.reg_no}.pdf`);
}
