import { PDFDocument } from 'pdf-lib';

/**
 * 📄 PDF Sayfa Sayısını Al
 */
export async function getPdfPageCount(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  return pdf.getPageCount();
}

/**
 * 📄 PDF Birleştirme (Merge)
 * Birden fazla PDF dosyasını tek bir dökümanda birleştirir.
 */
export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  
  return await mergedPdf.save();
}

/**
 * 🎞️ PDF'den Görsellere (PDF to Image)
 * PDF dökümanının her bir sayfasını JPG görseline dönüştürür.
 */
export async function pdfToImages(file: File): Promise<Blob[]> {
  const pdfjs = await import('pdfjs-dist');
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  const images: Blob[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) continue;

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;
    
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
    if (blob) images.push(blob);
  }

  return images;
}

/**
 * ✂️ PDF Sayfa Ayıklama / Bölme (Split)
 * Belirli sayfa aralıklarını (örn: "1-3, 5") yeni bir PDF olarak kaydeder.
 */
export async function splitPdf(file: File, range: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const splitPdf = await PDFDocument.create();
  
  const pageIndices: number[] = [];
  const parts = range.split(',').map(p => p.trim());
  
  parts.forEach(part => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      for (let i = start; i <= end; i++) {
        if (i > 0 && i <= pdf.getPageCount()) {
          pageIndices.push(i - 1);
        }
      }
    } else {
      const pageNum = Number(part);
      if (pageNum > 0 && pageNum <= pdf.getPageCount()) {
        pageIndices.push(pageNum - 1);
      }
    }
  });

  const copiedPages = await splitPdf.copyPages(pdf, pageIndices);
  copiedPages.forEach((page) => splitPdf.addPage(page));
  
  return await splitPdf.save();
}

/**
 * 🗜️ PDF Sıkıştırma (Compress - Basic)
 */
export async function compressPdf(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const compressed = await PDFDocument.create();
  const copiedPages = await compressed.copyPages(pdf, pdf.getPageIndices());
  copiedPages.forEach(p => compressed.addPage(p));
  return await compressed.save({ useObjectStreams: true });
}

/**
 * 📂 Görsellerden PDF Oluşturucu
 */
export async function imagesToPdf(files: File[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    try {
      let image;
      if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        image = await pdfDoc.embedJpg(arrayBuffer);
      } else if (file.type === 'image/png') {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else {
        continue;
      }
      const { width, height } = image.scale(1);
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(image, { x: 0, y: 0, width, height });
    } catch (e) {
      console.error(e);
    }
  }
  return await pdfDoc.save();
}

/**
 * 💾 Dosya İndirme Yardımcıları
 */
export function downloadUint8Array(data: Uint8Array, filename: string, type: string = 'application/pdf') {
  const blob = new Blob([data.buffer as ArrayBuffer], { type });
  downloadBlob(blob, filename);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
