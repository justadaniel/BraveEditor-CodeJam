import IGuid from "./IGuid";

export class InventoryItem {
	guid: string;
	slug: string;
	title: string;
	description: string;

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
}

enum EInventoryItemType {
	Weapon = "weapon",
	Crafting = "buildingMaterial",
}

export interface IInventoryItem extends IGuid {
	title: string;
	description: string;
}
