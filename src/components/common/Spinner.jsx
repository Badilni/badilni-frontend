import { useSpinner } from '../../hooks/useSpinner';
import logoImg from '/Badilni.png';

const Spinner = () => {
  const { text, showText } = useSpinner("Badilni");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5f5]">
      <div className="flex items-center space-x-3">
        <div className={`transition-transform duration-700 ease-in-out ${showText ? '-translate-x-2' : 'translate-x-12'}`}>
          <div className=" flex items-center justify-center">
            <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="relative">
          <h1 className="text-black text-3xl font-poppins font-bold tracking-wider">
            {text}
            {showText && <span className="inline-block w-[2px] h-7 bg-[#2F97E9] ml-1 animate-pulse"></span>}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Spinner;