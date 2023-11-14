import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../../shared/infra/context/SocketContext";
import { IBand } from "../../domain/models/IBand";
// import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const [bands, setBands] = useState<IBand[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("get-bands", (bands) => {
      setBands(bands);
    });
    return () => {
      socket.off("get-bands");
    };
  }, [socket]);

  const changeName = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const nuevoNombre = event.target.value;

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const handleChangeName = (id: string, name: string) => {
    console.log({ name });
    socket.emit("change-name-band", { id, name });
  };

  const handleVote = (id: string) => {
    socket.emit("vote-band", { id });
  };

  const handleDelete = (id: string) => {
    socket.emit("remove-band", { id });
  };

  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => handleVote(band.id)}>
            {" "}
            +1{" "}
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            onChange={(event) => changeName(event, band.id)}
            onBlur={() => handleChangeName(band.id, band.name)}
          />
        </td>
        <td>
          {" "}
          <h3> {band.votes} </h3>{" "}
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => handleDelete(band.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
