import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'

type Data = {
  mes: string
  receita: number
  despesa: number
  total?: number
}

type Props = {
  data: Data[]
}

export const MensalIncomeBarChart: React.FC<Props> = ({ data }) => {
  return (
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <Legend />
      <CartesianGrid color="gray.300" strokeDasharray="3 3" />
      <XAxis dataKey="mes" />
      <YAxis dataKey="total" />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="receita" stackId="1" barSize={30} fill="teal" />
      <Bar dataKey="despesa" stackId="2" barSize={30} fill="#A16AE8" />
    </BarChart>
  )
}
