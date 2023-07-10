<template>
	<div>
		<input type="file" @change="detectObjects" />
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script>
export default {
  methods: {
    detectObjects(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = this.$refs.canvas;
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Perform object detection using Sobel-Feldman filter in JavaScript
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const grayScale = this.convertToGrayscale(imageData);
          const edgeDetected = this.applySobelFilter(grayScale);
          ctx.putImageData(edgeDetected, 0, 0);
        };
      };

      reader.readAsDataURL(file);
    },
    convertToGrayscale(imageData) {
      const data = imageData.data;
      const grayScaleData = new Uint8ClampedArray(imageData.width * imageData.height);

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Convert to grayscale using the luminance formula
        grayScaleData[i / 4] = 0.299 * r + 0.587 * g + 0.114 * b;
      }

      return grayScaleData;
    },
    applySobelFilter(grayScaleData) {
      const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
      const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

      const edgeData = new Uint8ClampedArray(grayScaleData.length * 4);
			const imageDataWidth = Math.sqrt(grayScaleData.length)

      for (let i = 1; i < grayScaleData.length - 1; i++) {
        const pixelX =
          sobelX[0] * grayScaleData[i - 1 - imageDataWidth] +
          sobelX[1] * grayScaleData[i - imageDataWidth] +
          sobelX[2] * grayScaleData[i + 1 - imageDataWidth] +
          sobelX[3] * grayScaleData[i - 1] +
          sobelX[4] * grayScaleData[i] +
          sobelX[5] * grayScaleData[i + 1] +
          sobelX[6] * grayScaleData[i - 1 + imageDataWidth] +
          sobelX[7] * grayScaleData[i + imageDataWidth] +
          sobelX[8] * grayScaleData[i + 1 + imageDataWidth];

        const pixelY =
          sobelY[0] * grayScaleData[i - 1 - imageDataWidth] +
          sobelY[1] * grayScaleData[i - imageDataWidth] +
          sobelY[2] * grayScaleData[i + 1 - imageDataWidth] +
          sobelY[3] * grayScaleData[i - 1] +
          sobelY[4] * grayScaleData[i] +
          sobelY[5] * grayScaleData[i + 1] +
          sobelY[6] * grayScaleData[i - 1 + imageDataWidth] +
          sobelY[7] * grayScaleData[i + imageDataWidth] +
          sobelY[8] * grayScaleData[i + 1 + imageDataWidth];

        edgeData[i] = Math.sqrt(pixelX * pixelX + pixelY * pixelY);
      }

      return new ImageData(edgeData, imageDataWidth, imageDataWidth);
    },
  },
};
</script>
