import { useEffect, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LineChartView({ xAxis, series, label, labelSuffix }) {
  const [seriesState, setSeriesState] = useState([]);

  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <ul className="line-chart-legend">
        {payload.map((entry, index) => (
          <li key={`item-${index}`}>{label || entry.value}</li>
        ))}
      </ul>
    );
  };

  const renderTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">
            {`${label} : `}
            <span className="bolded">
              {payload[0].value} {labelSuffix}
            </span>
          </p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (
      xAxis &&
      xAxis[0] &&
      xAxis[0].data &&
      series &&
      series[0] &&
      series[0].data
    ) {
      const seriesToSet = xAxis[0].data.map((date, index) => ({
        dates: date,
        Sales: !isNaN(series[0].data[index]) ? series[0].data[index] : 0,
      }));

      setSeriesState(seriesToSet);
    }
  }, [xAxis, series]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={350}
        data={seriesState}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="dates" />
        <YAxis />
        <Tooltip content={renderTooltip} />
        <Legend content={renderLegend} />
        <Line type="monotone" dataKey="Sales" stroke="#f1676d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
