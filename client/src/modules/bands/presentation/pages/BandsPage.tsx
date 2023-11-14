import { useContext } from "react";
import { SocketContext } from "../../../../shared/infra/context/SocketContext";
import { BandChart } from "../components/BandChart";
import { BandAdd } from "../components/BandAdd";
import { BandList } from "../components/BandList";
// import { SocketContext } from "../context/SocketContext";

// import { BandAdd } from "../componets/BandAdd";
// import { BandList } from "../componets/BandList";
// import { BandChart } from "../componets/BandChart";

function BandsPage() {
  const { online } = useContext(SocketContext);
  console.log({ online });
  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? <span className="text-success"> Online</span> : <span className="text-danger"> Offline</span>}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col d-flex justify-content-center align-items-center">
          <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>

        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default BandsPage;
