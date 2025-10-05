// src/components/MusicDashboard.tsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// --- Data for the first card ---
type Album = {
  name: string;
  artist: string;
  imageUrl: string;
};

const albums: Album[] = [
  {
    name: "Midnights",
    artist: "Taylor Swift",
    imageUrl: "https://placehold.co/128x128/3b0764/ffffff/png?text=Midnights",
  },
  {
    name: "SOS",
    artist: "SZA",
    imageUrl: "https://placehold.co/128x128/0f172a/ffffff/png?text=SOS",
  },
  // ... other albums
];

// --- Data for the new song metrics table ---
type SongMetric = {
  name: string;
  album: string;
  score: number;
};

const songMetrics: SongMetric[] = [
    { name: "Anti-Hero", album: "Midnights", score: 95 },
    { name: "Kill Bill", album: "SOS", score: 92 },
    { name: "FE!N", album: "UTOPIA", score: 88 },
    { name: "Nights", album: "Blonde", score: 98 },
    { name: "Alright", album: "To Pimp A Butterfly", score: 100 },
];


export default function Test() {
  return (
    // Parent container to hold both cards with vertical spacing
    <div className="space-y-4">
      
      {/* Card 1: Recently Played Albums (from your code) */}
      {albums.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Recently Played Albums</CardTitle>
            <CardDescription>
              A list of albums from your recent listening history.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border">
              {albums.map((album) => (
                <li key={album.name} className="flex items-center py-4">
                  <img
                    src={album.imageUrl}
                    alt={`Album cover for ${album.name}`}
                    className="h-32 w-32 rounded-md object-cover" // Adjusted size for better balance
                  />
                  <div className="ml-4">
                    <p className="text-md font-medium leading-none">
                      {album.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {album.artist}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Card 2: Song Metrics Table (newly added) */}
      {songMetrics.length > 0 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl">Song Metrics</CardTitle>
            <CardDescription>
              An overview of track performance scores.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%] text-xl">Song Name</TableHead>
                  <TableHead className="text-xl">Album Name</TableHead>
                  <TableHead className="text-right text-xl">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {songMetrics.map((song) => (
                  <TableRow key={song.name}>
                    <TableCell className="font-medium">{song.name}</TableCell>
                    <TableCell>{song.album}</TableCell>
                    <TableCell className="text-right">{song.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}