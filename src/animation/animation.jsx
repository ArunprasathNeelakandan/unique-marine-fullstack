// import React from 'react';
// import  Lottie  from 'lottie-react'; 
// import animationData from '../assets/Animation - 1733995915044-MWahq.json'; // Import your Lottie JSON animation
// import Ani from './animation.style'

// const LottieAnimation = () => {
//   return (
//         <Ani  style={{
//             position: "fixed", // Fixes the animation in the background
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             zIndex: -1, // Ensures the background stays behind other content
//             display: "flex", // Center the animation
//             justifyContent: "center",
//             alignItems: "center",
//           }}>
//         <Lottie animationData={animationData} loop={true} /> 
//         </Ani>  
//   );
// };

// export default LottieAnimation;


import React from 'react';
import Lottie from 'lottie-react'; 
import animationData from '../assets/Animation - 1733995915044-MWahq.json'; // Import your Lottie JSON animation
import Ani from './animation.style';

const LottieAnimation = () => {
  return (
    <Ani
      style={{
        position: "fixed", // Fixes the animation in the background
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Ensures the background stays behind other content
        display: "flex", // Centers the animation
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Lottie animationData={animationData} loop={true} /> 
    </Ani>
  );
};

export default LottieAnimation;
