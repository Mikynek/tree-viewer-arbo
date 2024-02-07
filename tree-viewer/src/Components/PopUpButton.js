import React, { useState } from 'react';
import PopUpWindow from './PopUpForm';

const PopUpButton = () => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  return (
    <div>
      <button className="FormButton" onClick={openPopUp}>
        Edit Tree
      </button>

      {isPopUpOpen && <PopUpWindow onClose={closePopUp} />}
    </div>
  );
};

export default PopUpButton;