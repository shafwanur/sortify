import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// --- Assuming these are the correct paths to your UI components ---
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ArtistPage() {
    const location = useLocation();
    // Provide default state to prevent crashes if state is not passed via router
    const { img, artistName, spotifyUri, followerCount } = location.state || {
        img: 'https://placehold.co/600x400/1e293b/ffffff?text=Artist+Image',
        artistName: 'Unknown Artist',
        spotifyUri: '',
        followerCount: '0'
    };

    const [position, setPosition] = useState("global-sort");
    const [messages, setMessages] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);

    const tooltip = {
        "all-of":
            "Just shoves every song from the artist into a playlist in the order of release date.",
        "album-sort":
            "Sorts songs within each album by popularity (most to least)",
        "global-sort":
            "Sort all songs from an artist by popularity (most to least)",
    };
    
    // // Mimic API data for initial view, formatted to match the rendering logic
    // useEffect(() => {
    //     const initialMessages = [
    //         { data: "The intricate tapestry of the cosmos reveals itself not only in the grand, sweeping gestures of galaxies colliding but also in the subtle, quantum dance of particles in the void." },
    //         { data: "Navigating the complex labyrinth of human emotions requires a delicate balance of empathy, self-awareness, and the quiet courage to be vulnerable in a world that often encourages stoicism." },
    //         { data: "Technological advancement, while offering unprecedented solutions to age-old problems, simultaneously presents new ethical dilemmas that society must carefully consider for a sustainable future." },
    //     ];
    //     // Only set initial messages if no streaming has occurred
    //     if (messages.length === 0) {
    //         setMessages(initialMessages);
    //     }
    // }, []);


    async function handleClick() {
        console.log(`position: ${position}`);

        const jwt_token = localStorage.getItem("jwt_token");
        
        // This should be replaced by your actual environment variable handling
        const VITE_BACKEND_API_ENDPOINT = import.meta.env.VITE_BACKEND_API_ENDPOINT || "http://localhost:8000";

        const validate_response = await axios({
            method: "get",
            url: `${VITE_BACKEND_API_ENDPOINT}/auth/validate`,
            headers: {
                Authorization: `Bearer ${jwt_token}`,
            },
        });

        const spotify_user_id = validate_response.data.spotify_user_id;
        const access_token_response = await axios.post(
            `${VITE_BACKEND_API_ENDPOINT}/spotify/token/access`,
            {
                spotify_user_id: spotify_user_id,
                refresh_token: validate_response.data.refresh_token,
            },
        );

        const access_token = access_token_response.data.access_token;
        console.log(spotifyUri.split(":").pop());

        const payload = {
            artist_name: artistName,
            artist_id: spotifyUri.split(":").pop(),
            arg: position,
            spotify_user_id: spotify_user_id,
        };

        if (isStreaming) return;

        setMessages([]);
        setIsStreaming(true);

        console.log(JSON.stringify(payload));

        try {
            const response = await fetch(`${VITE_BACKEND_API_ENDPOINT}/api/sort`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": access_token,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok || !response.body) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value);

                while (buffer.includes("\n")) {
                    const newlineIndex = buffer.indexOf("\n");
                    const line = buffer.substring(0, newlineIndex);
                    buffer = buffer.substring(newlineIndex + 1);

                    if (line) {
                        const parsedData = JSON.parse(line);
                        setMessages((prev) => [...prev, parsedData]);
                    }
                }
            }
        } catch (error) {
            console.error("Stream failed:", error);
            setMessages([{ data: `An error occurred: ${error.message}` }]);
        } finally {
            setIsStreaming(false);
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-4xl space-y-6">
                {/* Card 1: Sorting Guide */}
                <Card>
                    <CardHeader>
                        <CardTitle>Available Sorting Options</CardTitle>
                        <CardDescription>
                            Choose how you want to organize the artist's tracks.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <dl className="space-y-4">
                            {Object.entries(tooltip).map(([key, description]) => (
                                <div key={key} className="relative pl-9">
                                    <dt className="inline font-semibold text-foreground">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-0 top-0.5 h-5 w-5 text-primary">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                        <span className="capitalize">{key.replace('-', ' ')}</span>
                                    </dt>
                                    <dd className="inline text-muted-foreground">
                                        {' — '}
                                        {description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </CardContent>
                </Card>

                {/* Card 2: Artist Info and Actions */}
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>{artistName}</CardTitle>
                        <CardDescription>Monthly Listeners: {followerCount}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <img src={img} className="h-full rounded-md mx-auto" alt={`Album art for ${artistName}`} />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between capitalize">
                                    {position.replace('-', ' ')}
                                    <svg xmlns="http://www.w.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4 shrink-0 opacity-50"><path d="m6 9 6 6 6-6"></path></svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                                <DropdownMenuLabel>Select Sort Type:</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuRadioGroup
                                    value={position}
                                    onValueChange={setPosition}
                                >
                                    <DropdownMenuRadioItem value="all-of">
                                        All Of
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="album-sort">
                                        Album Sort
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="global-sort">
                                        Global Sort
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleClick} disabled={isStreaming}>
                            {isStreaming ? "Sorting..." : "Sort Tracks"}
                        </Button>
                    </CardFooter>
                </Card>

                {/* Card 3: Messages */}
                {messages.length > 0 && (
                    <Card className="w-full">
                        <CardHeader>
                           <CardTitle className="text-xl">Console</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="divide-y divide-border">
                                {messages.map((msg, index) => (
                                    <li key={index} className="py-3">
                                        <p className="text-sm text-muted-foreground">{msg.data}</p>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

