import type { ITheme } from "@/assets/ts/models/theme"

export function applyTheme(theme: ITheme) {
  let root = document.documentElement

  Object.entries(theme.variables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}