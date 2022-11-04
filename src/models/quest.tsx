import utils from "../js/utils";
import IGuid from "./IGuid";
import { QuestReward } from "./QuestReward";
import { QuestStep } from "./QuestStep";

export enum QuestType {
	Defeat = "defeat",
	Protect = "protect",
	Bounty = "bounty",
	Other = "other",
}
export interface IQuest extends IGuid {
	title: string;
	lastModified: number;
	description: string;
	questType: QuestType;
	isMainStoryQuest: boolean;
	steps: QuestStep[];
	rewards: QuestReward[];

	toString(): string;

	getStepsCountText(): string;
	getRewardsCountText(): string;
	getLastModifiedDateString(): string;
}

export class Quest implements IQuest {
	title: string;
	guid: string;
	slug: string;
	lastModified: number;
	description: string;
	questType: QuestType;
	isMainStoryQuest: boolean;
	steps: QuestStep[];
	rewards: QuestReward[];

	constructor(opts) {
		Object.assign(this, opts);
	}

	/******* METHODS *******/
	public toString(): string {
		return `${this.title} (${this.slug})`;
	}

	public getStepsCountText(): string {
		return "StepsCount";
		return utils.pluralize(this.steps, "Step", "Steps");
	}

	public getRewardsCountText(): string {
		return utils.pluralize(this.rewards, "Reward", "Rewards");
	}

	public generateGuid(): void {
		this.guid = crypto.randomUUID();
	}

	public saveModifiedData(): void {
		this.lastModified = Date.now();
	}

	public getLastModifiedDateString(): string {
		return Quest.getLastModifiedDateString(this);
	}

	public static getLastModifiedDateString(quest: IQuest): string {
		return utils.numberToModifiedDateString(quest.lastModified);
	}

	public static sortByModifiedDate(quests: IQuest[]): IQuest[] {
		return quests.sort((a, b) =>
			a.lastModified < b.lastModified
				? -1
				: a.lastModified > b.lastModified
				? 1
				: 0
		);
	}
}
