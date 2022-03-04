import React, { useState, useEffect } from "react";
import { getAllUsers } from "../services/connect";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function NivoChart() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchData()
  },[]);

  const fetchData = async () => {
    try {
      const response = await getAllUsers();
      setData(response);
    } catch (err) {
      console.log("Error", err.messsage);
    }
  }
  return (
    <div className="container pt-4">
      <ResponsiveContainer className="chart" height={300}>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="athlete" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="age"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="country" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NivoChart;
