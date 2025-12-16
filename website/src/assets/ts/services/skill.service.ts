import type { ISkill } from "@/assets/ts/models/skill";

export interface ISkillService {
  getSkills(): Promise<readonly ISkill[]>
}
