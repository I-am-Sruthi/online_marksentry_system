import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Modal from 'react-modal';

// Set the app element for accessibility
Modal.setAppElement('#root');

function ExcelUploader() {
  const [rollNumbers, setRollNumbers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        const rollNumbersColumn = sheetData.map(row => row[0]).filter(cell => cell);
        setRollNumbers(rollNumbersColumn);
        setCurrentIndex(0); // Reset index when a new file is uploaded
        setIsModalOpen(false); // Close the modal after file upload
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleNextRollNumber = () => {
    if (currentIndex < rollNumbers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Custom styles for the modal
  const customStyles = {
    content: {
      width: '500px', // Set the width of the modal
      height: '300px', // Set the height of the modal
      margin: 'auto', // Center the modal
    },
  };

  return (
    <div>
      <button onClick={openModal}>Upload Excel File</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Upload Excel File"
      >
        <h2>Upload Excel File</h2>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <button onClick={closeModal}>Cancel</button>
      </Modal>
      <h3>Current Roll Number:</h3>
      <p>{rollNumbers[currentIndex]}</p>
      <button onClick={handleNextRollNumber} disabled={currentIndex >= rollNumbers.length - 1}>
        Next Roll Number
      </button>
    </div>
  );
}

export default ExcelUploader;
