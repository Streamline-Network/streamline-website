import classnames from "classnames";
import React from "react";

import block from "./block.module.scss";

export default function Block({ title, paragraphs, color, classes = [] }: BlockProps) {
	return (
		<section className={classnames(block.block, color, ...classes)}>
			<h2>{title}:</h2>
			{paragraphs.map((paragraph, i) => (
				<p key={i}>{paragraph}</p>
			))}
		</section>
	);
}

export interface BlockProps {
	title: string;
	paragraphs: React.ReactNode[];
	color: string;
	classes?: string[];
}
