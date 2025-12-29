const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const brushSizeValue = document.getElementById('brushSizeValue');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');

let isDrawing = false;
let currentColor = '#ff4081';
let currentSize = 10;

// Ajuster la taille du canvas pour mobile
function resizeCanvas() {
  const container = canvas.parentElement;
  const maxWidth = container.clientWidth - 40;
  if (maxWidth < canvas.width) {
    canvas.style.width = maxWidth + 'px';
    canvas.style.height = (maxWidth * canvas.height / canvas.width) + 'px';
  }
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Initialiser le canvas en blanc
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Charger le dessin sauvegardé
function loadDrawing() {
  const saved = localStorage.getItem('sharedDrawing');
  if (saved) {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = saved;
  }
}

loadDrawing();

colorPicker.addEventListener('change', (e) => {
  currentColor = e.target.value;
});

brushSize.addEventListener('input', (e) => {
  currentSize = e.target.value;
  brushSizeValue.textContent = currentSize;
});

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
  saveDrawing();
}

function draw(e) {
  if (!isDrawing) return;
  
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  
  const x = (e.clientX - rect.left) * scaleX;
  const y = (e.clientY - rect.top) * scaleY;
  
  ctx.lineWidth = currentSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = currentColor;
  
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Support tactile
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener('touchend', (e) => {
  e.preventDefault();
  const mouseEvent = new MouseEvent('mouseup', {});
  canvas.dispatchEvent(mouseEvent);
});

clearBtn.addEventListener('click', () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  saveDrawing();
});

saveBtn.addEventListener('click', () => {
  saveDrawing();
  alert('Dessin sauvegardé ! 💕');
});

function saveDrawing() {
  const dataURL = canvas.toDataURL();
  localStorage.setItem('sharedDrawing', dataURL);
}

