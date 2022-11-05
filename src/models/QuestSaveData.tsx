import utils from "../js/utils";
import { IQuest } from "./Quest";

export interface IQuestSaveData {
	lastModified: number;
	quests: IQuest[];

	sortByModifiedDate();
}

export class QuestSaveData {
	lastModified: number;
	quests: IQuest[];

	constructor(opts) {
		Object.assign(this, opts);
	}

	sortByModifiedDate() {
		var quests = this.quests.sort((a: IQuest, b: IQuest) =>
			a.lastModified < b.lastModified
				? -1
				: a.lastModified > b.lastModified
				? 1
				: 0
		);
		this.quests = quests;
	}

	public getLastModifiedDateString(): string {
		return QuestSaveData.getLastModifiedDateString(this);
	}

	public static getLastModifiedDateString(
		questSaveData: IQuestSaveData
	): string {
		return utils.numberToModifiedDateString(questSaveData.lastModified);
	}

	public static sortByModifiedDate(questData: QuestSaveData): QuestSaveData {
		var workingData: QuestSaveData = questData;
		workingData.sortByModifiedDate();
		return workingData;
	}
}
