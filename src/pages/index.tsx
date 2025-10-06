import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

import styles from "../styles/globals.css";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState<string>("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/stream"); // optional websocket backend
    eventSource.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (!selectedToken || msg.token === selectedToken) {
        setData((d) => [...d.slice(-50), msg]);
      }
    };
  }, [selectedToken]);

  return (
    <div className="container">
      <h1>Crypto RSI Dashboard</h1>
      <select onChange={(e) => setSelectedToken(e.target.value)}>
        <option value="">All Tokens</option>
        {[...new Set(data.map((d) => d.token))].map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <div className="chart-container">
        <h3>RSI Values</h3>
        <LineChart width={800} height={300} data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="token" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="rsi" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}
