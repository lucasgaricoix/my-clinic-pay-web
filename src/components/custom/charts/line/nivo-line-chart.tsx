import { ResponsiveLine } from '@nivo/line'
import { PaymentOverMonthType } from '../../../../types/payment/payment'
import { toBRMonth } from '../../../../utils/format'

type Props = {
  data: PaymentOverMonthType[]
}

type LineChartData = {
  id: string
  color: string
  data: Data[]
}

type Data = {
  x: string
  y: number
}

export const NivoLineChart = ({ data }: Props) => {
  const paymentData: LineChartData[] = []

  data.sort((a,b) => a.year - b.year)

  const income = {
    id: 'receitas',
    color: 'hsl(63, 70%, 50%)',
    data: data.map(value => {
      return {
        x: `${value.year} - ${toBRMonth(value.month)}`,
        y: value.income ?? 0,
      }    
    })  
  }

  const expense = {
    id: 'despesas',
    color: 'hsl(358, 70%, 50%)',
    data: data.map(value => {
      return {
        x: `${value.year} - ${toBRMonth(value.month)}`,
        y: value.expense ?? 0,
      }    
    })  
  }

  const total = {
    id: 'total',
    color: 'hsl(34, 70%, 50%)',
    data: data.map(value => {
      return {
        x: `${value.year} - ${toBRMonth(value.month)}`,
        y: value.income ?? 0 - value.expense ?? 0,
      }    
    })  
  }

  paymentData.push(income, expense, total)

  return (
    <ResponsiveLine
      data={paymentData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        // orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'ano/mês',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        // orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'valor',
        legendOffset: -40,
        legendPosition: 'start',
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  )
}
