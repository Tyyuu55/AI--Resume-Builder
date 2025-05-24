import React from 'react';

const Input = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <label className="text-xl font-medium text-gray-700">{placeholder}</label>
      <input
        className="w-[30rem] h-8 text-lg p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 shadow-lg hover:shadow-xl transition-all"
        type={type}
        placeholder="Full Stack Resume"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
