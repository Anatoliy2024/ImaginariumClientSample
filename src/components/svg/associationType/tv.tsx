export function Tv({ colorText }: { colorText: string }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2836_22733)">
        <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01" />
        <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01" />
        <path
          d="M21 6H3C2.44771 6 2 6.4477 2 7V20C2 20.5523 2.44771 21 3 21H21C21.5523 21 22 20.5523 22 20V7C22 6.4477 21.5523 6 21 6Z"
          stroke={colorText}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 9.5H5.5V17.5H15.5V9.5Z"
          stroke={colorText}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M7 2.25L11.5455 6L17 1"
          stroke={colorText}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 9V9.5"
          stroke={colorText}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 12.5V13"
          stroke={colorText}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
