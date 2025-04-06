import { useEffect, useRef } from 'react';

const SnakeTrail = () => {
  const pathRef = useRef(null);
  const points = useRef([]);
  const maxPoints = 50;

  useEffect(() => {
    let animationId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const smoothPath = () => {
      if (points.current.length < 2) return '';

      let d = `M ${points.current[0].x},${points.current[0].y}`;
      for (let i = 1; i < points.current.length - 2; i++) {
        const xc = (points.current[i].x + points.current[i + 1].x) / 2;
        const yc = (points.current[i].y + points.current[i + 1].y) / 2;
        d += ` Q ${points.current[i].x},${points.current[i].y} ${xc},${yc}`;
      }
      return d;
    };

    const animate = () => {
      const path = pathRef.current;
      path.setAttribute('d', smoothPath());
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      const chatBox = document.querySelector('.chat-container');
      const isInside = chatBox.contains(e.target);

      if (!isInside) {
        const last = points.current[points.current.length - 1];
        const newPoint = {
          x: e.clientX,
          y: e.clientY,
        };

        if (!last) {
          points.current.push(newPoint);
        } else {
          const smoothed = {
            x: lerp(last.x, newPoint.x, 0.25),
            y: lerp(last.y, newPoint.y, 0.25),
          };
          points.current.push(smoothed);
        }

        if (points.current.length > maxPoints) {
          points.current.shift();
        }
      } else {
        points.current = [];
        pathRef.current.setAttribute('d', '');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <svg className="snake-trail-svg">
      <path ref={pathRef} className="snake-trail-path" />
    </svg>
  );
};

export default SnakeTrail;
