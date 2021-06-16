import React from "react";

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
      <input
        onClick={roverClickHandle}
        type='radio'
        id='curiosity'
        name='rover'
        value='curiosity'
        defaultChecked
      />
      <label htmlFor='curiosity' className='toolbar__radio-button'>
        Curiosity
      </label>
      <input
        onClick={roverClickHandle}
        type='radio'
        id='opportunity'
        name='rover'
        value='opportunity'
      />
      <label htmlFor='opportunity' className='toolbar__radio-button'>
        Opportunity
      </label>
      <input
        onClick={roverClickHandle}
        type='radio'
        id='spirit'
        name='rover'
        value='spirit'
      />
      <label htmlFor='spirit' className='toolbar__radio-button'>
        Spirit
      </label>
      <input
        onChange={dateClickHandle}
        type='date'
        id='date'
        name='date'
        min={min}
        max={max}
        defaultValue={max}
      />
      {cameras.map((camera) => (
        <label htmlFor='spirit' className='toolbar__radio-button'>
          <input
            onClick={cameraClickHandle}
            type='radio'
            id={camera}
            name='camera'
            value={camera}
          />
          {camera}
        </label>
      ))}
    </form>
  );
}

export default Toolbar;
