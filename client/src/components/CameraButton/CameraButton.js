import React from "react";

function CameraButton({ cameraClickHandle, camera, selectedCamera }) {
  let buttonClass;
  if (selectedCamera === camera) {
    buttonClass = "toolbar__button toolbar__button--active";
  } else {
    buttonClass = "toolbar__button";
  }
  return (
    <button
      type='button'
      value='button'
      id={camera}
      className={buttonClass}
      onClick={cameraClickHandle}>
      {camera}
    </button>
  );
}

export default CameraButton;
