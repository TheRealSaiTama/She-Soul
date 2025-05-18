import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls, useProgress, Html } from '@react-three/drei';

type Scene3DProps = {
  children: React.ReactNode;
  height?: string;
  controls?: boolean;
  background?: string;
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
  ambientLight?: boolean;
  directionalLight?: boolean;
};

function Loader() {
  const { progress } = useProgress();
  return <Html center><div className="text-shesoul-bubblegum font-medium">{progress.toFixed(0)}% loaded</div></Html>;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  children,
  height = '300px',
  controls = true,
  background = 'transparent',
  cameraPosition = [0, 0, 5],
  autoRotate = false,
  ambientLight = true,
  directionalLight = true,
}) => {
  return (
    <div className="relative w-full" style={{ height }}>
      <Canvas
        shadows
        camera={{ position: cameraPosition, fov: 45 }}
        style={{ background }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<Loader />}>
          {ambientLight && <ambientLight intensity={0.5} />}
          {directionalLight && (
            <directionalLight
              castShadow
              position={[10, 10, 10]}
              intensity={1}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
          )}
          {controls ? (
            <>
              <OrbitControls 
                autoRotate={autoRotate} 
                autoRotateSpeed={0.5} 
                enableZoom={true} 
                enablePan={false}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
              />
              {children} 
            </>
          ) : (
            <PresentationControls
              global
              snap
              zoom={0.8}
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 6, Math.PI / 6]}
            >
              {children}
            </PresentationControls>
          )}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
