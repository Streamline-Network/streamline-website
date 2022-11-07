import { PageConfig } from "next";
import map from "./map.module.scss";

export default async function Map() {
	const url = process.env.MAP_URL || "";
	// const url = "https://example.com";

	try {
		await fetch(url).then((res) => {
			console.log(res);
		});
	} catch (error) {
		console.log(error);
	}

	return (
		<>
			<iframe className={map.mapFrame} src={url} />
		</>
	);
}

export const config: PageConfig = {
	unstable_runtimeJS: false,
};
