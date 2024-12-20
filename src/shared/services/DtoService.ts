import type { Serializable } from 'ts-serializable'

export default class DtoService {
  static populate<T extends Serializable>(Model: new () => T, data: object) {
    return new Model().fromJSON(data)
  }
}
