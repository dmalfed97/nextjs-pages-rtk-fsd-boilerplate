import { jsonProperty, Serializable } from 'ts-serializable'

export class UpdateCurrentUserDto extends Serializable {
  @jsonProperty(String, null) firstName?: string | null = undefined
  @jsonProperty(String, null) lastName?: string | null = undefined
  @jsonProperty(String, null) userName?: string | null = undefined
  @jsonProperty(Number, null) experience?: number | null = undefined
  @jsonProperty(String, null) description?: string | null = undefined
  @jsonProperty(String, null) location?: string | null = undefined
  @jsonProperty(Number, null) latitude?: number | null = undefined
  @jsonProperty(Number, null) longitude?: number | null = undefined
}
