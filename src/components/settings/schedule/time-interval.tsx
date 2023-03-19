import { FormikTimeInput } from '@/components/custom/formik/formik-time-input'
import { TimeRangeProps } from '@/types/settings/schedule'
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react'
import { IoTrashOutline } from 'react-icons/io5'

const defaultValue = [
  {
    from: undefined,
    to: undefined,
  },
]

export const TimeRangeComponent = ({
  values,
  intervals: times,
  mainIndex,
  childIndex,
  lastIndex,
  weekdayName,
  setFieldValue,
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
              name={`rules[${mainIndex}].intervals[${childIndex}].from`}
              size={{ base: 'sm', md: 'md' }}
            />
          </Box>
          {'-'}
          <Box ml={{ base: 1, md: 4 }}>
            <FormikTimeInput
              id={mainIndex.toString()}
              name={`rules[${mainIndex}].intervals[${childIndex}].to`}
              size={{ base: 'sm', md: 'md' }}
            />
          </Box>
          <Button
            bgColor="transparent"
            _hover={{ backgroundColor: 'transparent' }}
            size="sm"
            onClick={() => {
              const timeLeft = times.splice(childIndex, 1)
              if (timeLeft.length === 0) {
                setFieldValue(`rules[${mainIndex}].intervals`, defaultValue)
              }
              setFieldValue(`rules[${mainIndex}].intervals`, times)
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
