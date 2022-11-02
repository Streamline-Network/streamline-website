import classnames from "classnames";
import React from "react";

import block from "./block.module.scss";

export default function Block({ title, paragraphs, color }: BlockProps) {
	return (
		<div className={classnames("block column gridRowSpan2", color)}>
			<h2>{title}:</h2>
			{paragraphs.map((paragraph, i) => (
				<p key={i}>{paragraph}</p>
			))}
		</div>
	);
}

export interface BlockProps {
	title: string;
	paragraphs: React.ReactNode[];
	color: string;
}
