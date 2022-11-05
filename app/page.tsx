import "/styles/style.scss";

import { PageConfig } from "next";

import Index from "./index";

export default async function Home({ }: HomeProps) {
	return <Index />;
}

interface HomeProps { }

export const config: PageConfig = {
	unstable_runtimeJS: false,
};
