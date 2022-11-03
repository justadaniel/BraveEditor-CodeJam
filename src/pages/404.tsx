import React from "react";
import { Page, Navbar, Block } from "framework7-react";

const NotFoundPage = (props) => {
	const PAGE_TITLE: string = "Not Found";
	// const { f7route, f7router } = props;
	console.log(props);

	return (
		<Page>
			<Navbar title={PAGE_TITLE} backLink="Back" />
			<Block strong>
				<p>Sorry</p>
				<p>Requested content not found.</p>
			</Block>
		</Page>
	);
};

export default NotFoundPage;
