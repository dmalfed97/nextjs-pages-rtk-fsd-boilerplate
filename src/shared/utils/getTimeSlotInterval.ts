/**
 * Function to calculate timeslot interval
 * @param startTime - HH:mm slot start time
 * @param duration - duration in minutes.
 * @returns [startTime HH:mm, endTime HH:mm]
 */
export const getTimeSlotInterval = (startTime: string, duration: number): [string, string] => {
  const timeParts = startTime.split(':')
  const startH = Number(timeParts[0])
  const startM = Number(timeParts[1])

  const totalStartMinutes = startH * 60 + startM
  const totalEndMinutes = totalStartMinutes + duration

  const endH = Math.trunc(totalEndMinutes / 60) % 24
  const endM = totalEndMinutes % 60

  const formattedStart = `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}`
  const formattedEnd = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`

  return [formattedStart, formattedEnd]
}
