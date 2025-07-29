import React from "react";
import Svg, { Path } from "react-native-svg";

const CoursesTabIcon = ({ 
  width = 25, 
  height = 25, 
  color = "#000000",
  strokeWidth = 2 
}) => {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 25 25" 
      fill="none"
    >
      <Path
        d="M13.2049 12.3501C12.9824 12.4467 12.7425 12.4966 12.4999 12.4966C12.2574 12.4966 12.0174 12.4467 11.7949 12.3501L3.24492 8.39012C3.10608 8.3201 2.9894 8.21291 2.90789 8.08049C2.82637 7.94807 2.7832 7.79562 2.7832 7.64012C2.7832 7.48463 2.82637 7.33218 2.90789 7.19976C2.9894 7.06734 3.10608 6.96015 3.24492 6.89012L11.7949 2.90012C12.0174 2.80351 12.2574 2.75366 12.4999 2.75366C12.7425 2.75366 12.9824 2.80351 13.2049 2.90012L21.7549 6.86012C21.8938 6.93015 22.0104 7.03734 22.092 7.16976C22.1735 7.30218 22.2166 7.45463 22.2166 7.61012C22.2166 7.76562 22.1735 7.91807 22.092 8.05049C22.0104 8.18291 21.8938 8.2901 21.7549 8.36012L13.2049 12.3501Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M22.25 13.0251L13.1 17.2401C12.9046 17.3293 12.6923 17.3754 12.4775 17.3754C12.2627 17.3754 12.0504 17.3293 11.855 17.2401L2.75 13.0251"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M22.25 17.9001L13.1 22.1151C12.9046 22.2043 12.6923 22.2504 12.4775 22.2504C12.2627 22.2504 12.0504 22.2043 11.855 22.1151L2.75 17.9001"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export default CoursesTabIcon;