"use client";

// import React, { useEffect } from "react";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  //   useEffect(() => {
  //     const disableRightClick = (e: Event) => e.preventDefault();
  //     const disableDrag = (e: Event) => e.preventDefault();

  //     document.addEventListener("contextmenu", disableRightClick);
  //     document.addEventListener("dragstart", disableDrag);

  //     return () => {
  //       document.removeEventListener("contextmenu", disableRightClick);
  //       document.removeEventListener("dragstart", disableDrag);
  //     };
  //   }, []);

  return (
    <div
      // style={{ userSelect: "none" }}
      // onContextMenu={(e) => e.preventDefault()}
      // onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}


