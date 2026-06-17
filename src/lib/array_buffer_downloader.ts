export function arrayBufferDownload(data: ArrayBuffer, title: string) {
  const blob = new Blob([data], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = title;
  document.body.appendChild(link);
  link.click();

  // Clean up element
  link.remove();
  window.URL.revokeObjectURL(url);
}
