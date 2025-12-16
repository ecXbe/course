export interface ITheme {
  readonly id: string
  readonly name: string
  readonly variables: Readonly<Record<string, string>>
}
