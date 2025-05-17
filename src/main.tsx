
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create the root and render the app with better error handling
const rootElement = document.getElementById("root");

if (!rootElement) {
  const errorElement = document.createElement("div");
  errorElement.innerHTML = "Could not find root element. Please refresh the page.";
  errorElement.style.padding = "20px";
  errorElement.style.color = "red";
  document.body.appendChild(errorElement);
} else {
  const root = createRoot(rootElement);
  
  try {
    root.render(<App />);
  } catch (error) {
    console.error("Failed to render app:", error);
    root.render(
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to start application</h2>
        <p className="mb-4 text-gray-700">Please refresh the page and try again.</p>
      </div>
    );
  }
}
