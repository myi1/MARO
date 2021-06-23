import React from "react";
import CameraButton from "../CameraButton/CameraButton";
import "./Toolbar.scss";

function Toolbar({
  roverClickHandle,
  min,
  max,
  dateClickHandle,
  cameras,
  cameraClickHandle,
  activeName,
  selectedCamera,
}) {
  return (
    <div className='toolbar'>
      <div className='wrapper'>
        <input
          onClick={roverClickHandle}
          type='radio'
          // id='curiosity'
          name='rover'
          value='curiosity'
          defaultChecked
          className='toolbar__input toolbar__input--1'
          id='rover-option-1'
        />
        <label htmlFor='rover-option-1' className='option option-1'>
          <div className='dot'></div>
          <span>Curiosity</span>
        </label>
        <input
          onClick={roverClickHandle}
          type='radio'
          // id='opportunity'
          id='rover-option-2'
          name='rover'
          value='opportunity'
          className='toolbar__input toolbar__input--2'
        />
        <label htmlFor='rover-option-2' className='option option-2'>
          <div className='dot'></div>
          <span>Opportunity</span>
        </label>
        <input
          onClick={roverClickHandle}
          type='radio'
          // id='spirit'

          name='rover'
          value='spirit'
          className='toolbar__input toolbar__input--3'
          id='rover-option-3'
        />
        <label htmlFor='rover-option-3' className='option option-3'>
          <div className='dot'></div>
          <span>Spirit</span>
        </label>
      </div>
      <input
        onChange={dateClickHandle}
        type='date'
        id='date'
        name='date'
        min={min}
        max={max}
        // defaultValue={max}
        className='toolbar__date'
      />

      <div className='toolbar__button-container'>
        {cameras.map((camera) => (
          <CameraButton
            cameraClickHandle={cameraClickHandle}
            name={camera}
            camera={camera}
            selectedCamera={selectedCamera}
          />
        ))}
      </div>
    </div>
  );
}

export default Toolbar;
