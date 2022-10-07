import { useContext } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  XAxis,
  YAxis
} from 'recharts'
import { MediaContext } from '../../../../providers/media-provider'
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
  const { isLargerThanMd} = useContext(MediaContext)
  const adapter = (data: PaymentOverMonthType[]): TranslatedData[] => {
    return data.map((item) => ({
      mes: toBRMonth(item.month),
      receita: item.income ?? 0,
      despesa: item.expense ?? 0,
      total: item.income ?? 0 + item.expense ?? 0,
    }))
  }
  return (
    <BarChart
      width={isLargerThanMd ? 800 : 320}
      height={isLargerThanMd ? 300 : 280}
      data={adapter(data)}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <Legend />
      <XAxis dataKey="mes" />
      <YAxis dataKey="total" />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="receita" stackId="1" barSize={30} fill="#0069ff" />
      <Bar dataKey="despesa" stackId="2" barSize={30} fill="#93C5FD" />
    </BarChart>
  )
}
