export class InventoryItem {
	guid: string;
	slug: string;
	title: string;
	description: string;

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
}

enum EInventoryItemType {
	Weapon = "weapon",
	Crafting = "buildingMaterial",
}
