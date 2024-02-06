import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import axios from "axios";

const Scene = ({ vertex, fragment }) => {
    const meshRef = useRef();

    // Load the noise texture and update the shader uniform
    useFrame((state,delta) => {
        let time = state.clock.getElapsedTime();
        // start from 20 to skip first 20 seconds ( optional )
        meshRef.current.material.uniforms.u_time.value += delta;
    });

    const viewport = useThree(state => state.viewport)

    // Define the shader uniforms with memoization to optimize performance
    const uniforms = useMemo(
        () => ({
            u_time: {
                type: "f",
                value: 0.0,
            },
            u_resolution: {
                type: "v2",
                value: new THREE.Vector2(1920,1080),
            }
        }),
        []
    );

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[viewport.width,viewport.height]}/>
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={vertex}
                fragmentShader={fragment}
            />
        </mesh>
    );
};

function ShaderBlock() {
    // State variables to store the vertex and fragment shaders as strings
    const [vertex, setVertex] = useState("");
    const [fragment, setFragment] = useState("");

    // Fetch the shaders once the component mounts
    useEffect(() => {
        // fetch the vertex and fragment shaders from public folder 
        axios.get("/vert.glsl").then((res) => setVertex(res.data));
        axios.get("/frag.glsl").then((res) => setFragment(res.data));
    }, []);

    // If the shaders are not loaded yet, return null (nothing will be rendered)
    if (vertex == "" || fragment == "") return null;
    return (
        <Canvas style={{ width: "100vw", height: "100vh" }}>
            <Scene vertex={vertex} fragment={fragment} />
        </Canvas>
    );
}

export default ShaderBlock;