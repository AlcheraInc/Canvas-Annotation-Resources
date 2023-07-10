<template>
	<div>
		<input type="file" @change="detectObjects" />
		<canvas ref="canvas"></canvas>
	</div>
</template>

<script>
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs";

export default {
  async mounted() {
    await tf.ready();
  },
  methods: {
    async detectObjects(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = async () => {
          const canvas = this.$refs.canvas;
          const ctx = canvas.getContext("webgl");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          // Perform object detection using Sobel-Feldman filter in WebGL with TensorFlow.js
          const tensor = tf.browser.fromPixels(canvas);
          const grayScale = tensor.mean(2);
          const sobelX = grayScale.conv2d(tf.tensor2d([-1, 0, 1, -2, 0, 2, -1, 0, 1], [3, 3], "int32"), 1, "same");
          const sobelY = grayScale.conv2d(tf.tensor2d([-1, -2, -1, 0, 0, 0, 1, 2, 1], [3, 3], "int32"), 1, "same");
          const gradient = tf.sqrt(sobelX.square().add(sobelY.square()));

          // Convert the TensorFlow tensor back to ImageData
          const edgeData = await tf.browser.toPixels(gradient);
          const edgeImageData = new ImageData(
            new Uint8ClampedArray(edgeData.buffer),
            gradient.shape[1],
            gradient.shape[0]
          );

          ctx.putImageData(edgeImageData, 0, 0);

          tensor.dispose();
          grayScale.dispose();
          sobelX.dispose();
          sobelY.dispose();
          gradient.dispose();
        };
      };

      reader.readAsDataURL(file);
    },
  },
};
</script>
