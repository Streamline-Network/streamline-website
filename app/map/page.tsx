import { PageConfig } from "next";
import map from "./map.module.scss";
export default async function Map() {
	const url = process.env.MAP_URL || "";
	// const url = "https://example.com";

	await fetch(url);

	return (
		<>
			<iframe className={map.mapFrame} src={url} />
		</>
	);
}

export const config: PageConfig = {
	unstable_runtimeJS: false,
};
