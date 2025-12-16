import { LocalThemeService } from "./services/local-theme.service"
import { applyTheme } from "./ui/theme-switcher"
import { HexColor } from "./models/hex-color"
import $ from "jquery"

const themeService = new LocalThemeService()

export async function initThemes() {
  let $select = $("<select>", { id: "theme-select" });

  let themes = await themeService.getThemes()
  let current = await themeService.getCurrentTheme()

  applyTheme(current)

  themes.forEach(theme => {
    $("<option>", {
      value: theme.id,
      text: theme.name,
      selected: theme.id === current.id
    }).appendTo($select)
  })

  $select.on("change", async function () {
    let id = String($(this).val())

    await themeService.setCurrentTheme(id)

    let theme = (await themeService.getThemes())
      .find(t => t.id === id)

    if (theme) {
      applyTheme(theme)
    }
  })
  $(".theme_manager").prepend($select)

  $(".add_theme").on("click", async function() {
    let name = $("#theme-name").val()?.toString();
    let fc = $("#theme_first-color").val() as string;
    let dfc = $("#theme_dark-first-color").val() as string;
    let sc = $("#theme_second-color").val() as string;

    if (!name) return alert("Введите название темы");

    let newTheme = {
        id: crypto.randomUUID(),
        name: name,
        variables: {
            "--bl-color": new HexColor(fc).toString(),
            "--gr-color": new HexColor(dfc).toString(),
            "--wh-color": new HexColor(sc).toString(),
        }
    }

    await themeService.saveTheme(newTheme);
    await themeService.setCurrentTheme(newTheme.id);
    applyTheme(newTheme);

    $select.append($("<option>", { value: newTheme.id, text: newTheme.name, selected: true }))
  });
}

