import { Radio, Switch } from "antd";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FiGlobe, FiShare, FiUser } from "react-icons/fi";
import { LanguageType } from "../../@types";
import { useOnClickOutside } from "../../hooks";
import { DashboardContext } from "../../layout";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export const languages: LanguageType[] = ["uz", "ru", "en"];

const StaggeredDropDown = () => {
  const { dark, setDark } = useContext(DashboardContext);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const buttonRef = useRef(null);
  const handleClickOutside = () => {
    setOpen(false);
    // console.log("handleClickOutside");
  };

  const handleClickInside = () => {
    setOpen(!open);
    // console.log("handleClickInside");
  };

  useOnClickOutside(ref, handleClickOutside, buttonRef);
  return (
    <div className=" flex items-center justify-center">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <motion.button
          ref={buttonRef}
          onClick={handleClickInside}
          className="flex items-center relative z-[21] gap-2 px-3 py-2 rounded-md text-indigo-50  transition-colors"
        >
          <img
            className="w-10 h-10 rounded-full"
            src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
            alt=""
          />
        </motion.button>

        <motion.ul
          ref={ref}
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          // style={{ originY: "top" }}
          className="flex flex-col gap-2 p-2 rounded-lg border border-slate-700 bg-[var(--bgsidebar)] shadow-xl absolute top-14 min-w-[200px] w-full max-w-xs right-0 z-20 overflow-hidden"
        >
          <Option setOpen={setOpen} Icon={FiUser} text="Profile" />
          <Option
            setOpen={setOpen}
            Icon={FiShare}
            text={
              <div className="">
                <Switch
                  size="small"
                  value={dark}
                  checkedChildren={<i className="fa-solid fa-moon"></i>}
                  unCheckedChildren={
                    <i className="fa-solid fa-sun text-yellow-300"></i>
                  }
                  onChange={(e) => setDark(e)}
                  defaultChecked
                />
              </div>
            }
          />
          <Option
            setOpen={setOpen}
            Icon={FiGlobe}
            text={
              <Radio.Group
                buttonStyle="outline"
                defaultValue={"uz"}
                size="small"
              >
                {languages.map((lang, index) => (
                  <Radio.Button key={index} value={lang}>
                    <span
                      className={`fi fi-${lang === "en" ? "gb" : lang}`}
                    ></span>
                  </Radio.Button>
                ))}
              </Radio.Group>
            }
          />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({
  text,
  Icon,
  setOpen,
}: {
  text: string | React.ReactNode;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.li
      variants={itemVariants}
      // onClick={() => setOpen(false)}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-[var(--bghoverdropdown)] text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
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
    translateX: 90,
    translateY: -100,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.06,
      duration: 0.2,
      damping: false,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
