// import React, { useEffect, useState } from 'react';
// import { BiMinusCircle, BiPlusCircle } from 'react-icons/bi';
// import PropTypes from 'prop-types';

// export default function Faq({ question, answer, position, open }) {
//   const [show, setShow] = useState(position === 1);
//   useEffect(() => setShow(open), [open]);

//   return (
//     <article className="flex flex-col gap-4 p-[15px] sm:p-[31px] shadow rounded-sm">
//       <div
//         role="button"
//         tabIndex={0}
//         className="flex items-center justify-between w-full"
//         onClick={() => setShow((prv) => !prv)}
//         onKeyDown={() => setShow((prv) => !prv)}
//       >
//         <h4 className="text-[20px] font-bold">{question}</h4>
//         {show ? (
//           <BiMinusCircle
//             color="var(--l-primary-color)"
//             style={{ flexShrink: 0 }}
//           />
//         ) : (
//           <BiPlusCircle
//             color="var(--l-primary-color)"
//             style={{ flexShrink: 0 }}
//           />
//         )}
//       </div>
//       {show && (
//         <p className="text-[18px] leading-[32px] text-[#82808F]">{answer}</p>
//       )}
//     </article>
//   );
// }

// Faq.propTypes = {
//   question: PropTypes.string.isRequired,
//   answer: PropTypes.string.isRequired,
//   open: PropTypes.bool.isRequired,
//   position: PropTypes.number,
// };
