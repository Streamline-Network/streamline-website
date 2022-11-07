"use client";

export default function Error({}: ErrorProps) {
	return (
		<div>
			<h1>Server is either down, or had an unexpected error.</h1>
		</div>
	);
}

interface ErrorProps {}
