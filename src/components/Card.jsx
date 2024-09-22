/* eslint-disable react/prop-types */

export const Card = ({ children, onClick }) => {
  return (
    <div className="bg-gray-700 shadow-md rounded-lg p-6 w-32 h-32 text-center" onClick={onClick}>
      {children}
    </div>
  );
};
