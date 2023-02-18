//Style
import "./ThemeSelector.css";
import modeIcon from "../assets/dark-mode-sun.svg";

import React from "react";
import { useTheme } from "../hooks/useTheme";

//Theme Colors
const themeColors = ["red", "blue", "green"];

export function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  //Function to toggle dark/light mode
  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };
  console.log(mode);

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          onClick={toggleMode}
          alt="darkmode"
          style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
        />
      </div>

      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
