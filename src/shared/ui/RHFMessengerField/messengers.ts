import TelegramIcon from '~public/icons/telegram.svg'
import ViberIcon from '~public/icons/viber.svg'
import WhatsappIcon from '~public/icons/whatsapp.svg'

import { MessengerEnum } from '../../types/messenger'

export type MessengersListItem = {
  key: string
  value: MessengerEnum
  inputMask: string
  image: string
}

export const messengersList: MessengersListItem[] = [
  {
    key: 'Telegram',
    value: MessengerEnum.TELEGRAM,
    inputMask: '@',
    image: TelegramIcon,
  },
  {
    key: 'Whatsapp',
    value: MessengerEnum.WHATSAPP,
    inputMask: 'https://wa.me/',
    image: WhatsappIcon,
  },
  {
    key: 'Viber',
    value: MessengerEnum.VIBER,
    inputMask: 'viber://chat?number=',
    image: ViberIcon,
  },
]
