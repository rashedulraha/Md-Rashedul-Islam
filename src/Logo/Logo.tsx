import whiteLogo from "../assets/logo_white.svg";

const Logo = () => {
  return (
    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12  bg-[#0a0a0a] p-1 rounded-md border border-ring flex items-center justify-center">
      <img
        className="object-contain w-full h-full"
        src={whiteLogo}
        alt="Portfolio Logo"
      />
    </div>
  );
};

export default Logo;
