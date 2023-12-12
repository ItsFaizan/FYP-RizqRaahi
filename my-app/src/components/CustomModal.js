import React, { useEffect } from 'react';
import '../styles/CustomModal.css'; // Import your CSS file

export default function CustomModal({
  visible,
  closeModal,
  tableData,
  textColors,
  buttonLabels,
  onButtonPress,
}) {
  const textArray = ['Fresh', 'Perishable', 'Cooked'];
  const header = ['Donation Details'];

  // Add an event listener to handle clicks outside the modal
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (visible && e.target.classList.contains('modal')) {
        closeModal();
      }
    };

    if (visible) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [visible, closeModal]);

  return (
    <div className={`modal ${visible ? 'visible' : ''}`}>
      <div className="modal-container">
        <img
          src={require('../assets/donationbox.png')}
          alt="Donation Box"
          className="modal-image"
        />
        <h2 className="heading">Donation Announcement</h2>

        <div className="table-container">
          <div className="table-header">
            {header.map((headerText, index) => (
              <div key={index} className="table-header-text">
                {headerText}
              </div>
            ))}
          </div>

          {tableData.rows.map((row, rowIndex) => (
            <div key={rowIndex} className="table-row">
              {row.map((cell, cellIndex) => (
                <div key={cellIndex} className="table-row-text">
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-container">
          {textColors.map((color, index) => (
            <div
              key={index}
              className="colored-text"
              style={{ backgroundColor: color }}
            >
              {textArray[index]}
            </div>
          ))}
        </div>

        <div className="button-container">
          {buttonLabels.map((label, index) => (
            <button
              key={index}
              className="button"
              onClick={() => onButtonPress(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
