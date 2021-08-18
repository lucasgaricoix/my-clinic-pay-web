import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { PaymentDashboard } from './all/dashboard'
import { ExpenseList } from './expense/expense-list'
import { IncomeByPatientList } from './income/income-by-patient-list'
import { IncomeList } from './income/income-list'

export const PaymentList = () => {
  return (
    <Tabs
      colorScheme="purple"
      id="payment-list"
      isLazy
      w="full"
      h="full"
      size="md"
    >
      <TabList>
        <Tab>Todos</Tab>
        <Tab>Receitas por paciente</Tab>
        <Tab>Receitas</Tab>
        <Tab>Despesas</Tab>
      </TabList>
      <TabPanels>
        <TabPanel id="all">
          <PaymentDashboard />
        </TabPanel>
        <TabPanel id="income-by-patient">
          <IncomeByPatientList />
        </TabPanel>
        <TabPanel id="income">
          <IncomeList />
        </TabPanel>
        <TabPanel id="expense">
          <ExpenseList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
