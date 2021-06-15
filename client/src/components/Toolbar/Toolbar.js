import React from "react";

function Toolbar({ roverClickHandle, min, max, dateClickHandle }) {
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
        on={dateClickHandle}
        type='date'
        id='date'
        name='date'
        min={min}
        max={max}
        defaultValue={max}
      />
    </form>
  );
}

export default Toolbar;
