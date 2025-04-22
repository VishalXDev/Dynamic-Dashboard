import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Button from './components/common/Button';  // Assuming there's a Button component
import { downloadJSON } from './utils/exportJSON';  // If you're using the download function for JSON export

function App() {
  const [count, setCount] = useState<number>(0); // Explicitly typing the state as a number

  const handleExport = (): void => {
    // You might want to export some specific data here
    const data = { count };
    downloadJSON(data);
  };

  return (
    <div className="App">
      <div className="logo-container flex justify-center space-x-4">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <h1 className="text-center text-2xl font-semibold mt-8">Vite + React</h1>

      <div className="card flex flex-col items-center space-y-4 mt-6">
        <button
          onClick={() => setCount((prevCount) => prevCount + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Count is {count}
        </button>
        
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR.
        </p>
        
        <Button onClick={handleExport}>Export Count Data</Button> {/* Added button for exporting data */}
      </div>

      <p className="read-the-docs text-center mt-4">
        Click on the Vite and React logos to learn more.
      </p>
    </div>
  );
}

export default App;
