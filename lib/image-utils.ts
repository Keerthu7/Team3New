/**
 * Converts a File or Blob to WebP format in the browser.
 * @param file The original image file
 * @param quality Quality from 0 to 1 (default 0.82)
 * @param maxDim Maximum width or height in pixels (default 1600 for hero, 800 for thumbnails)
 * @returns A Promise that resolves to a WebP Blob
 */
export async function convertToWebP(file: File, quality: number = 0.82, maxDim: number = 1600): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Scale down proportionally if exceeds maxDim
                if (width > height) {
                    if (width > maxDim) {
                        height = Math.round(height * (maxDim / width));
                        width = maxDim;
                    }
                } else {
                    if (height > maxDim) {
                        width = Math.round(width * (maxDim / height));
                        height = maxDim;
                    }
                }

                if (!width || !height) {
                    console.warn('Invalid image dimensions, falling back to original file.');
                    resolve(file);
                    return;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    console.warn('Failed to get canvas context, falling back to original file.');
                    resolve(file);
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            console.warn('Canvas toBlob failed, falling back to original file.');
                            resolve(file);
                        }
                    },
                    'image/webp',
                    quality
                );
            };
            img.onerror = () => {
                console.warn('Failed to load image, falling back to original file.');
                resolve(file);
            };
        };
        reader.onerror = () => {
            console.warn('FileReader failed, falling back to original file.');
            resolve(file);
        };
    });
}

