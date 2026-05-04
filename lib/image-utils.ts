/**
 * Converts a File or Blob to WebP format in the browser.
 * @param file The original image file
 * @param quality Quality from 0 to 1 (default 0.8)
 * @returns A Promise that resolves to a WebP Blob
 */
export async function convertToWebP(file: File, quality: number = 0.8): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                let width = img.width;
                let height = img.height;
                const MAX_WIDTH = 1920;
                const MAX_HEIGHT = 1920;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height = Math.round(height * (MAX_WIDTH / width));
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width = Math.round(width * (MAX_HEIGHT / height));
                        height = MAX_HEIGHT;
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
