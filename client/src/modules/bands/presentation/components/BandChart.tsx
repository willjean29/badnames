import { useContext, useEffect, useState } from "react";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { SocketContext } from "../../../../shared/infra/context/SocketContext";
import { IBand } from "../../domain/models/IBand";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState<IBand[]>([]);

  useEffect(() => {
    socket.on("get-bands", (bands: IBand[]) => {
      setBands(bands);
    });
    return () => {
      socket.off("get-bands");
    };
  }, [socket]);

  if (!bands) return null;

  return (
    <Bar
      options={{
        indexAxis: "y",
      }}
      data={{
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map((band) => band.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
