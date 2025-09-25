import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const AvatarAnalyzerGenerator = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const avatarRef = useRef(null);
  const originalAvatarRef = useRef(null);
  const cloneAvatarRef = useRef(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [avatarData, setAvatarData] = useState(null);
  const [showClone, setShowClone] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [exportData, setExportData] = useState(null);

  const AVATAR_URL = 'https://models.readyplayer.me/68d2aa0d27fbaaaba4fdfd21.glb';

  useEffect(() => {
    if (!mountRef.current) return;

    const init = async () => {
      try {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a0a);
        sceneRef.current = scene;

        // Camera
        const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.set(0, 1.6, 4);
        cameraRef.current = camera;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        rendererRef.current = renderer;
        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Load GLTFLoader
        await loadGLTFLoader();
        
        // Load and analyze avatar
        await loadAvatar();
        
        // Start render loop
        animate();
        
      } catch (error) {
        console.error('Initialization error:', error);
      }
    };

    const loadGLTFLoader = () => {
      return new Promise((resolve, reject) => {
        if (window.THREE && window.THREE.GLTFLoader) {
          resolve();
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/examples/js/loaders/GLTFLoader.js';
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const loadAvatar = async () => {
      const loader = new window.THREE.GLTFLoader();
      
      return new Promise((resolve) => {
        loader.load(AVATAR_URL, (gltf) => {
          const avatar = gltf.scene.clone();
          
          // Position avatar
          const box = new THREE.Box3().setFromObject(avatar);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          
          avatar.position.x = -center.x;
          avatar.position.y = -box.min.y;
          avatar.position.z = -center.z;
          
          sceneRef.current.add(avatar);
          avatarRef.current = avatar;
          originalAvatarRef.current = gltf.scene;
          
          // Analyze avatar
          const analysis = analyzeAvatar(gltf);
          setAvatarData(analysis);
          setAnalysisComplete(true);
          setIsLoading(false);
          
          resolve();
        });
      });
    };

    const analyzeAvatar = (gltf) => {
      const meshes = [];
      const materials = [];
      const textures = [];
      const bones = [];
      let totalVertices = 0;
      let totalTriangles = 0;

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const geometry = child.geometry;
          const material = child.material;
          
          // Analyze geometry
          const vertices = geometry.attributes.position ? geometry.attributes.position.count : 0;
          const triangles = geometry.index ? geometry.index.count / 3 : vertices / 3;
          
          totalVertices += vertices;
          totalTriangles += triangles;
          
          // Extract mesh data
          const meshData = {
            name: child.name,
            vertices: vertices,
            triangles: Math.floor(triangles),
            hasUV: !!geometry.attributes.uv,
            hasNormals: !!geometry.attributes.normal,
            hasTangents: !!geometry.attributes.tangent,
            boundingBox: new THREE.Box3().setFromObject(child),
            position: child.position.toArray(),
            rotation: child.rotation.toArray(),
            scale: child.scale.toArray()
          };
          
          // Extract geometry arrays for reconstruction
          if (geometry.attributes.position) {
            meshData.positions = Array.from(geometry.attributes.position.array);
          }
          if (geometry.attributes.normal) {
            meshData.normals = Array.from(geometry.attributes.normal.array);
          }
          if (geometry.attributes.uv) {
            meshData.uvs = Array.from(geometry.attributes.uv.array);
          }
          if (geometry.index) {
            meshData.indices = Array.from(geometry.index.array);
          }
          
          meshes.push(meshData);
          
          // Analyze materials
          if (material && !materials.find(m => m.uuid === material.uuid)) {
            const matData = {
              uuid: material.uuid,
              name: material.name,
              type: material.type,
              color: material.color ? material.color.getHex() : null,
              opacity: material.opacity,
              transparent: material.transparent,
              metalness: material.metalness,
              roughness: material.roughness,
              emissive: material.emissive ? material.emissive.getHex() : null
            };
            
            // Extract texture information
            ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'emissiveMap'].forEach(texType => {
              if (material[texType]) {
                matData[texType] = {
                  uuid: material[texType].uuid,
                  image: material[texType].image ? material[texType].image.src : null,
                  repeat: material[texType].repeat ? material[texType].repeat.toArray() : [1, 1],
                  offset: material[texType].offset ? material[texType].offset.toArray() : [0, 0]
                };
              }
            });
            
            materials.push(matData);
          }
        }
        
        if (child.isBone) {
          bones.push({
            name: child.name,
            position: child.position.toArray(),
            rotation: child.rotation.toArray(),
            scale: child.scale.toArray()
          });
        }
      });

      return {
        totalMeshes: meshes.length,
        totalVertices,
        totalTriangles,
        totalMaterials: materials.length,
        totalBones: bones.length,
        meshes,
        materials,
        bones,
        animations: gltf.animations.map(anim => ({
          name: anim.name,
          duration: anim.duration,
          tracks: anim.tracks.length
        })),
        boundingBox: new THREE.Box3().setFromObject(gltf.scene),
        scale: gltf.scene.scale.toArray()
      };
    };

    const animate = () => {
      requestAnimationFrame(animate);
      
      if (avatarRef.current) {
        avatarRef.current.rotation.y += 0.005;
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    init();

    return () => {
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  const generateClone = () => {
    if (!avatarData || !originalAvatarRef.current) return;

    const cloneGroup = new THREE.Group();
    
    avatarData.meshes.forEach((meshData, index) => {
      // Create geometry from stored data
      const geometry = new THREE.BufferGeometry();
      
      if (meshData.positions) {
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(meshData.positions, 3));
      }
      if (meshData.normals) {
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(meshData.normals, 3));
      }
      if (meshData.uvs) {
        geometry.setAttribute('uv', new THREE.Float32BufferAttribute(meshData.uvs, 2));
      }
      if (meshData.indices) {
        geometry.setIndex(new THREE.Uint32BufferAttribute(meshData.indices, 1));
      }
      
      // Create basic material (textures would need to be loaded separately)
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHex(Math.random() * 0xffffff),
        wireframe: false
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = meshData.name + '_clone';
      mesh.position.fromArray(meshData.position);
      mesh.rotation.fromArray(meshData.rotation);
      mesh.scale.fromArray(meshData.scale);
      
      cloneGroup.add(mesh);
    });
    
    // Position clone next to original
    cloneGroup.position.x = 2;
    sceneRef.current.add(cloneGroup);
    cloneAvatarRef.current = cloneGroup;
    setShowClone(true);
  };

  const exportAvatarData = () => {
    if (!avatarData) return;
    
    const exportObj = {
      metadata: {
        avatarId: '68d2aa0d27fbaaaba4fdfd21',
        exportDate: new Date().toISOString(),
        version: '1.0',
        source: 'Ready Player Me'
      },
      statistics: {
        totalMeshes: avatarData.totalMeshes,
        totalVertices: avatarData.totalVertices,
        totalTriangles: avatarData.totalTriangles,
        totalMaterials: avatarData.totalMaterials,
        totalBones: avatarData.totalBones
      },
      geometry: avatarData.meshes,
      materials: avatarData.materials,
      skeleton: avatarData.bones,
      animations: avatarData.animations,
      boundingBox: {
        min: avatarData.boundingBox.min.toArray(),
        max: avatarData.boundingBox.max.toArray(),
        center: avatarData.boundingBox.getCenter(new THREE.Vector3()).toArray(),
        size: avatarData.boundingBox.getSize(new THREE.Vector3()).toArray()
      }
    };
    
    setExportData(exportObj);
    
    // Download as JSON
    const dataStr = JSON.stringify(exportObj, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `avatar_${avatarData.metadata?.avatarId || '68d2aa0d27fbaaaba4fdfd21'}_data.json`;
    link.click();
  };

  const generateCode = () => {
    if (!avatarData) return '';
    
    return `
// Generated Avatar Recreation Code
// Avatar ID: 68d2aa0d27fbaaaba4fdfd21

import * as THREE from 'three';

export class AvatarGenerator {
  constructor() {
    this.meshes = [];
    this.materials = [];
  }
  
  generateAvatar() {
    const avatarGroup = new THREE.Group();
    
    // Create ${avatarData.totalMeshes} meshes
    ${avatarData.meshes.map((mesh, i) => `
    // Mesh ${i + 1}: ${mesh.name}
    const geometry${i} = new THREE.BufferGeometry();
    geometry${i}.setAttribute('position', new THREE.Float32BufferAttribute([${mesh.positions ? mesh.positions.slice(0, 30).join(',') + '...' : ''}], 3));
    ${mesh.normals ? `geometry${i}.setAttribute('normal', new THREE.Float32BufferAttribute([...], 3));` : ''}
    ${mesh.uvs ? `geometry${i}.setAttribute('uv', new THREE.Float32BufferAttribute([...], 2));` : ''}
    
    const material${i} = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      // Add texture loading here
    });
    
    const mesh${i} = new THREE.Mesh(geometry${i}, material${i});
    mesh${i}.name = '${mesh.name}';
    mesh${i}.position.set(${mesh.position.join(', ')});
    avatarGroup.add(mesh${i});
    `).join('\n')}
    
    return avatarGroup;
  }
  
  // Statistics:
  // - Total Vertices: ${avatarData.totalVertices}
  // - Total Triangles: ${avatarData.totalTriangles}
  // - Total Materials: ${avatarData.totalMaterials}
  // - Total Bones: ${avatarData.totalBones}
}`;
  };

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#111827', display: 'flex' }}>
      {/* 3D Viewport */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
        
        {isLoading && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{ color: 'white', textAlign: 'center' }}>
              <div style={{
                width: '32px',
                height: '32px',
                border: '2px solid #3b82f6',
                borderTop: '2px solid transparent',
                borderRadius: '50%',
                margin: '0 auto 16px',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p>Loading & Analyzing Avatar...</p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        )}
      </div>
      
      {/* Control Panel */}
      <div style={{ 
        width: '384px', 
        backgroundColor: '#1f2937', 
        color: 'white', 
        overflowY: 'auto',
        padding: '16px'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>
          Avatar Analyzer & Generator
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '24px' }}>
          ID: 68d2aa0d27fbaaaba4fdfd21
        </p>
        
        {analysisComplete && avatarData && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Statistics */}
            <div style={{ backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>Avatar Statistics</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '8px', 
                fontSize: '0.875rem' 
              }}>
                <div>Meshes: {avatarData.totalMeshes}</div>
                <div>Materials: {avatarData.totalMaterials}</div>
                <div>Vertices: {avatarData.totalVertices.toLocaleString()}</div>
                <div>Triangles: {avatarData.totalTriangles.toLocaleString()}</div>
                <div>Bones: {avatarData.totalBones}</div>
                <div>Animations: {avatarData.animations.length}</div>
              </div>
            </div>
            
            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={generateClone}
                disabled={showClone}
                style={{
                  width: '100%',
                  backgroundColor: showClone ? '#4b5563' : '#2563eb',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: showClone ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                {showClone ? 'Clone Generated' : 'Generate Clone'}
              </button>
              
              <button
                onClick={exportAvatarData}
                style={{
                  width: '100%',
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                Export Avatar Data (JSON)
              </button>
            </div>
            
            {/* Mesh List */}
            <div style={{ backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>
                Mesh Components ({avatarData.totalMeshes})
              </h3>
              <div style={{ 
                maxHeight: '160px', 
                overflowY: 'auto', 
                fontSize: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                {avatarData.meshes.map((mesh, i) => (
                  <div key={i} style={{ backgroundColor: '#4b5563', padding: '8px', borderRadius: '4px' }}>
                    <div style={{ fontWeight: '500' }}>{mesh.name}</div>
                    <div style={{ color: '#d1d5db' }}>
                      {mesh.vertices} vertices, {mesh.triangles} triangles
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Materials */}
            <div style={{ backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>
                Materials ({avatarData.totalMaterials})
              </h3>
              <div style={{ 
                maxHeight: '128px', 
                overflowY: 'auto', 
                fontSize: '0.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                {avatarData.materials.map((mat, i) => (
                  <div key={i} style={{ backgroundColor: '#4b5563', padding: '8px', borderRadius: '4px' }}>
                    <div style={{ fontWeight: '500' }}>{mat.name || `Material ${i + 1}`}</div>
                    <div style={{ color: '#d1d5db' }}>{mat.type}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Generated Code Preview */}
            <div style={{ backgroundColor: '#374151', borderRadius: '8px', padding: '16px' }}>
              <h3 style={{ fontWeight: '600', marginBottom: '8px' }}>Generated Code</h3>
              <textarea
                value={generateCode()}
                readOnly
                style={{
                  width: '100%',
                  height: '128px',
                  backgroundColor: '#1f2937',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  padding: '8px',
                  borderRadius: '4px',
                  border: 'none',
                  resize: 'none'
                }}
              />
              <button
                onClick={() => navigator.clipboard.writeText(generateCode())}
                style={{
                  marginTop: '8px',
                  width: '100%',
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                Copy Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarAnalyzerGenerator;