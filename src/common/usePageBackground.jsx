import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageBackground() {
  const location = useLocation();

  useEffect(() => {
    const backgrounds = {
      "/": "/a.webp",
      "/vehicles": "/v.webp",
      "/equipments": "/e.webp",
      "/faxes": "/m.webp",
    };

    const backgroundImage = backgrounds[location.pathname] || "none";

    document.body.style.backgroundImage =
      backgroundImage !== "none"
        ? `linear-gradient(rgba(157, 186, 240, 0.5), rgba(160, 201, 238, 0.308)), url(${backgroundImage})`
        : "none";

    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style.backgroundImage = "none";
    };
  }, [location]);
}

export default usePageBackground;
