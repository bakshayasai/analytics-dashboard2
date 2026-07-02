import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [data, setData] = useState([]);
  const [month, setMonth] = useState("");
const [users, setUsers] = useState("");
const [revenue, setRevenue] = useState("");
const [orders, setOrders] = useState("");
const [growth, setGrowth] = useState("");

  const lineData = {
  labels: data.map((item) => item.month),
  datasets: [
    {
      label: "Revenue",
      data: data.map((item) => item.revenue),
      borderColor: "blue",
      backgroundColor: "lightblue",
    },
  ],
};

const barData = {
  labels: data.map((item) => item.month),
  datasets: [
    {
      label: "Orders",
      data: data.map((item) => item.orders_count),
      backgroundColor: "green",
    },
  ],
};
  useEffect(() => {
    axios
      .get("http://localhost:5000/analytics")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const addRecord = async () => {
  try {
    await axios.post("http://localhost:5000/analytics", {
      month: month,
      users_count: Number(users),
      revenue: Number(revenue),
      orders_count: Number(orders),
      growth: Number(growth),
    });

    alert("Record Added Successfully!");

    window.location.reload();
  } catch (err) {
    console.log(err);
    alert("Error adding record");
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>Analytics Dashboard</h1>
      <div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap",
  }}
>
  <div style={{ border: "1px solid #ccc", padding: "20px", width: "180px" }}>
    <h3>Total Users</h3>
    <h2>{data.reduce((sum, item) => sum + item.users_count, 0)}</h2>
  </div>

  <div style={{ border: "1px solid #ccc", padding: "20px", width: "180px" }}>
    <h3>Total Revenue</h3>
    <h2>₹{data.reduce((sum, item) => sum + item.revenue, 0)}</h2>
  </div>

  <div style={{ border: "1px solid #ccc", padding: "20px", width: "180px" }}>
    <h3>Total Orders</h3>
    <h2>{data.reduce((sum, item) => sum + item.orders_count, 0)}</h2>
  </div>

  <div style={{ border: "1px solid #ccc", padding: "20px", width: "180px" }}>
    <h3>Average Growth</h3>
    <h2>
      {Math.round(
        data.reduce((sum, item) => sum + item.growth, 0) /
          (data.length || 1)
      )}
      %
    </h2>
  </div>
</div>
      <div style={{ width: "700px", marginBottom: "30px" }}>
  <h2>Revenue Trend</h2>
  <Line data={lineData} />
</div>

<div style={{ width: "700px", marginBottom: "30px" }}>
  <h2>Orders Trend</h2>
  <Bar data={barData} />
</div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Month</th>
            <th>Users</th>
            <th>Revenue</th>
            <th>Orders</th>
            <th>Growth</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.month}</td>
              <td>{item.users_count}</td>
              <td>{item.revenue}</td>
              <td>{item.orders_count}</td>
              <td>{item.growth}%</td>
            </tr>
          ))}
        </tbody>
      </table>
     

    <hr />

    <h2>Add Analytics Record</h2>

    <input
      type="text"
      placeholder="Month"
      value={month}
      onChange={(e) => setMonth(e.target.value)}
    />
    <br /><br />

    <input
      type="number"
      placeholder="Users"
      value={users}
      onChange={(e) => setUsers(e.target.value)}
    />
    <br /><br />

    <input
      type="number"
      placeholder="Revenue"
      value={revenue}
      onChange={(e) => setRevenue(e.target.value)}
    />
    <br /><br />

    <input
      type="number"
      placeholder="Orders"
      value={orders}
      onChange={(e) => setOrders(e.target.value)}
    />
    <br /><br />

    <input
      type="number"
      placeholder="Growth"
      value={growth}
      onChange={(e) => setGrowth(e.target.value)}
    />
    <br /><br />

    <button onClick={addRecord}>Add Record</button>
  </div>
);
}
  

export default App;