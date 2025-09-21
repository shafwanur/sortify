import axios from "axios"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLocation } from "react-router-dom";
import { useState } from "react"

export default function CardDemo() {
  const location = useLocation();
  const {img, artistName, spotifyUri, followerCount} = location.state || {};

  const [position, setPosition] = React.useState("all-of")
  const [messages, setMessages] = useState<any[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  async function handleClick() {
    console.log(position);

    const VITE_BACKEND_API_ENDPOINT = import.meta.env.VITE_BACKEND_API_ENDPOINT;
    const jwt_token = localStorage.getItem("jwt_token");
    
    const validate_response = await axios({
      method: 'get',
      url: `${VITE_BACKEND_API_ENDPOINT}/auth/validate`,
      headers: {
        "Authorization": `Bearer ${jwt_token}`
      }
    });
    
    const spotify_user_id = validate_response.data.spotify_user_id;
    const access_token_response = await axios.post(`${VITE_BACKEND_API_ENDPOINT}/spotify/token/access`, {
      spotify_user_id: spotify_user_id,
      refresh_token: validate_response.data.refresh_token
    })
  
    const access_token = access_token_response.data.access_token;
    
    // console.log(access_token);
    console.log(spotifyUri.split(":").pop()!);

    interface SortRequest {
      artist_name: string;
      artist_id: string;
      arg: string;
      spotify_user_id: string;
    }


    const payload: SortRequest = {
      artist_name: artistName,
      artist_id: spotifyUri.split(":").pop()!,
      arg: position,
      spotify_user_id: spotify_user_id,
    };


    // updated code from here
    

    if (isStreaming) return;

    setMessages([]);
    setIsStreaming(true);

    console.log(JSON.stringify(payload));
    
    try {
      const response = await fetch(`${VITE_BACKEND_API_ENDPOINT}/api/sort`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "access-token": access_token, // raw header key
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok || !response.body) {
        throw new Error(`Request failed: ${response.status}`);
      }

      // 1. Get the stream reader and text decoder
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      // 2. Loop to read chunks from the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Add the new chunk to our buffer
        buffer += decoder.decode(value);

        // 3. Process complete lines (ending in '\n') from the buffer
        while (buffer.includes('\n')) {
          const newlineIndex = buffer.indexOf('\n');
          const line = buffer.substring(0, newlineIndex); // Get the message
          buffer = buffer.substring(newlineIndex + 1);    // Remove it from buffer

          if (line) { // Ensure the line is not empty
            const parsedData = JSON.parse(line);
            setMessages((prev) => [...prev, parsedData]);
          }
        }
      }
    } catch (error) {
      console.error("Stream failed:", error);
    } finally {
      setIsStreaming(false);
    }
    // TODO: create backend endpoint to actually call this. 
  }

  return ( 
    <div className="flex justify-center">
      <Card className="w-full max-w-sm mt-5">
        <img src={img} className="w-full pl-4 pr-4"/>
        <CardHeader>
          <CardTitle>{artistName}</CardTitle>
          <CardDescription>
            Monthly Listeners: {followerCount}
          </CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{position}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Sort Type:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="all-of">all-of</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="album-sort">album-sort</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="global-sort">global-sort</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full" onClick={handleClick}>
            Sort
          </Button>
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className="p-1">
                <pre className="text-sm">{JSON.stringify(msg)}</pre>
              </li>
            ))}
          </ul>
        </CardFooter>
      </Card>
    </div>
  )
}
