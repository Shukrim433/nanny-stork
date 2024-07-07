import { Link } from "react-router-dom";
import { useTheme } from "../../utils/ThemeContext";

const AiBtn = () => {
  const { pinkTheme } = useTheme();
  const themeStyles = pinkTheme
    ? {
        background: "#f48fb1",
        transitionProperty: "background-color",
        transitionDuration: "300ms",
      }
    : {
        background: "#90caf9",
        transitionProperty: "background-color",
        transitionDuration: "300ms",
      };
  return (
    <div className="fixed bottom-4 right-4">
      <Link to="/nanny-bot">
        <div
          style={themeStyles}
          className="transition duration-300 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center w-16 h-16"
        >
          <img className="w-[400px]" src="/images/Nanny-bot-icon.png" alt="" />
        </div>
      </Link>
    </div>
  );
};

export default AiBtn;
