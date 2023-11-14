import React, { useContext, useState } from "react";
import { SocketContext } from "../../../../shared/infra/context/SocketContext";

export const BandAdd = () => {
  const [name, setName] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (name.trim().length > 0) {
      socket.emit("add-band", { name });
      setName("");
    }
  };

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={(e) => onSubmit(e)}>
        <input className="form-control" placeholder="Nuevo nombre de banda" value={name} onChange={(ev) => setName(ev.target.value)} />
      </form>
    </>
  );
};
