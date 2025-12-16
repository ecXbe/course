import type { IThemeService } from "./theme.service"
import type { ITheme } from "@/assets/ts/models/theme"
import { HexColor } from "../models/hex-color"

const STORAGE_KEY = "themes"
const CURRENT_KEY = "current-theme"

export class LocalThemeService implements IThemeService {

  async getThemes(): Promise<readonly ITheme[]> {
    let saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : this.defaultThemes()
  }

  async getCurrentTheme(): Promise<ITheme> {
    let themes = await this.getThemes()
    let currentId = localStorage.getItem(CURRENT_KEY)
    return themes.find(t => t.id === currentId) ?? themes[0]
  }

  async setCurrentTheme(id: string): Promise<void> {
    localStorage.setItem(CURRENT_KEY, id)
  }

  async saveTheme(theme: ITheme): Promise<void> {
    let themes = await this.getThemes()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...themes, theme]))
  }

  private defaultThemes(): ITheme[] {
    return [
      {
        id: "light",
        name: "Light",
        variables: {
          "--bl-color": new HexColor("#FFFFFF").toString(),
          "--gr-color": new HexColor("#b9b9b9").toString(),
          "--wh-color": new HexColor("#020202").toString(),
        },
      },
      {
        id: "dark",
        name: "Dark",
        variables: {
          "--bl-color": new HexColor("#020202").toString(),
          "--gr-color": new HexColor("#252525").toString(),
          "--wh-color": new HexColor("#FFFFFF").toString(),
        },
      },
    ]
  }
}

