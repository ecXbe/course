import type { ITheme } from "@/assets/ts/models/theme"

export interface IThemeService {
  getThemes(): Promise<readonly ITheme[]>
  getCurrentTheme(): Promise<ITheme>
  setCurrentTheme(id: string): Promise<void>
  saveTheme(theme: ITheme): Promise<void>
}
