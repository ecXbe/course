import type { ISkillService } from "./skill.service";
import type { ISkill } from "@/assets/ts/models/skill";

export class MockSkillService implements ISkillService {
  async getSkills(): Promise<readonly ISkill[]> {
    return [
      { id: 1, name: "Photoshop" },
      { id: 2, name: "HTML" },
      { id: 3, name: "Bootstrap 4.0" },
      { id: 4, name: "Illustrator" },
      { id: 5, name: "CSS" },
      { id: 6, name: "React JS" },
      { id: 7, name: "Figma" },
      { id: 8, name: "JavaScript" },
      { id: 9, name: "Python" }
    ];
  }
}