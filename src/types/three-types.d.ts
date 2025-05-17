
// Type declarations for Three.js related components
declare module 'three-types' {
  import { Object3D, Group, Mesh } from 'three';
  
  export interface ThreeEvent {
    stopPropagation: () => void;
    target: Object3D;
    object: Object3D;
    eventObject: Object3D;
    point: [number, number, number];
    distance: number;
    ray: Ray;
    camera: Camera;
    intersections: Intersection[];
    intersect: Intersection;
    delta: number;
  }
  
  export interface GroupProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number | [number, number, number];
  }
  
  export interface MeshProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: number | [number, number, number];
    onClick?: (event: ThreeEvent) => void;
    onPointerOver?: (event: ThreeEvent) => void;
    onPointerOut?: (event: ThreeEvent) => void;
  }
  
  export interface MaterialProps {
    color?: string;
    transparent?: boolean;
    opacity?: number;
    roughness?: number;
    metalness?: number;
    emissive?: string;
    emissiveIntensity?: number;
    clearcoat?: number;
    clearcoatRoughness?: number;
  }
}
