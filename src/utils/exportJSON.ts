export function downloadJSON(data: Record<string, unknown> | null, filename = "dashboard.json"): void {
  if (!data) {
    console.error("No data provided for export.");
    return;
  }

  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error occurred while exporting the file:", error);
  }
}
