import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { ExpenseList } from './expense/expense-list'
import { IncomeByPatientList } from './income/by-patient/income-by-patient-list'
import { IncomeList } from './income/income-list'

export const PaymentList = () => {
  return (
    <Box w="full">
      <Tabs
        isFitted
        colorScheme="blue"
        id="payment-list"
        isLazy
        w="full"
        h="full"
        size="sm"
      >
        <TabList>
          <Tab>Receitas por paciente</Tab>
          <Tab>Receitas</Tab>
          <Tab>Despesas</Tab>
        </TabList>
        <TabPanels>
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
    </Box>
  )
}
