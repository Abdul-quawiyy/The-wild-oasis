import { useDarkMode } from '../context/DarkModeContext';
import ButtonIcon from './ButtonIcon';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

function DarkModeToggle() {
  const { isDarkMode, darkModeToggle } = useDarkMode();
  return (
    <ButtonIcon onClick={darkModeToggle}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
