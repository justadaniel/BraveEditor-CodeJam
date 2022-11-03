import React, { useState } from "react";
import utils from "../js/utils";
import { Icon } from "framework7-react";

class AppSection {
	title: string;
	slug: string;
	subtitle: string;
	icon: string;
	url: string;

	constructor(opts) {
		Object.assign(this, { c: [] }, opts);

		if (opts.title != undefined)
			this.slug = utils.sanitizeImportantString(opts.title);
	}

	public toString(): string {
		return `${this.title}`;
	}

	public RenderIcon(): any {
		let icon;
		if (this.icon != "" && this.icon != undefined) {
			icon = (
				<Icon
					slot="media"
					icon={this.icon}
					aurora={this.icon}
					ios={this.icon}
					md={this.icon}
				/>
			);
		}
		return icon;
	}
}

export default AppSection;
