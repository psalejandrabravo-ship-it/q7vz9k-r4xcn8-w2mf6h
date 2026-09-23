function drawLogo(fileOrUrl: string, maxEdge: number, mime: "image/png" | "image/jpeg", quality?: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(fileOrUrl);
        return;
      }
      if (mime === "image/jpeg") {
        ctx.fillStyle = "#fffaf3";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL(mime, quality));
    };
    img.onerror = () => reject(new Error("La imagen no es válida"));
    img.src = fileOrUrl;
  });
}

export function resizeLogoFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
    reader.onload = () => {
      const dataUrl = String(reader.result);
      drawLogo(dataUrl, 256, "image/png").then(resolve, () => resolve(dataUrl));
    };
    reader.readAsDataURL(file);
  });
}

/** JPEG chico para que el enlace de la presentación siga siendo compartible. */
export async function compressLogoDataUrl(dataUrl: string): Promise<string | null> {
  const tries: Array<[number, number]> = [
    [180, 0.72],
    [140, 0.6],
    [110, 0.5],
    [84, 0.45],
  ];
  let last = "";
  for (const [edge, quality] of tries) {
    try {
      last = await drawLogo(dataUrl, edge, "image/jpeg", quality);
    } catch {
      return null;
    }
    if (last.length <= 7000) return last;
  }
  return last.length <= 12000 ? last : null;
}