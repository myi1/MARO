import React from "react";

function CameraButton({ cameraClickHandle, camera }) {
  return (
    <div className='toolbar__button-container'>
      <button
        type='button'
        value='button'
        className='toolbar__button'
        onClick={cameraClickHandle}>
        {camera}
      </button>
    </div>
  );
}

export default CameraButton;
