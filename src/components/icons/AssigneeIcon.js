import React from "react";

function AssigneeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={101}
      height={100}
      viewBox="0 0 101 100"
      fill="none"
    >
      <rect x="0.5" width={100} height={100} fill="url(#pattern0)" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_1139_1664" transform="scale(0.01)" />
        </pattern>
        <image
          id="image0_1139_1664"
          width={100}
          height={100}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}

export default AssigneeIcon;
