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
  console.log(artistName, spotifyUri);

  const [position, setPosition] = React.useState("Sort Type")

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
                  <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Album">Album</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Global">Global</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full">
            Sort
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
