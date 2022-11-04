export default interface IGuid {
	guid: string;
	slug: string;

	generateGuid(): void;
}
