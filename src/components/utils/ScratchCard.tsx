import React, { useEffect, useState } from "react";
import "./styles/card.css";

type PropsType = {
  data: React.ReactNode,
  imageSrc: string,
  handleCoverScratched?: () => void
};

type EventTypes = {
  mouse: {
    down: string;
    move: string;
    up: string;
  };
  touch: {
    down: string;
    move: string;
    up: string;
  };
  [key: string]: {
    down: string;
    move: string;
    up: string;
  };
};

const ScratchCard = ({ data, imageSrc, handleCoverScratched }: PropsType) => {
  const [coverRemoved, setCoverRemoved] = useState<boolean>(false);
  const [coverReady, setCoverReady] = useState<boolean>(false); // Add state for cover readiness

  useEffect(() => {
    let coverScratched = false;
    const canvasElement = document.getElementById("scratch") as HTMLCanvasElement;
    const canvasContext = canvasElement.getContext("2d");
    const eventTypes: EventTypes = {
      mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup",
      },
      touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend",
      },
    };

    const initializeCanvas = () => {
      const coverImage = new Image();
      coverImage.src = imageSrc;

      coverImage.onload = () => {
        if (canvasContext) {
          canvasContext.drawImage(coverImage, 0, 0, canvasElement.width, canvasElement.height);
          setCoverReady(true); // Set cover as ready when image is loaded
        }
      };
    };

    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let deviceType = "";

    const checkIfTouchDevice = () => {
      try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
      } catch (e) {
        deviceType = "mouse";
        return false;
      }
    };

    const getMouseCoordinates = (event: MouseEvent | TouchEvent) => {
      const touch = "touches" in event ? (event as TouchEvent).touches[0] : event as MouseEvent;
      mouseX = touch.pageX - canvasElement.getBoundingClientRect().left;
      mouseY = touch.pageY - canvasElement.getBoundingClientRect().top;
    };

    const handleDown = (event: any) => {
      isDragging = true;
      getMouseCoordinates(event);
      scratch(mouseX, mouseY);
    };

    const handleMove = (event: any) => {
      if (deviceType === "mouse") event.preventDefault();
      if (isDragging) {
        getMouseCoordinates(event);
        scratch(mouseX, mouseY);
      }
    };

    const handleUp = () => {
      isDragging = false;
      checkScratchedPercentage();
    };

    const checkScratchedPercentage = () => {
      if (canvasContext) {
        const imageData = canvasContext.getImageData(0, 0, canvasElement?.width, canvasElement?.height).data;
        let scratchedPixels = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          if (imageData[i + 3] === 0) {
            scratchedPixels++;
          }
        }
        const coverArea = canvasElement.width * canvasElement.height;
        const currentScratchedPercentage = (scratchedPixels / coverArea) * 100;
        if (currentScratchedPercentage >= 80) {
          setCoverRemoved(true);
          if (!coverScratched && handleCoverScratched) {
            handleCoverScratched();
            coverScratched = true;
          }
        }
      }
    };

    checkIfTouchDevice();

    canvasElement?.addEventListener(eventTypes[deviceType].down, handleDown);
    canvasElement?.addEventListener(eventTypes[deviceType].move, handleMove);
    document.addEventListener(eventTypes[deviceType].up, handleUp);

    const scratch = (x: number, y: number) => {
      if (canvasContext) {
        canvasContext.globalCompositeOperation = "destination-out";
        canvasContext.beginPath();
        canvasContext.arc(x, y, 22, 0, 2 * Math.PI);
        canvasContext.fill();

        const lastX = canvasElement?.dataset.lastX ? parseInt(canvasElement?.dataset.lastX) : x;
        const lastY = canvasElement?.dataset.lastY ? parseInt(canvasElement?.dataset.lastY) : y;
        const dx = x - lastX;
        const dy = y - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 1) {
          for (let i = 0; i < distance; i++) {
            const newX = lastX + (dx * i) / distance;
            const newY = lastY + (dy * i) / distance;
            canvasContext.beginPath();
            canvasContext.arc(newX, newY, 22, 0, 2 * Math.PI);
            canvasContext.fill();
          }
        }

        canvasElement.dataset.lastX = x.toString();
        canvasElement.dataset.lastY = y.toString();
      }
    };

    initializeCanvas();

    return () => {
      canvasElement?.removeEventListener(eventTypes[deviceType].down, handleDown);
      canvasElement?.removeEventListener(eventTypes[deviceType].move, handleMove);
      document.removeEventListener(eventTypes[deviceType].up, handleUp);
    };
  }, [imageSrc]); // Include imageSrc in dependency array

  return (
    <div className="container">
      <div className="base">
        {coverReady && data} {/* Only render data when cover is ready */}
      </div>
      {!coverRemoved && <canvas id="scratch" width="200" height="200"></canvas>}
    </div>
  );
};

export { ScratchCard };
