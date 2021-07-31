import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts'
import { PaymentOverMonthType } from '../../../../types/payment/payment'
import { toBRMonth } from '../../../../utils/format'

type Props = {
  data: PaymentOverMonthType[]
}

type TranslatedData = {
  mes: string
  receita: number
  despesa: number
  total: number
}

export const MensalIncomeExpenseBarChart: React.FC<Props> = ({ data }) => {
  const adapter = (data: PaymentOverMonthType[]): TranslatedData[] => {
    return data.map((item) => ({
      mes: toBRMonth(item.month),
      receita: item.income,
      despesa: item.expense,
      total: item.amount,
    }))
  }
  return (
    <BarChart
      width={800}
      height={300}
      data={adapter(data)}
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
