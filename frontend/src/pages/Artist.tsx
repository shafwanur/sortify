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

export default function CardDemo() {
  const location = useLocation();
  const {img, artistName, spotifyUri, followerCount} = location.state || {};

  const [position, setPosition] = React.useState("all-of")

  async function handleClick() {
    console.log(position);

    const jwt_token = localStorage.getItem("jwt_token");
    
    const validate_response = await axios({
      method: 'get',
      url: 'http://localhost:8000/auth/validate',
      headers: {
        "Authorization": `Bearer ${jwt_token}`
      }
    });
    
    const spotify_user_id = validate_response.data.spotify_user_id;
    const access_token_response = await axios.post('http://localhost:8000/spotify/token/access', {
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
    const sort_response = await axios.post(
      "http://localhost:8000/api/sort",
      payload,
      {
        headers: {
          "access-token": access_token, // raw header key
        },
      }
    );

    console.log(sort_response);
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
        </CardFooter>
      </Card>
    </div>
  )
}
