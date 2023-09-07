function ShutterUpButton({ children, className, onClick, disabled }) {
    return (
      <button
        className={`bg-[#3cca98] text-[#f8f4f4]
        relative overflow-hidden transition-[background-color] duration-[0.1s] ease-linear
        z-[1] cursor-pointer text-center border-[none] border-2 border-solid border-[#3cca98] 
        before:absolute before:w-full before:h-0
        before:transition-[height] before:duration-[0.2s] before:ease-linear 
        before:z-[-1] before:left-0 before:top-0 
      hover:text-[#3cca98] hover:font-bold hover:before:h-full ${className}`}
      disabled={disabled}
      onClick={onClick}
      >
        <span className="text-xs font-medium">{children}</span>
      </button>
    );
  }
  
  export default ShutterUpButton;