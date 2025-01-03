import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export const useExplode = (group, { distance = 3, enableRotation = true }) => {
  useEffect(() => {
    const groupWorldPosition = new THREE.Vector3();
    group.current.getWorldPosition(groupWorldPosition);

    group.current.children.forEach((mesh) => {
      mesh.originalPosition = mesh.position.clone();
      const meshWorldPosition = new THREE.Vector3();
      mesh.getWorldPosition(meshWorldPosition);

      mesh.directionalVector = meshWorldPosition
        .clone()
        .sub(groupWorldPosition)
        .normalize();

      mesh.originalRotation = mesh.rotation.clone();
      mesh.targetRotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
    });
  }, []);

  useEffect(() => {
    group.current.children.forEach((mesh) => {
      mesh.targetPosition = mesh.originalPosition
        .clone()
        .add(mesh.directionalVector.clone().multiplyScalar(distance));
    });
  }, [distance]);

  const scrollData = useScroll();

  useFrame(() => {
    group.current.children.forEach((mesh) => {
      mesh.position.x = THREE.MathUtils.lerp(
        mesh.originalPosition.x,
        mesh.targetPosition.x,
        scrollData.offset // 0 at the beginning, 1 after scroll
      );

      mesh.position.y = THREE.MathUtils.lerp(
        mesh.originalPosition.y,
        mesh.targetPosition.y,
        scrollData.offset // 0 at the beginning, 1 after scroll
      );

      mesh.position.z = THREE.MathUtils.lerp(
        mesh.originalPosition.z,
        mesh.targetPosition.z,
        scrollData.offset // 0 at the beginning, 1 after scroll
      );

      if(enableRotation) {
        mesh.rotation.x = THREE.MathUtils.lerp(
          mesh.originalRotation.x,
          mesh.targetRotation.x,
          scrollData.offset // 0 at the beginning, 1 after scroll
        );

        mesh.rotation.y = THREE.MathUtils.lerp(
          mesh.originalRotation.y,
          mesh.targetRotation.y,
          scrollData.offset // 0 at the beginning, 1 after scroll
        );

        mesh.rotation.z = THREE.MathUtils.lerp(
          mesh.originalRotation.z,
          mesh.targetRotation.z,
          scrollData.offset // 0 at the beginning, 1 after scroll
        );
      }
    });
  });
};
