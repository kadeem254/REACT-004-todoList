import React, { useState } from 'react';

function CheckBox ({isChecked, toggleCallback}) {
  
  const onToggle = (e) => {
    if( toggleCallback ){
      toggleCallback();
    }
    return;
  }

  return (
    <label className="relative cursor-pointer text-base w-5 h-5 select-none block
    border-2 border-mindaro rounded-sm">
      <input
        className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
        type="checkbox"
        checked={isChecked} onChange={onToggle}/>
      <div
        className="absolute top-0 left-0 w-full h-full after:content-['']
        after:absolute after:top-1/4 after:left-1/4 after:w-1/2 after:h-1/2
        after:transition-all peer-checked:after:bg-mindaro"
      ></div>
    </label>
  );
}

export default CheckBox;