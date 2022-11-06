import { PageConfig } from "next";

import stats from "./stats.module.scss";

export default function Stats({ }: StatsProps) {
	return (
		<div>
			<iframe className={stats.mapFrame} src={process.env.STATS_URL} />
		</div>
	);
}

interface StatsProps { }

export const config: PageConfig = {
	unstable_runtimeJS: false,
};
