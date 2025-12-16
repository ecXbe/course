export class HexColor {
  private readonly value: string

  constructor(value: string) {
    if (!/^#[0-9A-Fa-f]{6}$/.test(value)) {
      throw new Error(`Невалидный цвет HEX: ${value}`)
    }
    this.value = value
  }

  toString(): string {
    return this.value
  }
}

