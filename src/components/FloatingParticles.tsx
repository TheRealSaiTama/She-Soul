
import React, { useCallback } from 'react';
import Particles from 'react-particles';
import type { Container, Engine } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  speed?: number;
  opacity?: number;
  className?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 50,
  colors = ['#FC91D5', '#F5CD2F', '#FBDDEF', '#FEBAED', '#F9D581'],
  speed = 1,
  opacity = 0.3,
  className = '',
}) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // console.log(container);
  }, []);

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 0.5,
                },
              },
            },
          },
          particles: {
            color: {
              value: colors,
            },
            links: {
              color: colors,
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: speed,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: count,
            },
            opacity: {
              value: opacity,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
};

export default FloatingParticles;
