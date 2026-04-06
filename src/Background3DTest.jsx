import React from "react";

export default function Background3D() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        background: "red",
        padding: "20px",
        border: "5px solid yellow",
        borderRadius: "10px",
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
        pointerEvents: "none",
      }}
    >
      🎨 BACKGROUND 3D FUNCIONANDO!
      <br />
      SI VES ESTO, TODO OK
    </div>
  );
}