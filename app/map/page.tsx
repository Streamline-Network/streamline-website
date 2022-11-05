import map from "./map.module.scss";

export default function Map({ }: MapProps) {
	return (<>
		<iframe className={map.mapFrame} src="https://142.44.255.252:8024/server/Streamline SMP" />
	</>);
}

interface MapProps {
}
