export function downloadJSON(data: Record<string, unknown>, filename = "dashboard.json") {
    // Validate if data is provided
    if (!data) {
      console.error("No data provided for download.");
      return;
    }
  
    // Create a Blob with the JSON data
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
  
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create an invisible anchor element for triggering the download
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
  
    // Append the anchor to the document body (it's required to trigger click in some browsers)
    document.body.appendChild(a);
  
    // Trigger a click event to start the download
    a.click();
  
    // Clean up: remove the anchor and revoke the URL
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  