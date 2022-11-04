import IGuid from "./IGuid";

export enum QuestStepType {
	Retrieve = "retrieve",
	Talk = "talk",
	Defeat = "defeat",
	Protect = "protect",
	Bounty = "bounty",
	Other = "other",
}

export interface IQuestStep extends IGuid {
	title: string;
	summary: string;
	questStepType: QuestStepType;
	associatedItemNameTag: string;
	stepIndex: number;

	toString(): string;
	getSummaryText(): string;
	getAssociatedTagText(): string;
}

export class QuestStep implements IQuestStep {
	guid: string;
	slug: string;
	title: string;
	summary: string;
	questStepType: QuestStepType;
	associatedItemNameTag: string;
	stepIndex: number = -1;

	/******* METHODS *******/
	constructor(opts) {
		Object.assign(this, opts);
	}

	public toString(): string {
		return this.guid;
	}

	public generateGuid(): void {
		this.guid = crypto.randomUUID();
	}

	public getSummaryText(): string {
		return QuestStep.getSummaryText(this);
	}

	public static getSummaryText(step: IQuestStep): string {
		if (step.summary != undefined && step.summary != "")
			return step.summary;
		else return "(No summary provided)";
	}

	public getAssociatedTagText(): string {
		return QuestStep.getAssociatedTagText(this);
	}

	public static getAssociatedTagText(step: IQuestStep): string {
		if (
			step.associatedItemNameTag != undefined &&
			step.associatedItemNameTag != ""
		)
			return `TagName = "${step.associatedItemNameTag}"`;
		else return "";
	}
}
