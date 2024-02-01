import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FiGlobe, FiLogOut, FiUser } from "react-icons/fi";
import { LangChanger } from "../lang-changer/LangChanger";
import { useOnClickOutside } from "../../hooks";
import { useAppDispatch } from "../../redux";
import { loginActions } from "../../redux/login.slice";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useTranslation } from "react-i18next";

const StaggeredDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(loginActions.setToken(null));
  };

  useOnClickOutside(dropdownRef, handleClickOutside, buttonRef);

  return (
    <div className="flex items-center justify-center">
      <motion.div animate={isOpen ? "open" : "closed"} className="relative">
        <motion.button
          ref={buttonRef}
          onClick={handleToggleDropdown}
          className="flex items-center relative z-[21] gap-2 px-3 py-2 rounded-md text-indigo-50 transition-colors"
        >
          <img
            className="w-10 h-10 rounded-full"
            src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
            alt=""
          />
        </motion.button>

        <motion.ul
          ref={dropdownRef}
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          className="flex flex-col gap-2 p-2 rounded-lg border border-slate-700 bg-[var(--bgsidebar)] shadow-xl absolute top-14 min-w-[200px] w-full max-w-xs right-0 z-20 overflow-hidden"
        >
          <Option
            setOpen={setIsOpen}
            Icon={FiUser}
            text={t("dropdown.profile")}
          />

          <Option setOpen={setIsOpen} Icon={FiGlobe} text={<LangChanger />} />

          <Option
            setOpen={setIsOpen}
            Icon={FiLogOut}
            handleLogout={handleLogout}
            text={t("dropdown.logout")}
          />
        </motion.ul>
      </motion.div>
    </div>
  );
};
const Option = ({
  text,
  Icon,

  handleLogout,
}: {
  text: string | React.ReactNode;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleLogout?: () => void;
}) => {
  return (
    <motion.li
      onClick={handleLogout}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-[var(--bghoverdropdown)] hover:text-green transition-colors cursor-pointer"
    >
      <motion.span>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scale: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.06,
      duration: 0.2,
      damping: false,
    },
  },
  closed: {
    scale: 0,
    opacity: 0,
    translateX: 60,
    translateY: -90,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.06,
      duration: 0.2,
      damping: false,
    },
  },
};

// const iconVariants = {
//   open: { rotate: 180 },
//   closed: { rotate: 0 },
// };

// const itemVariants = {
//   open: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       when: "beforeChildren",
//     },
//   },
//   closed: {
//     opacity: 0,
//     y: -15,
//     transition: {
//       when: "afterChildren",
//     },
//   },
// };

// const actionIconVariants = {
//   open: { scale: 1, y: 0 },
//   closed: { scale: 0, y: -7 },
// };
