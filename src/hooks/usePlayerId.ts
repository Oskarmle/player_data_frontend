import { useEffect, useState } from "react";

export function usePlayerId() {
  const [playerId, setPlayerId] = useState<string>("");

  useEffect(() => {
    const updatePlayer = () => {
      const id = localStorage.getItem("selectedPlayerId");
      if (id) setPlayerId(id);
    };

    updatePlayer();
    window.addEventListener("playerIdChanged", updatePlayer);

    return () => {
      window.removeEventListener("playerIdChanged", updatePlayer);
    };
  }, []);

  return playerId;
}
