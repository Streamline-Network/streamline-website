import { PageConfig } from "next";
import map from "./map.module.scss";
export default async function Map({}: MapProps) {
	const url = process.env.MAP_URL || "";

	try {
		await fetch(url);
	} catch (error) {
		throw new Error("error");
	}

	return <iframe className={map.mapFrame} src={url} />;
}

interface MapProps {}

export const config: PageConfig = {
	unstable_runtimeJS: false,
};
