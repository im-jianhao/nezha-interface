import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './wdyr';
import './style.css';
import App from '@pages/App';

const container = document.getElementById('app');
if (!container) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// import * as React from 'react';
// import { useState } from 'react';
// import { createRoot } from 'react-dom/client';
// import { screen, fireEvent } from '@testing-library/dom';

// function A() {
//   console.log('render A');
//   return null;
// }
// function App() {
//   const [state, setState] = useState(false);
//   console.log('render App');
//   return (
//     <div>
//       <button
//         onClick={() => {
//           console.log('click');
//           setState(true);
//         }}
//       >
//         click me
//       </button>
//       <A />
//     </div>
//   );
// }
// const root = createRoot(document.getElementById('app'));
// root.render(<App />);
// (async function () {
//   const action = await screen.findByText('click me');
//   fireEvent.click(action);
//   await wait(100);
//   fireEvent.click(action);
//   await wait(100);
//   fireEvent.click(action);
// })();

// function wait(duration = 100) {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// }
