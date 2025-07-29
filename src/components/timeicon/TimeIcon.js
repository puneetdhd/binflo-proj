import React, { useContext } from "react";
import Svg, { Path } from "react-native-svg";
import ThemeContext from "../Theme/ThemeContext";

const TimeIcon = () => {
  const theme = useContext(ThemeContext);
  return (
    <Svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7993 2.51775C6.19676 2.51775 2.46592 6.30829 2.46592 10.9844C2.46592 15.6606 6.19676 19.4511 10.7993 19.4511C15.4018 19.4511 19.1326 15.6606 19.1326 10.9844C19.1326 6.30829 15.4018 2.51775 10.7993 2.51775ZM10.7998 21.1445C5.27564 21.1445 0.799805 16.597 0.799805 10.9844C0.799805 5.37186 5.27564 0.824402 10.7998 0.824402C16.324 0.824402 20.7998 5.37186 20.7998 10.9844C20.7998 16.597 16.324 21.1445 10.7998 21.1445Z"
        fill={theme.color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9657 15.6411C14.7607 15.6411 14.559 15.5615 14.4057 15.4193L10.239 11.6093C10.0665 11.451 9.9657 11.2223 9.9657 10.9844V6.75109C9.9657 6.28457 10.3399 5.90442 10.799 5.90442C11.2582 5.90442 11.6324 6.28457 11.6324 6.75109V10.6043L15.5257 14.1594C15.7857 14.394 15.874 14.7682 15.7499 15.0984C15.6265 15.4261 15.314 15.6445 14.9657 15.6411Z"
        fill={theme.color}
      />
    </Svg>
  );
};

export default TimeIcon;
