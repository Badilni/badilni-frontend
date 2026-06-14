import { IoIosArrowRoundBack } from 'react-icons/io'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const ShowPassword = ({ isVisible, toggleVisibility }) => {
  return (
    <button
      type="button"
      onClick={toggleVisibility}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 focus:outline-none"
    >
      {isVisible ? (
        <AiOutlineEyeInvisible size={20} />
      ) : (
        <AiOutlineEye size={20} />
      )}
    </button>
  )
}

export default ShowPassword
