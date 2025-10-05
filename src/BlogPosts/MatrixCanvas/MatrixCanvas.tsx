import { useRef, useEffect, useMemo } from 'react';

export default function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const characters =
    'アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const fontSizes = useMemo(() => [15, 28, 40], []);
  const dropSpeed = 50; // Lower number = faster, higher number = slower

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size to fill viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create layers for each font size
    const layers = fontSizes.map((fontSize) => ({
      fontSize,
      columns: Math.floor(canvas.width / fontSize),
      yPositions: Array(Math.floor(canvas.width / fontSize))
        .fill(0)
        .map(() => Math.floor(Math.random() * -50) - 10), // Start above screen, staggered
    }));

    let lastTime = 0;

    function drawMatrix(currentTime: number) {
      if (!ctx || !canvas) return;

      // Throttle the animation speed
      if (currentTime - lastTime < dropSpeed) {
        requestAnimationFrame(drawMatrix);
        return;
      }
      lastTime = currentTime;

      // Clear background with fade effect (NO GLOW for background)
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw all layers
      layers.forEach((layer, layerIndex) => {
        ctx.font = `${layer.fontSize}px monospace`;

        for (let i = 0; i < layer.columns; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));

          // Set glow for each character
          if (Math.random() > 0.9) {
            ctx.shadowColor = '#0F0';
            ctx.shadowBlur = 3;
            ctx.fillStyle = '#00FF41'; // Brighter green
          } else {
            ctx.shadowColor = '#0F0';
            ctx.shadowBlur = 10;
            // Different opacity for each layer to create depth
            const opacity = 0.4 + layerIndex * 0.15;
            ctx.fillStyle = `rgba(0, 255, 0, ${opacity})`;
          }

          ctx.fillText(text, i * layer.fontSize, layer.yPositions[i] * layer.fontSize);

          if (layer.yPositions[i] * layer.fontSize > canvas.height && Math.random() > 0.975) {
            layer.yPositions[i] = 0;
          }
          layer.yPositions[i]++;
        }
      });

      requestAnimationFrame(drawMatrix);
    }

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    requestAnimationFrame(drawMatrix);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [characters, fontSizes, dropSpeed]);

  return (
    <div style={{ margin: 0, padding: 0, overflow: 'hidden', height: '100vh', width: '100vw' }}>
      <canvas
        ref={canvasRef}
        id="matrixCanvas"
        style={{
          display: 'block',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
        }}
      />
    </div>
  );
}
