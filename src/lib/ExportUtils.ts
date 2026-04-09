/**
 * Exports data to a CSV file with UTF-8 BOM for Excel compatibility.
 * @param headers - Array of column headers
 * @param rows - 2D array of data rows
 * @param filename - Name of the file to be downloaded
 */
export const downloadCSV = (headers: string[], rows: any[][], filename: string) => {
  // Combine headers and rows
  const csvRows = [
    headers.join(";"), // Using semicolon as separator for better Turkish Excel compatibility
    ...rows.map(row => 
      row.map(cell => {
        // Escape quotes and wrap in quotes if contains separator
        const cellStr = String(cell).replace(/"/g, '""');
        return `"${cellStr}"`;
      }).join(";")
    )
  ];

  const csvString = csvRows.join("\n");
  
  // Create a Blob with UTF-8 BOM (\ufeff)
  const blob = new Blob(["\ufeff" + csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
