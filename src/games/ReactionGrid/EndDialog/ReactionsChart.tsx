import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { convertMsToSeconds } from '../helpers';

interface Props {
  reactionArr: number[];
}
export const ReactionsChart = ({ reactionArr }: Props) => {
  const data = reactionArr.map((reaction, index) => ({
    name: index + 1,
    time: convertMsToSeconds(reaction),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />

        <Line
          type="monotone"
          dataKey="time"
          stroke="#90EE90" // Change line color to green
          strokeWidth={3} // Make the line thicker
          activeDot={{ r: 4 }}
          dot={false} // Hide the dots on the line
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
