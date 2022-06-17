import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { ExpenseList } from './expense/expense-list'
import { IncomeByPatientList } from './income/income-by-patient-list'
import { IncomeList } from './income/income-list'

export const PaymentList = () => {
  return (
    <Flex>
      <Tabs
        colorScheme="blue"
        id="payment-list"
        isLazy
        w="full"
        h="full"
        size="md"
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
    </Flex>
  )
}
