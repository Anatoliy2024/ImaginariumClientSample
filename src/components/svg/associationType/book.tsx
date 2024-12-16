export function Book({ colorText }: { colorText: string }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 18.5C3.5 14.6484 3.5 5.5 3.5 5.5C3.5 3.84315 4.84315 2.5 6.5 2.5H17.5V15.5C17.5 15.5 9.1163 15.5 6.5 15.5C4.85 15.5 3.5 16.8421 3.5 18.5Z"
        stroke={colorText}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 15.5C17.5 15.5 7.07685 15.5 6.5 15.5C4.84315 15.5 3.5 16.8432 3.5 18.5C3.5 20.1568 4.84315 21.5 6.5 21.5C7.60455 21.5 12.9379 21.5 20.5 21.5V3.5"
        stroke={colorText}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 18.5H17"
        stroke={colorText}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
// export function Book3() {
//   return (
//     <svg
//       width="50"
//       height="50"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M2.5 3.5H8C10.2092 3.5 12 5.29085 12 7.5V21C12 19.3432 10.6568 18 9 18H2.5V3.5Z"
//         stroke="#333333"
//         stroke-width="2"
//         stroke-linejoin="round"
//       />
//       <path
//         d="M21.5 3.5H16C13.7908 3.5 12 5.29085 12 7.5V21C12 19.3432 13.3432 18 15 18H21.5V3.5Z"
//         stroke="#333333"
//         stroke-width="2"
//         stroke-linejoin="round"
//       />
//     </svg>
//   )
// }
// export function Book2() {
//   return (
//     <svg
//       width="50"
//       height="50"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clip-path="url(#clip0_2836_10436)">
//         <path d="M24 0H0V24H24V0Z" fill="white" fill-opacity="0.01" />
//         <path
//           d="M4 20C4 18 4 5 4 5C4 3.34315 5.4327 2 7.2 2H20V18C20 18 9.99075 18 7.2 18C4.68112 18 4 18.3421 4 20Z"
//           stroke="#333333"
//           stroke-width="2"
//           stroke-linejoin="round"
//         />
//         <path
//           fill-rule="evenodd"
//           clip-rule="evenodd"
//           d="M6 22H20V18H6C4.89543 18 4 18.8954 4 20C4 21.1046 4.89543 22 6 22Z"
//           stroke="#333333"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_2836_10436">
//           <rect width="24" height="24" fill="white" />
//         </clipPath>
//       </defs>
//     </svg>
//   )
// }
// export function Book1() {
//   return (
//     <svg
//       width="50"
//       height="50"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M3 3C3 1.34315 4.34315 0 6 0H18C19.6569 0 21 1.34315 21 3V17C21 17.5523 20.5523 18 20 18H7C5.89543 18 5 18.8954 5 20C5 21.1046 5.89543 22 7 22H20C20.5523 22 21 22.4477 21 23C21 23.5523 20.5523 24 20 24H7C4.79086 24 3 22.2091 3 20C3 19.8876 3.00464 19.7762 3.01374 19.6661C3.0047 19.6121 3 19.5566 3 19.5V3ZM19 3C19 2.44772 18.5523 2 18 2H6C5.44772 2 5 2.44772 5 3V16.5351C5.58835 16.1948 6.27143 16 7 16H19V3ZM7 19C6.44772 19 6 19.4477 6 20C6 20.5523 6.44772 21 7 21H20C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19H7Z"
//         fill="black"
//       />
//     </svg>
//   )
// }
