import type { TFunction } from 'next-i18next'

export class TimeHelper {
  /**
   * Generates an array of time values in 'hh:mm' format with the specified step in minutes.
   *
   * @param stepInMinutes - The step value in minutes. Must be greater than 0 and divide 60 without a remainder.
   * @param t - TFunction from i18next
   * @returns An array of time objects with 'label' and 'value' fields. For example: [{ label: '00:00', value: '00:00' }, ...]
   * @throws Throws an error if the time step is invalid.
   */
  static generateTimeArray(
    stepInMinutes: number,
    t: TFunction
  ): { label: string; value: string }[] {
    const times: { label: string; value: string }[] = []

    if (stepInMinutes <= 0 || stepInMinutes > 60 || 60 % stepInMinutes !== 0) {
      throw new Error(t('errors.invalidTimeInterval'))
    }

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += stepInMinutes) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        times.push({ label: time, value: time })
      }
    }

    return times
  }

  static getFormattedTimeString = (durationInMinutes: number | null | undefined, t: TFunction) => {
    if (!durationInMinutes) {
      return '-'
    }

    let minutes: number | null = null
    let hours: number | null = null

    if (durationInMinutes % 60 === 0) {
      hours = durationInMinutes / 60
    } else if (durationInMinutes < 60) {
      minutes = durationInMinutes
    } else {
      hours = Math.floor(durationInMinutes / 60)
      minutes = durationInMinutes % 60
    }

    return `${
      hours
        ? `${t('timeMeasurement.hour', {
            count: hours,
            ns: 'common',
            defaultValue: 'timeMeasurement.hour_one',
          })}`
        : ''
    } ${
      minutes
        ? `${t('timeMeasurement.minute', {
            count: minutes,
            ns: 'common',
            defaultValue: 'timeMeasurement.minute_one',
          })}`
        : ''
    }`.trim()
  }
}
