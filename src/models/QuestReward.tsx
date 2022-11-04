import IGuid from "./IGuid";

export interface IQuestReward extends IGuid {
	title: string;
	summary: string;
	rewardType: RewardType;
	stepIndex: number;
	quantity: number;
	inventoryItemGuid: string;

	toString(): string;

	get isXP(): boolean;
	get isCurrency(): boolean;
	get isInventoryItem(): boolean;
}

export class QuestReward implements IQuestReward {
	guid: string;
	slug: string;
	title: string;
	rewardType: RewardType;
	summary: string;
	stepIndex: number = -1;
	quantity: number = 1;
	inventoryItemGuid: string;

	/******* METHODS *******/
	constructor(opts) {
		Object.assign(this, opts);
	}

	public toString(): string {
		return this.title;
	}

	public generateGuid(): void {
		this.guid = crypto.randomUUID();
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

export enum RewardType {
	XP = "xp",
	Currency = "currency",
	InventoryItem = "item",
}
