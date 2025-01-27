import { jsonProperty, Serializable } from 'ts-serializable'

export class RestorePasswordRequestDto extends Serializable {
  @jsonProperty(String, null) email: string | null = null
}
