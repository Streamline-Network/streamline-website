import Login from "../components/login/login";
import admin from "./admin.module.scss";

export default function Admin() {
	return (
		<>
			<h1 className={admin.title}>Admin log-in</h1>
			<Login />
		</>
	);
}
