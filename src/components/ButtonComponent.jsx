import React from 'react'

const   ButtonComponent = ({label, type, onClickEvent, disabled}) => {
  return (
      <> 
          <button type={type} disabled={disabled == null ? false : true} onClick={onClickEvent} className="inline-block py-2 px-6 my-5 rounded-l-xl rounded-t-xl bg-my_green hover:text-blueish_gray hover:shadow-sm focus:text-blue focus:bg-gray-200 text-gray-50 font-bold leading-loose transition duration-200">
              {label}
          </button>
      </>
  );
}

export default ButtonComponent