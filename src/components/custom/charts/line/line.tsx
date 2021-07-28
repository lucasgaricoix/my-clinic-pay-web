import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'

export const LineChartComponent = (data = []) => {
  return (
    <LineChart
      width={400}
      height={400}
      data={data}
      margin={{ top: 5, right: 0, left: 10, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="value" stroke="#387908" yAxisId={0} />
    </LineChart>
  )
}
