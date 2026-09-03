/** Reads an image file, fits it inside a `size`×`size` square (no cropping), and
 * returns a compressed JPEG data URL suitable for storing as a small avatar. */
export function resizeImageToDataUrl(file: File, size: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('could not read file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('could not decode image'))
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('canvas unsupported'))
          return
        }
        ctx.fillStyle = '#2a3350'
        ctx.fillRect(0, 0, size, size)
        const scale = Math.min(size / img.width, size / img.height)
        const dw = img.width * scale
        const dh = img.height * scale
        ctx.drawImage(img, 0, 0, img.width, img.height, (size - dw) / 2, (size - dh) / 2, dw, dh)
        resolve(canvas.toDataURL('image/jpeg', 0.72))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}
