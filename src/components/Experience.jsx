import {
  Billboard,
  Environment,
  Float,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { Model } from "./Fuckoff.jsx";
import { BananaModel } from "./Banana.jsx";
import { WesternBluebird } from "./BlueBird";
import { useControls } from "leva";
export const Experience = () => {
  const { item } = useControls({
    item: {
      value: "triangularSphere",
      options: ["triangularSphere", "banana", "bird"],
    },
  });

  const xLogo = useTexture("/textures/x-logo.png");

  function isTouchDevice() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  return (
    <>
      {!isTouchDevice() ? <OrbitControls enableZoom={false} /> : null}
      <Float floatIntensity={2} speed={3}>
        <Model scale={0.01} visible={item === "triangularSphere"} />
        <BananaModel scale={0.01} visible={item === "banana"} />
        <WesternBluebird
          scale={1.34}
          rotation-y={-Math.PI / 4}
          visible={item === "bird"}
        />

        <Billboard visible={item === "bird"}>
          <mesh>
            <planeGeometry args={[0.8, 0.8]} />
            <meshBasicMaterial map={xLogo} transparent />
          </mesh>
        </Billboard>
      </Float>
      <Environment preset="sunset" background blur={0.4} />
    </>
  );
};
