"use client";

const Button3 = ({ children, className }) => {
  return (
    <>
      <button
        className={`${className} rounded-md px-6 py-2 text-white font-semibold
        bg-[#0d9488] bg-[linear-gradient(to_bottom_right,#0d9488,#95a7a5,#f85606)]`}
      >
        {children}
      </button>
    </>
  );
};

export default Button3;
