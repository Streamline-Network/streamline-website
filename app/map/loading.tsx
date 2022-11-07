import map from "./map.module.scss";

export default function Loading() {
	return (
		<div className={map.loading}>
			<h1>Checking server status...</h1>
		</div>
	);
}
