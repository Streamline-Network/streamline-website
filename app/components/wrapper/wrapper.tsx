"use client";

import { ReactNode } from "react";
import { Session } from "next-auth/core/types";
import { SessionProvider } from "next-auth/react";

export default function Wrapper({ children, session }: WrapperProps) {
	return <SessionProvider session={session}>{children}</SessionProvider>;
}

interface WrapperProps {
	children: ReactNode;
	session: Session;
}
