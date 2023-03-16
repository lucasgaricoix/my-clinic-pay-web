import { FormikCheckboxItem } from '@/components/custom/formik'
import { FormikTimeInput } from '@/components/custom/formik/formik-time-input'
import { TimeRange, WeekdaySettings } from '@/types/settings/weekday'
import { weekdaysShortNamesDefault } from '@/utils/date'
import { AddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  CheckboxGroup,
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { IoTrashOutline } from 'react-icons/io5'
import { weekdayTimesData } from './initial-value'

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

  // console.log(initialValues)
  return (
    <Flex
      direction="column"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="lg"
      px={{ base: 2, md: 6 }}
      pt={6}
    >
      <Text mb={6}>Configure seus horários de atendimento</Text>
      <Formik<WeekdaySettings>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ initialValues, values, setFieldValue }) => (
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
                      justifyContent="space-evenly"
                      alignItems="start"
                      w={{ base: 'full', md: 'auto' }}
                    >
                      <Box w={{ base: '10vh', md: 24 }}>
                        <FormikCheckboxItem
                          id={weekdayTime.name}
                          name="weekdays"
                          label={weekdayTime.label}
                          size={{ base: 'sm', md: 'md' }}
                        />
                      </Box>
                      {!isLargerThanMd && (
                        <Button
                          bgColor="transparent"
                          _hover={{ backgroundColor: 'transparent' }}
                          size="sm"
                          onClick={() =>
                            setFieldValue(`weekdaysTimes[${mainIndex}].times`, [
                              ...weekdayTime.times,
                              { start: undefined, end: undefined },
                            ])
                          }
                        >
                          <Icon as={AddIcon} />
                        </Button>
                      )}
                      <Flex direction="column">
                        {weekdayTime.times.map((__, childIndex) => {
                          return (
                            <Flex direction="column" key={`time-${childIndex}`}>
                              <TimeRangeComponent
                                values={values}
                                mainIndex={mainIndex}
                                childIndex={childIndex}
                                lastIndex={lastIndex}
                                weekdayName={weekdayTime.name}
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
                          onClick={() =>
                            setFieldValue(`weekdaysTimes[${mainIndex}].times`, [
                              ...weekdayTime.times,
                              { start: undefined, end: undefined },
                            ])
                          }
                        >
                          <Icon as={AddIcon} />
                        </Button>
                      </Flex>
                    )}
                  </Stack>
                )
              })}
            </CheckboxGroup>
            {/* <Button type="submit">Salvar</Button> */}
          </Form>
        )}
      </Formik>
    </Flex>
  )
}

type TimeRangeProps = {
  values: WeekdaySettings
  mainIndex: number
  childIndex: number
  lastIndex: boolean
  weekdayName: string
}

function TimeRangeComponent({
  values,
  mainIndex,
  childIndex,
  lastIndex,
  weekdayName,
}: TimeRangeProps) {
  // console.log(`weekdaysTimes[${mainIndex}].times[${childIndex}].start`)
  return (
    <Flex
      justifyContent="start"
      alignItems={['center', 'start']}
      w="full"
      // borderBottom={lastIndex ? 'transparent' : 'gray.300'}
      // borderBottomWidth={lastIndex ? 'trannsparent' : '1px'}
      // py={{ base: 4, md: 6 }}
      pb={4}
    >
      {values.weekdays.includes(weekdayName) ? (
        <Flex alignItems="start">
          <Box mr={{ base: 1, md: 4 }}>
            <FormikTimeInput
              id={mainIndex.toString()}
              name={`weekdaysTimes[${mainIndex}].times[${childIndex}].start`}
              size={{ base: 'sm', md: 'md' }}
            />
          </Box>
          {'-'}
          <Box ml={{ base: 1, md: 4 }}>
            <FormikTimeInput
              id={mainIndex.toString()}
              name={`weekdaysTimes[${mainIndex}].times[${childIndex}].end`}
              size={{ base: 'sm', md: 'md' }}
            />
          </Box>
          <Button
            bgColor="transparent"
            _hover={{ backgroundColor: 'transparent' }}
            size="sm"
          >
            <Icon as={IoTrashOutline} />
          </Button>
        </Flex>
      ) : (
        <Flex>
          <Text>Indisponível</Text>
        </Flex>
      )}
    </Flex>
  )
}
