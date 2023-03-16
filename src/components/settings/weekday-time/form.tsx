import { FormikCheckboxItem } from '@/components/custom/formik'
import { WeekdaySettings } from '@/types/settings/weekday-time'
import { weekdaysShortNamesDefault } from '@/utils/date'
import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  CheckboxGroup,
  Flex,
  Icon,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { weekdayTimesData } from './initial-value'
import { TimeRangeComponent } from './time-range'

const initialValues: WeekdaySettings = {
  weekdays: weekdaysShortNamesDefault,
  weekdaysTimes: weekdayTimesData,
}

export const WeekdayTimeSettings = () => {
  const [isLargerThanMd] = useMediaQuery(['(min-width: 48em)'])

  function weekdayAdapter(weekday: string): number {
    const map: Record<string, number> = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    }

    return map[weekday]
  }

  function handleSubmit(
    data: WeekdaySettings,
    action: FormikHelpers<WeekdaySettings>
  ) {
    data.weekdaysTimes
      .filter((value) => data.weekdays.includes(value.name))
      .forEach((value) => {
        if (!value.times.find((value) => value.start)) {
          action.setFieldError(
            `weekdaysTimes.${weekdayAdapter(value.name)}.start`,
            'Hora incorreta'
          )
        }
        if (!value.times.find((value) => value.end)) {
          action.setFieldError(
            `weekdaysTimes.${weekdayAdapter(value.name)}.end`,
            'Hora incorreta'
          )
        }
      })

    // TODO: add create service
  }

  return (
    <Flex
      direction="column"
      borderWidth={{base: 0, md: "1px"}}
      borderColor="gray.200"
      borderRadius="lg"
      px={{ base: 3, md: 6 }}
      pt={6}
    >
      <Text mb={6}>Configure seus horários de atendimento</Text>
      <Formik<WeekdaySettings>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ initialValues, values, setFieldValue, setFieldTouched }) => (
          <Form id="weekday-time-form">
            <CheckboxGroup
              colorScheme="blue"
              defaultValue={weekdaysShortNamesDefault}
            >
              {values.weekdaysTimes.map((weekdayTime, mainIndex, arr) => {
                const lastIndex = mainIndex === arr.length - 1
                return (
                  <Stack
                    direction={['column', 'row']}
                    key={weekdayTime.name}
                    alignItems="start"
                    justifyContent="start"
                    borderBottomColor="gray.300"
                    borderBottomWidth="1px"
                    py={{ base: 2, md: 4 }}
                  >
                    <Flex
                      direction={['column', 'row']}
                      justifyContent="space-evenly"
                      alignItems="start"
                      w={{ base: 'full', md: 'auto' }}
                    >
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        w="full"
                        mb={{ base: 4 }}
                      >
                        <Box w={{ base: 'auto', md: 24 }}>
                          <FormikCheckboxItem
                            id={weekdayTime.name}
                            name="weekdays"
                            label={weekdayTime.label}
                          />
                        </Box>
                        {!isLargerThanMd && (
                          <Button
                            bgColor="transparent"
                            _hover={{ backgroundColor: 'transparent' }}
                            size="sm"
                            onClick={() =>
                              setFieldValue(
                                `weekdaysTimes[${mainIndex}].times`,
                                [
                                  ...weekdayTime.times,
                                  { start: undefined, end: undefined },
                                ]
                              )
                            }
                          >
                            <Icon as={AddIcon} />
                          </Button>
                        )}
                      </Flex>
                      <Flex direction="column">
                        {weekdayTime.times.map((__, childIndex) => {
                          return (
                            <Flex direction="column" key={`time-${childIndex}`}>
                              <TimeRangeComponent
                                values={values}
                                times={weekdayTime.times}
                                mainIndex={mainIndex}
                                childIndex={childIndex}
                                lastIndex={lastIndex}
                                weekdayName={weekdayTime.name}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                              />
                            </Flex>
                          )
                        })}
                      </Flex>
                    </Flex>
                    {isLargerThanMd && (
                      <Flex>
                        <Button
                          bgColor="transparent"
                          _hover={{ backgroundColor: 'transparent' }}
                          size="sm"
                          onClick={() => {
                            setFieldValue(`weekdaysTimes[${mainIndex}].times`, [
                              ...weekdayTime.times,
                              { start: undefined, end: undefined },
                            ])
                          }}
                        >
                          <Icon as={AddIcon} />
                        </Button>
                      </Flex>
                    )}
                  </Stack>
                )
              })}
            </CheckboxGroup>
            <Flex
              justifyContent="end"
              alignItems="center"
              p={{ base: 2, md: 4 }}
            >
              <Button
                bgColor="transparent"
                _hover={{
                  backgroundColor: 'transparent',
                  textDecorationLine: 'underline',
                }}
              >
                <Text fontSize="sm">Cancelar</Text>
              </Button>
              <Button
                form="weekday-time-form"
                type="submit"
                borderRadius="2xl"
                size="sm"
                bgColor="primary.blue.pure"
                _hover={{
                  backgroundColor: 'secondary.blue.pure',
                }}
              >
                <Text fontSize="sm" color="white">
                  Salvar
                </Text>
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  )
}
