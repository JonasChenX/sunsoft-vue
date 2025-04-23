<template>
  <canvas ref="textCanvasRef" :width="200" :height="60" v-show="false"></canvas>
  <img v-if="imageSrc" :src="imageSrc" alt="Generated Image" class="border" />
</template>
<script setup lang="ts">
import {onMounted, ref, watch} from "vue";

defineOptions({
  name: "s-text-canvas"
});
const props = defineProps({
  textContent: {
    type: String,
    default: '',
    required: true
  }
})
const pixelRatio = ref(1);
const FONT_SIZE = 16;
const FONT_FAMILY = "Arial";
const BG_COLOR = "#f1f1f1";
const TEXT_COLOR = "#333";
const LETTER_SPACING = 5;

const textCanvasRef = ref<HTMLCanvasElement | null>(null);
const imageSrc = ref<string | null>(null);

const drawTextToCanvas = () => {
  if (!textCanvasRef.value) return;

  const canvas = textCanvasRef.value;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  const fontSize = FONT_SIZE * pixelRatio.value;
  const letterSpacing = LETTER_SPACING * pixelRatio.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = `${fontSize}px ${FONT_FAMILY}`;

  const characters = props.textContent.split('');
  let totalWidth = 0;
  characters.forEach((char, index) => {
    totalWidth += ctx.measureText(char).width;
    if (index < characters.length - 1) totalWidth += letterSpacing;
  });

  const startX = (canvas.width - totalWidth) / 2;
  const y = canvas.height / 2 + fontSize / 3;

  let currentX = startX;
  characters.forEach((char) => {
    ctx.fillText(char, currentX, y);
    currentX += ctx.measureText(char).width + letterSpacing;
  });

  imageSrc.value = canvas.toDataURL('image/png', 1.0);
};

onMounted(() => {
  pixelRatio.value = window.devicePixelRatio || 1;
  drawTextToCanvas();
});

watch(() => props.textContent, () => {
  drawTextToCanvas();
});

</script>