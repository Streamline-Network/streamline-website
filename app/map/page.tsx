import { PageConfig } from "next";

import map from "./map.module.scss";

export default function Map({ }: MapProps) {
	return (
		<div>
			<iframe className={map.mapFrame} src={process.env.MAP_URL} />
		</div>
	);
}

interface MapProps {
}

export const config: PageConfig = {
	unstable_runtimeJS: false,
};
