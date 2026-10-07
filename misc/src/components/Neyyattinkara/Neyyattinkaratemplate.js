"use client";

import { useEffect, useRef } from "react";

export default function Neyyattinkaratemplate() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const cyan = "#ffd900";
    const cyanGlow = "rgba(253, 178, 18)";
    const gold = "rgba(255, 215, 0, 0.5)";

    const rings = [
      { radius: 50, nodes: 4, speed: 0.002, nodeSize: 3 },
      { radius: 90, nodes: 10, speed: -0.0015, nodeSize: 4 },
      { radius: 130, nodes: 8, speed: 0.001, nodeSize: 3 },
      { radius: 170, nodes: 10, speed: -0.0008, nodeSize: 5 },
      { radius: 210, nodes: 12, speed: 0.0006, nodeSize: 3 },
    ];

    let nodePositions = [];
    let time = 0;

    function drawRing(radius, opacity) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 10);
    //   ctx.strokeStyle = `rgba(253,179,18,${opacity})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    function drawNode(x, y, size, glowing = false) {
      if (glowing) {
        const gradient = ctx.createRadialGradient(x, y, 7, x, y, size * 9);
        // gradient.addColorStop(0, "#ffd700");
        // gradient.addColorStop(0.5, "#ffd700");
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(x, y, size * 8, 0, Math.PI * 4);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = cyan;
      ctx.fill();
    }

    function drawConnection(x1, y1, x2, y2, opacity) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(253,179,18,${opacity})`;
      ctx.lineWidth = 1.9;
      ctx.stroke();
    }

    function animate() {
      ctx.clearRect(0, 0, rect.width, rect.height);
      nodePositions = [];

      const coreGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        30
      );
      coreGradient.addColorStop(0, "#ffd700");
      coreGradient.addColorStop(0.5, "rgba(238, 255, 108, 0.1)");
      coreGradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      drawNode(centerX, centerY, 6, true);
      nodePositions.push({ x: centerX, y: centerY });

      rings.forEach((ring, ringIndex) => {
        drawRing(ring.radius, 0.15 + ringIndex * 0.05);

        for (let i = 0; i < ring.nodes; i++) {
          const angle =
            (i / ring.nodes) * Math.PI * 2 +
            time * ring.speed * 100;
          const x = centerX + Math.cos(angle) * ring.radius;
          const y = centerY + Math.sin(angle) * ring.radius;

          const isGlowing = Math.sin(time * 2 + ringIndex + i) > 0.7;
          drawNode(x, y, ring.nodeSize, isGlowing);
          nodePositions.push({ x, y, ring: ringIndex });
        }
      });

      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          const dx = nodePositions[j].x - nodePositions[i].x;
          const dy = nodePositions[j].y - nodePositions[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100 && Math.random() > 0.97) {
            const opacity = (1 - distance / 100) * 0.3;
            drawConnection(
              nodePositions[i].x,
              nodePositions[i].y,
              nodePositions[j].x,
              nodePositions[j].y,
              opacity
            );
          }
        }
      }

      const connectionPairs = [
        [1, 5],
        [3, 8],
        [6, 12],
        [10, 18],
        [15, 25],
        [20, 30],
      ];

      connectionPairs.forEach(([a, b]) => {
        if (nodePositions[a] && nodePositions[b]) {
          const pulse = (Math.sin(time * 3) + 1) / 2;
          drawConnection(
            nodePositions[a].x,
            nodePositions[a].y,
            nodePositions[b].x,
            nodePositions[b].y,
            0.1 + pulse * 0.2
          );
        }
      });

      for (let i = 0; i < 3; i++) {
        const particleAngle = time * 0.5 + (i * Math.PI * 2) / 3;
        const particleRadius = 180 + Math.sin(time * 2 + i) * 20;
        const px = centerX + Math.cos(particleAngle) * particleRadius;
        const py = centerY + Math.sin(particleAngle) * particleRadius;

        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = gold;
        ctx.fill();
      }

      time += 0.016;
      requestAnimationFrame(animate);
    }

    animate();

    const btn = document.querySelector(".cta-button");
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-2px) scale(1.02)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0) scale(1)";
    });

    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
  <main className="main">
  <div className="content">
    <h1 className="headline">
      Misc Archive arrives in Neyyatinkara
    </h1>

    <div className="accent-text" style={{ fontWeight:"800"}}>
      <span>
        Your trusted partner for digital growth, creative strategy, and brand building, now closer to you.
      </span>
    </div>

    <p className="secondary-text">
      From startups to established businesses, we help brands stand out, scale smartly, and connect meaningfully with their audience.
    </p>

    <div>
      {/* <button className="cta-button">Book a Free Consultation</button> */}

      <a href="/contact"><button className="cta-button" style={{color:"#333", fontWeight:"600"}}>Enquire Now</button></a>
    </div>
  </div>

<div className="system-diagram">
  <canvas ref={canvasRef} className="diagram-canvas" />
  <div className="diagram-labels">
    {[
      "Neyyattinkara", "Poovar", "Parasala", "Karakkonam",
      "Nedumangad", "Nemom", "Balaramapuram", "Sasthamangalam"
    ].map((t, i) => (
      <span key={i} className="diagram-label" style={{color:"#555", fontWeight:"300"}}>{t}</span>
    ))}
  </div>
</div>

</main>

  );
}
