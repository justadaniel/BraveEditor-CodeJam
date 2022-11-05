import React from "react";
import { Page, Navbar, Block } from "framework7-react";

const QuestDetailsEmpty = (props) => {
	const PAGE_TITLE: string = "Details";
	// const { f7route, f7router } = props;
	console.log(props);

	return (
		<Page>
			<Navbar title={PAGE_TITLE} />
			<Block strong inset className="centered empty-list-text">
				<p>Choose a Quest</p>
			</Block>
		</Page>
	);
};

export default QuestDetailsEmpty;
