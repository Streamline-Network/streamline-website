import classnames from "classnames";

import questionn from "./question.module.scss";

export default function Question({ answer, color, question }: QuestionProps) {
	return (
		<details className={classnames(questionn.block, color)}>
			<summary>{question}</summary>
			<p>{answer}</p>
		</details>);
}

export interface QuestionProps {
	question: string;
	answer: React.ReactNode;
	color: string;
}
