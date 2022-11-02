import classnames from "classnames";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import styles from "./contact.module.scss";
import discord from "./discord.svg";
import email from "./email.svg";

export default function Contact() {

	const blocks: Block[] = [
		{
			color: "green",
			top: "Want a fast response? Start a support ticket and one of our staff will contact you within minutes.",
			img: {
				src: discord,
				alt: "Discord logo",
			},
			label: "We are happy to help!",
			button: {
				href: "https://discord.com/channels/775831180086870096/981954520470921246",
				text: "Support Ticket",
			},
			bottom: "Average response: less than 7 hours",
		},
		{
			color: "blue",
			top: "Got something more important or business related? Send us an email!",
			img: {
				src: email,
				alt: "Email icon",
			},
			label: "We can't wait to hear from you!",
			button: {
				href: "/cdn-cgi/l/email-protection#88fbfdf8f8e7fafcc8fbfcfaede9e5e4e1e6edfbe5f8a6ebe7e5",
				text: "Email Us",
			},
			bottom: "Average response: less than 24 hours",
		},
	];

	return (
		<>
			<h1 className="main-header orange">Contact</h1>
			<article className={styles.grid}>
				<div className={styles.subHeader}>
					<h2>Have A Question?</h2>
					<p>Check out our Q&A! Still lost? Contact us anytime.</p>
				</div>
				<div className={styles.contentGrid}>
					{
						blocks.map(({ color, top, img: { src, alt }, label, button: { href, text }, bottom }, index) => (
							<div className={styles.block} key={index}>
								<h3>{top}</h3>
								<div className={classnames(styles.wrapperIconTxt, color)}>
									<Image src={src} alt={alt} width={145}/>
									<p className={styles.subText}>{label}</p>
								</div>
								<Link target="_blank" href={href} className="button">{text}</Link>
								<p className={styles.responseTime}>{bottom}</p>
							</div>
						))
					}
				</div>
			</article>
		</>
	);
}

interface ContactProps { }

interface Block {
	color: string;
	top: string;
	img: {
		src: StaticImageData;
		alt: string;
	},
	label: string;
	button: {
		href: string;
		text: string;
	},
	bottom: string;
}
