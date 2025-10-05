import axios from "axios";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

import { LoginForm } from "@/components/login-form";

import blob from "@/assets/blob.jpg";
import spotify from "@/assets/spotify-icon-black.svg";
import { useEffect } from "react";

export default function LoginPage() {
	const VITE_BACKEND_API_ENDPOINT = import.meta.env.VITE_BACKEND_API_ENDPOINT;

	useEffect(() => {
		const response = axios({
			method: "get",
			url: `${VITE_BACKEND_API_ENDPOINT}/api/startup`,
		});

		console.log(response);
		console.log("Page loaded!");
	}, []);

	function handleClick() {
		console.log("clicked");
		window.location.href = `${VITE_BACKEND_API_ENDPOINT}/auth/login`;
	}

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="flex w-full max-w-xs flex-col gap-6">
						<div className="flex flex-col items-center gap-2 text-center">
							<h1 className="text-2xl font-bold">Welcome!</h1>
						</div>

						<Button variant="outline" className="w-full" onClick={handleClick}>
							<img src={spotify} className="size-7" />
							Login with Spotify
						</Button>

						<div className="text-center text-sm">
							Don't have an account?{" "}
							<a
								href="https://www.spotify.com/signup"
								className="underline underline-offset-4"
							>
								Sign up!
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="relative hidden lg:block">
				<img
					src={blob}
					alt="Image"
					className="max-h-screen mb-0 object-bottom dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
