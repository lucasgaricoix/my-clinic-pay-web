import { FormikCheckboxItem } from '@/components/custom/formik'
import { UserService } from '@/services/user/user.service'
import { RootState } from '@/store/store'
import { UserSession } from '@/types/auth/session'
import { UserPayload } from '@/types/user/user'
import { ScheduleSettings } from '@/types/settings/schedule'
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
import { useDispatch, useSelector } from 'react-redux'
import { weekdayTimesData } from './initial-value'
import { TimeRangeComponent } from './time-interval'
import { setUserSession } from '@/store/reducers/userSessionSlice'

const initialValues: ScheduleSettings = {
  weekdays: weekdaysShortNamesDefault,
  rules: weekdayTimesData,
}

const defaultValue = {
  from: undefined,
  to: undefined,
}

export const ScheduleSettingsComponent = () => {
  const [isLargerThanMd] = useMediaQuery(['(min-width: 48em)'])
  const userSession = useSelector((state: RootState) => state.userSession)
  const dispatch = useDispatch()

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

  function userAdapter(user: UserSession): UserPayload {
    const userPayload: UserPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      picture: user.picture,
      role: user.role,
      settings: user.settings,
      tenantId: user.tenantId,
    }
    return userPayload
  }

  async function handleSubmit(
    data: ScheduleSettings,
    action: FormikHelpers<ScheduleSettings>
  ) {
    data.rules
      .filter((value) => data.weekdays.includes(value.name))
      .forEach((value) => {
        if (!value.intervals.find((value) => value.from)) {
          action.setFieldError(
            `rules.${weekdayAdapter(value.name)}.from`,
            'Hora incorreta'
          )
        }
        if (!value.intervals.find((value) => value.to)) {
          action.setFieldError(
            `rules.${weekdayAdapter(value.name)}.to`,
            'Hora incorreta'
          )
        }
      })

      console.log('entrou')
      
      const user: UserSession = {
        ...userSession,
        settings: { schedule: { rules: data.rules } },
      }

      const response = await UserService.updateUser(userAdapter(user))

      console.log({response})

    // try {
    //   const user: UserSession = {
    //     ...userSession,
    //     settings: { schedule: { rules: data.rules } },
    //   }

    //   const response = await UserService.updateUser(userAdapter(user))
    //   if (response.status == 200) {
    //     const settings = response.data.settings
    //     const dispatchData = { ...userSession, settings }
    //     dispatch(setUserSession(dispatchData))
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }

  return (
    <Flex
      direction="column"
      borderWidth={{ base: 0, md: '1px' }}
      borderColor="gray.200"
      borderRadius="lg"
      px={{ base: 3, md: 6 }}
      pt={6}
    >
      <Text mb={6}>Configure seus horários de atendimento</Text>
      <Formik<ScheduleSettings>
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
              {values.rules.map((rule, mainIndex, arr) => {
                const lastIndex = mainIndex === arr.length - 1
                return (
                  <Stack
                    direction={['column', 'row']}
                    key={rule.name}
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
                            id={rule.name}
                            name="weekdays"
                            label={rule.label}
                          />
                        </Box>
                        {!isLargerThanMd && (
                          <Button
                            bgColor="transparent"
                            _hover={{ backgroundColor: 'transparent' }}
                            size="sm"
                            onClick={() =>
                              setFieldValue(`rules[${mainIndex}].intervals`, [
                                ...rule.intervals,
                                defaultValue,
                              ])
                            }
                          >
                            <Icon as={AddIcon} />
                          </Button>
                        )}
                      </Flex>
                      <Flex direction="column">
                        {rule.intervals.map((__, childIndex) => {
                          return (
                            <Flex direction="column" key={`time-${childIndex}`}>
                              <TimeRangeComponent
                                values={values}
                                intervals={rule.intervals}
                                mainIndex={mainIndex}
                                childIndex={childIndex}
                                lastIndex={lastIndex}
                                weekdayName={rule.name}
                                setFieldValue={setFieldValue}
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
                            setFieldValue(`rules[${mainIndex}].intervals`, [
                              ...rule.intervals,
                              defaultValue,
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
