import React, { useState } from 'react';

const App = () => {
  const [pdbId, setPdbId] = useState('');
  const [ramachandranPlot, setRamachandranPlot] = useState('');

  const fetchAndPlot = async () => {
    try {
      // Fetch the Ramachandran plot from FastAPI
      const response = await fetch(`http://localhost:8000/calculate_ramachandran`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdb_id: pdbId }),
      });
  
      // Check if the response is successful (status code 200)
      if (response.ok) {
        // Assuming the response contains HTML content
        const htmlContent = await response.text();
        setRamachandranPlot(htmlContent);
      } else {
        // Handle error
        const errorData = await response.json();
        const errorMessage = errorData.detail || 'Failed to fetch and plot Ramachandran plot';
        console.error(errorMessage);
      }
    } catch (error: any) {
      // Explicitly type the 'error' variable as 'any'
      console.error('Error:', error.message);
    }
  };
  

  return (
    <div>
      <h1>Ramachandran Plot Viewer</h1>
      <label>
        Enter PDB ID:
        <input type="text" value={pdbId} onChange={(e) => setPdbId(e.target.value)} />
      </label>
      <button onClick={fetchAndPlot}>Fetch and Plot</button>

      <div>
        <h2>Ramachandran Plot</h2>
        {/* Render the Ramachandran plot here */}
        <div dangerouslySetInnerHTML={{ __html: ramachandranPlot }} />
        
      </div>
      
    </div>
  );
};

export default App;
