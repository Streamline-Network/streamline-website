"use client";

import { ReactNode } from "react";
import { Session } from "next-auth/core/types";
import { SessionProvider } from "next-auth/react";

export default function Wrapper({ children, session }: WrapperProps) {
	return (
		<div className="wrapper">
			<SessionProvider session={session}>{children}</SessionProvider>
		</div>
	);
}

interface WrapperProps {
	children: ReactNode;
	session: Session;
}
