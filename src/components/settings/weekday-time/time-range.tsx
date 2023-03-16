import { FormikTimeInput } from '@/components/custom/formik/formik-time-input'
import { TimeRangeProps } from '@/types/settings/weekday-time'
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import { IoTrashOutline } from 'react-icons/io5'

export const TimeRangeComponent = ({
  values,
  times,
  mainIndex,
  childIndex,
  lastIndex,
  weekdayName,
  setFieldValue,
  setFieldTouched,
}: TimeRangeProps) => {
  return (
    <Flex
      justifyContent="start"
      alignItems={['center', 'start']}
      w="full"
      pb={4}
    >
      {values.weekdays.includes(weekdayName) && times.length > 0 ? (
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
            onClick={() => {
              times.splice(childIndex, 1)
              setFieldValue(`weekdaysTimes[${mainIndex}].times`, times)
            }}
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
