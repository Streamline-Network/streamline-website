import classnames from "classnames";
import Link from "next/link";

import dozoe from "./axolotl-pfp.png";
import Discord, { DiscordProps } from "./discord/discord";

export default function Join({ }: JoinProps) {

	const blocks: Block[] = [
		{
			title: "Join the Discord",
			color: "purple",
			paragraphs: [
				<>Join the Discord if you haven&apos;t already. Having a Discord account is required to join, if you do not have one, you can make one for free on <Link style={{ color: "white", textDecoration: "underline" }} target="_blank" href="https://www.discord.com">Discord&apos;s website</Link>.</>,
				<>Once you have joined the Discord go to the <Link style={{ color: "white", textDecoration: "underline" }} target="_blank" href="https://discord.gg/EAe4S6HdVC">#applications-and-info</Link> channel.</>,
				<><Link className="button large-button" target="_blank" href="https://discord.gg/EAe4S6HdVC">Join the Discord</Link></>,
			],
		},
		{
			title: "Fill out the application",
			color: "green",
			paragraphs: [
				<>The questions aren&apos;t that difficult but try to be as detailed as possible. We have an acceptance rate of about 70% so good luck! The questions are here to make sure that everyone who joins Streamline will follow the rules and contribute to the server.</>,
				<><Link className="button large-button" target="_blank" href="https://dyno.gg/form/8ac19b49">Fill out the form</Link></>,
			],
		},
		{
			title: "That's it!",
			color: "blue",
			paragraphs: [
				<>The form has been submitted. Next a staff member will review your application. The wait is usually no more than 24 hours. If you have any questions please ask our staff or you can DM me directly.</>,
				<>Here&apos;s a video explanation in case you get lost:</>,
				<><Link className="button large-button hide-desktop" target="_blank" href="https://www.youtube.com/watch?v=3">Tutorial Video</Link></>,
				<><iframe className="video show-desktop" src="https://www.youtube.com/embed/dQw4w9WgXdcQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></>,
			],
		}
	];

	const mores: More[] = [
		{
			color: "green",
			title: "Was I accepted?",
			description: "The way that you know if your application has been accepted is you will receive a message that says you have been whitelisted in the #general channel. If you have been denied, you will get a private DM from a staff member saying that your application has not been accepted. However, you are more than welcome to redo your application.",
			caption: "Denied message:",
			discord: {
				channel: "@Dozoe",
				messages: [
					{
						at: "Today at 9:00",
						from: {
							username: "Dozoe",
							profilePicture: dozoe,
						},
						mentioned: false,
						message: <p>Unfortunately, your application for Streamline SMP got denied. You can still stay on the Discord server and follow content through various channels if you wish to do so.</p>,
					}
				],
			},
		},
		{
			color: "red",
			title: "After getting accepted",
			description: "Ok so you waited for your application to be reviewed and you were accepted, congrats by the way! But now what? When you get accepted you will receive the “Streamliners role on Discord, this gives you permission to talk in channels that only fellow “Streamliners will have access to. You will also be whitelisted into the Minecraft Server within about 10 minutes of being accepted. Once you have access to the server and these channels you can now officially say you are a Streamliner! Now go be free, build something cool, and have fun!",
			caption: "Accepted message:",
			discord: {
				channel: "#general",
				messages: [
					{
						at: "Today at 9:00",
						from: {
							username: "Dozoe",
							profilePicture: dozoe,
						},
						mentioned: true,
						message: <>
							<p className="disc-highlight">@Hex32</p>
							<p>
								Welcome to the server! You are now accepted and have
								been whitelisted! Also, make sure to set your
								notification preferences in
							</p>
							<p className="disc-highlight">#roles</p>
							<p>!</p>
						</>,
					}
				],
			},
		},
	];

	return (<>
		<h1 className="main-header green">How To Join</h1>
		<article className="grid">
			{
				blocks.map(({ title, color, paragraphs }, index) => (
					<div className="block" key={index}>
						<div className={classnames("block", "num", color)}>
							<h2>{title}</h2>
						</div>
						{
							paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)
						}
					</div>
				))
			}
			<iframe className="show-desktop discord-embed" src="https://discord.com/widget?id=775831180086870096&theme=dark" width="350" height="600" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
		</article>
		<h2 className="sub-header">More</h2>
		<article className="grid lower-grid">
			<div>
				{
					mores.map(({ color, title, description, caption, discord }, index) => (
						<div className="block more-block" key={index}>
							<div className={classnames("block", "num", color)}>
								<h2>{title}</h2>
							</div>
							<p>{description}</p>
							<div className="disc-example">
								<p>{caption}</p>
								<Discord {...discord} />
							</div>
						</div>
					))
				}
			</div>
		</article>

	</>);
}

interface JoinProps { }

interface Block {
	title: string;
	color: string;
	paragraphs: React.ReactNode[];
}

interface More {
	color: string;
	title: string;
	description: string;
	caption: string;
	discord: DiscordProps;
}
