import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoaderSpinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #383838;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const Loader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <LoaderOverlay>
      <LoaderSpinner />
    </LoaderOverlay>
  );
};

export default Loader;


// import React, { useState } from 'react';
// import Loader from '../components/Loader';

// const YourComponent = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSomeAsyncAction = async () => {
//     setIsLoading(true);
//     try {
//       // Your async logic here
//     } catch (error) {
//       // Handle error
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Your component JSX */}
//       <Loader isLoading={isLoading} />
//     </div>
//   );
// };

// export default YourComponent;