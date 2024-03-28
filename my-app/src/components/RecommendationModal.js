import React, { useEffect } from 'react';
import '../styles/CustomModal.css'; // Import your CSS file
import { useTranslation } from 'react-i18next';

export default function RecommendationModal({
  visible,
  closeModal,
  tableData,
  textColors,
  buttonLabels,
  onButtonPress,
  onButtonPressLeftArrow,
  onButtonPressRightArrow,
  currentIndex,
  indexLimit,
  headerdetails,
}) {

  const { t } = useTranslation();
  const textArray = [t("freshword"), t("perishableword"), t("cookedword")]; 
  const header= [headerdetails];


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
      <div className="modal-container font-[Inter]">
        <img
          src={require('../assets/donationbox.png')}
          alt="Donation Box"
          className="modal-image"
        />
            <button
                style={{
                    position: 'relative',
                    top: 10,
                    right: "40%",
                    backgroundColor: currentIndex === 0 ? '#999999' : '#33FF57',
                    padding: 10,
                    borderRadius: 5,
                }}
                disabled={currentIndex === 0}
                onClick={() => {
                    if (currentIndex > 0) {
                        onButtonPressLeftArrow();
                    }
                }}
            >
                <span style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>&lt;</span>
            </button>

            <button
                style={{
                    position: 'relative',
                    top: -30,
                    left: "40%",
                    backgroundColor: currentIndex === indexLimit - 1 ? '#999999' : '#33FF57',
                    padding: 10,
                    borderRadius: 5,
                }}
                disabled={currentIndex === indexLimit - 1}
                onClick={() => {
                    if (currentIndex < indexLimit - 1) {
                        onButtonPressRightArrow();
                    }
                }}
            >
                <span style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>&gt;</span>
            </button>
        <h2 className="heading">{t("donationannouncementword")}</h2>

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
