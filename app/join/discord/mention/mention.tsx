import mention from "./mention.module.scss";

export default function Mention({ text }: MentionProps) {
	return <span className={mention.discHighlight}>{text}</span>
}

interface MentionProps {
	text: string;
}
