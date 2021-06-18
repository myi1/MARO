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
}) {
  return (
    <form className='toolbar'>
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
          <div class='dot'></div>
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
          <div class='dot'></div>
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
          <div class='dot'></div>
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
        defaultValue={max}
      />
      {/* {cameras.map((camera) => (
        <label htmlFor='spirit' className='toolbar__radio-button'>
          <input
            onClick={cameraClickHandle}
            type='radio'
            id={camera}
            name='camera'
            value={camera}
            key={camera}
            className='toolbar__input'
          />
          {camera}
        </label>
      ))} */}
      {cameras.map((camera) => (
        <CameraButton cameraClickHandle={cameraClickHandle} camera={camera} />
      ))}
    </form>
  );
}

export default Toolbar;
