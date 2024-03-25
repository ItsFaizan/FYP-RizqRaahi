import React, { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, onSubmit  }) => {
  const [donationQuality, setDonationQuality] = useState(0);
  const [behaviorQuality, setBehaviorQuality] = useState(0);
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(donationQuality, behaviorQuality, description);
   
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const renderStars = (count, setCount) => {
    const maxStars = 5;

    const handleStarClick = (star) => {
      setCount(star);
    };
  
    return (
      <div className="flex items-center">
        {Array.from({ length: maxStars }, (_, index) => (
          <span
            key={index}
            className="cursor-pointer text-2xl "
            onClick={() => handleStarClick(index + 1)}
          >
            {index < count ? '⭐' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className=" font-[Inter] fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center text-[#1ECF5A]">Leave a Review</h2>
        <div className="mb-4">
          <label htmlFor="donationQuality" className="block font-semibold">
            Donation Quality
          </label>
          {renderStars(donationQuality, setDonationQuality)}
        </div>
        <div className="mb-4">
          <label htmlFor="behaviorQuality" className="block font-semibold">
            Behavior Quality
          </label>
          {renderStars(behaviorQuality, setBehaviorQuality)}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            placeholder='Describe your experience here...'
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="border rounded-md p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 border border-[#1ECF5A] text-[#1ECF5A] px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#1ECF5A] text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
