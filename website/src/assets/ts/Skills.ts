import type { ISkillService } from "@/assets/ts/services/skill.service";
import { MockSkillService } from "./services/mock-skill.service";
import $ from "jquery";

const skillService: ISkillService = new MockSkillService()
export async function renderSkills(container: JQuery<HTMLElement>) {
  let skills = await skillService.getSkills();

  skills.map(skill => {
    $(container).append($("<li>", {text: skill.name}));
  });
}