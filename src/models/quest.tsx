import utils from "../js/utils";

export class Quest {
	guid: string;
	title: string;
	slug: string;
	lastModified: number;
	description: string;
	questType: QuestType;
	isMainStoryQuest: boolean;
	steps: QuestStep[];
	rewards: QuestReward[];

	constructor(opts) {
		Object.assign(this, { c: [] }, opts);
	}

	/******* METHODS *******/
	public toString(): string {
		return `${this.title} (${this.slug})`;
	}

	public getStepsCountText(): string {
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
		if (this.lastModified == undefined) return "Not Modified";
		return `Last Modified ${new Date(this.lastModified).toLocaleString(
			"en-US",
			{
				dateStyle: "medium",
				timeStyle: "short",
			}
		)}`;
	}

	public static sortByModifiedDate(quests: Quest[]): Quest[] {
		return quests.sort((a, b) =>
			a.lastModified < b.lastModified
				? -1
				: a.lastModified > b.lastModified
				? 1
				: 0
		);
	}
}

export class QuestStep {
	guid: string;
	slug: string;
	title: string;
	summary: string;
	questStepType: QuestStepType;
	associatedItemNameTag: string;
	stepIndex: number = -1;

	/******* METHODS *******/
	constructor(opts) {
		Object.assign(this, { c: [] }, opts);
	}

	public toString(): string {
		return this.guid;
	}

	public generateGuid(): void {
		this.guid = crypto.randomUUID();
	}

	public getSummaryText() {
		if (this.summary != undefined && this.summary != "")
			return this.summary;
		else return "(No summary provided)";
	}

	public getAssociatedTagText() {
		if (
			this.associatedItemNameTag != undefined &&
			this.associatedItemNameTag != ""
		)
			return `TagName = "${this.associatedItemNameTag}"`;
	}
}

export class QuestReward {
	title: string;
	guid: string;
	slug: string;
	summary: string;
	rewardType: RewardType;
	stepIndex: number = -1;

	inventoryItemGuid: string;

	/******* METHODS *******/
	constructor(opts) {
		Object.assign(this, { c: [] }, opts);
	}

	public toString(): string {
		return this.title;
	}

	public get isXP(): boolean {
		return this.rewardType == RewardType.XP;
	}

	public get isCurrency(): boolean {
		return this.rewardType == RewardType.Currency;
	}

	public get isInventoryItem(): boolean {
		return this.rewardType == RewardType.InventoryItem;
	}
}

export enum QuestType {
	Defeat = "defeat",
	Protect = "protect",
	Bounty = "bounty",
	Other = "other",
}

export enum QuestStepType {
	Retrieve = "retrieve",
	Talk = "talk",
	Defeat = "defeat",
	Protect = "protect",
	Bounty = "bounty",
	Other = "other",
}

export enum RewardType {
	XP = "xp",
	Currency = "currency",
	InventoryItem = "item",
}
