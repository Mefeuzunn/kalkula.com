import { PDFDocument } from 'pdf-lib';

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
 * 🖼️ Görselden WebP'ye Dönüştürücü
 * Tarayıcı Canvas API kullanarak görselleri WebP formatına çevirir.
 */
export async function convertToWebP(file: File, quality: number = 0.8): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas context error');
        
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject('Conversion error');
          },
          'image/webp',
          quality
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * 📏 Görsel Boyutlandırıcı
 * Belirli bir genişliğe göre (aspect ratio koruyarak) görseli boyutlandırır.
 */
export async function resizeImage(file: File, targetWidth: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.height / img.width;
        const targetHeight = Math.round(targetWidth * aspectRatio);
        
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('Canvas context error');
        
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject('Resizing error');
          },
          file.type,
          0.9
        );
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
