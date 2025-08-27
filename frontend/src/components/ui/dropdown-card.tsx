import type { DropDownCardType } from "@/types/dropdown-card"
import { useNavigate } from "react-router-dom";

function roundToTwoDecimals(x: number) {
  return Math.round((x + Number.EPSILON) * 100) / 100;
}

function formatFollowerCount(followerCount: number) {
  if (followerCount >= 1e6) {
    return roundToTwoDecimals(followerCount / 1e6) + 'M';
  }
  if (followerCount >= 1e3) {
    return roundToTwoDecimals(followerCount / 1e3) + 'K';
  }
  return followerCount;
}

export default function DropdownCard({ img, artistName, spotifyUri, followerCount }: DropDownCardType) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/artist", {
      "state": {
        img: img,
        followerCount: formatFollowerCount(followerCount),
        artistName: artistName,
        spotifyUri: spotifyUri
      }
    });
  }
  return (
    <div className="pl-4 relative" onClick={handleClick}>
      <div className="flex justify-between">
        <img src={img} className="max-h-27"/>
        <div className="space-y-1">
        <h4 className="text-sm font-semibold">{artistName}</h4>
        <p className="text-sm font-white">
          Monthly Listeners: {formatFollowerCount(followerCount)}
        </p>
        <div className="text-muted-foreground text-xs">
          {spotifyUri}
        </div>
        </div>
      </div>
    </div>
  )
}