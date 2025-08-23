/**
 * v0 by Vercel.
 * @see https://v0.app/t/zQWdiid50KS
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input"
import DropdownCard from "@/components/ui/dropdown-card";

export default function Search() {
  const response = {
    "status_code": 200,
    "msg": {
      "artists": {
        "href": "https://api.spotify.com/v1/search?offset=0&limit=5&query=Arctic%20Monkeys&type=artist",
        "limit": 5,
        "next": "https://api.spotify.com/v1/search?offset=5&limit=5&query=Arctic%20Monkeys&type=artist",
        "offset": 0,
        "previous": null,
        "total": 802,
        "items": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/7Ln80lUS6He07XvHI8qqHH"
            },
            "followers": {
              "href": null,
              "total": 31253130
            },
            "genres": [
              "indie",
              "garage rock"
            ],
            "href": "https://api.spotify.com/v1/artists/7Ln80lUS6He07XvHI8qqHH",
            "id": "7Ln80lUS6He07XvHI8qqHH",
            "images": [
              {
                "url": "https://i.scdn.co/image/ab6761610000e5eb7da39dea0a72f581535fb11f",
                "height": 640,
                "width": 640
              },
              {
                "url": "https://i.scdn.co/image/ab676161000051747da39dea0a72f581535fb11f",
                "height": 320,
                "width": 320
              },
              {
                "url": "https://i.scdn.co/image/ab6761610000f1787da39dea0a72f581535fb11f",
                "height": 160,
                "width": 160
              }
            ],
            "name": "Arctic Monkeys",
            "popularity": 88,
            "type": "artist",
            "uri": "spotify:artist:7Ln80lUS6He07XvHI8qqHH"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/2hv9oBOxgWSFnZJPW6UL58"
            },
            "followers": {
              "href": null,
              "total": 378
            },
            "genres": [],
            "href": "https://api.spotify.com/v1/artists/2hv9oBOxgWSFnZJPW6UL58",
            "id": "2hv9oBOxgWSFnZJPW6UL58",
            "images": [
              {
                "url": "https://i.scdn.co/image/ab67616d0000b2734ce69bc80497562fb53d7447",
                "height": 640,
                "width": 640
              },
              {
                "url": "https://i.scdn.co/image/ab67616d00001e024ce69bc80497562fb53d7447",
                "height": 300,
                "width": 300
              },
              {
                "url": "https://i.scdn.co/image/ab67616d000048514ce69bc80497562fb53d7447",
                "height": 64,
                "width": 64
              }
            ],
            "name": "Arctic Monkeys Tribute Band",
            "popularity": 1,
            "type": "artist",
            "uri": "spotify:artist:2hv9oBOxgWSFnZJPW6UL58"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/5ThqNILsplOvwjj9kx0Hnt"
            },
            "followers": {
              "href": null,
              "total": 408406
            },
            "genres": [
              "bangla pop"
            ],
            "href": "https://api.spotify.com/v1/artists/5ThqNILsplOvwjj9kx0Hnt",
            "id": "5ThqNILsplOvwjj9kx0Hnt",
            "images": [
              {
                "url": "https://i.scdn.co/image/ab6761610000e5ebea9671ec3844d514be0c15a2",
                "height": 640,
                "width": 640
              },
              {
                "url": "https://i.scdn.co/image/ab67616100005174ea9671ec3844d514be0c15a2",
                "height": 320,
                "width": 320
              },
              {
                "url": "https://i.scdn.co/image/ab6761610000f178ea9671ec3844d514be0c15a2",
                "height": 160,
                "width": 160
              }
            ],
            "name": "Artcell",
            "popularity": 37,
            "type": "artist",
            "uri": "spotify:artist:5ThqNILsplOvwjj9kx0Hnt"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/3DeHMjvYP73Pycy8va8RKY"
            },
            "followers": {
              "href": null,
              "total": 605542
            },
            "genres": [
              "bangla pop"
            ],
            "href": "https://api.spotify.com/v1/artists/3DeHMjvYP73Pycy8va8RKY",
            "id": "3DeHMjvYP73Pycy8va8RKY",
            "images": [
              {
                "url": "https://i.scdn.co/image/ab6761610000e5eb7e509af8bbc3833a2b116f6f",
                "height": 640,
                "width": 640
              },
              {
                "url": "https://i.scdn.co/image/ab676161000051747e509af8bbc3833a2b116f6f",
                "height": 320,
                "width": 320
              },
              {
                "url": "https://i.scdn.co/image/ab6761610000f1787e509af8bbc3833a2b116f6f",
                "height": 160,
                "width": 160
              }
            ],
            "name": "Arnob",
            "popularity": 46,
            "type": "artist",
            "uri": "spotify:artist:3DeHMjvYP73Pycy8va8RKY"
          },
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/06eRdiCBgFUhiuFjei0eH2"
            },
            "followers": {
              "href": null,
              "total": 838587
            },
            "genres": [
              "bangla pop"
            ],
            "href": "https://api.spotify.com/v1/artists/06eRdiCBgFUhiuFjei0eH2",
            "id": "06eRdiCBgFUhiuFjei0eH2",
            "images": [
              {
                "url": "https://i.scdn.co/image/ab67616d0000b273bc6d136d5d9ebdcd5db4bca7",
                "height": 640,
                "width": 640
              },
              {
                "url": "https://i.scdn.co/image/ab67616d00001e02bc6d136d5d9ebdcd5db4bca7",
                "height": 300,
                "width": 300
              },
              {
                "url": "https://i.scdn.co/image/ab67616d00004851863a8067cc2adad1b1fa2aef",
                "height": 64,
                "width": 64
              }
            ],
            "name": "Warfaze",
            "popularity": 44,
            "type": "artist",
            "uri": "spotify:artist:06eRdiCBgFUhiuFjei0eH2"
          }
        ]
      }
    }
  }

  const dropdownList = response.msg.artists.items.map(item => 
    <div key={item.id} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
      <DropdownCard 
        img = {item.images[0].url}
        artistName = {item.name} 
        spotifyUri = {item.uri}
        followerCount = {item.followers.total}
      />
    </div>
  );

  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-[500px]">
        <Input
          type="search"
          placeholder="Search..."
          className="pr-10 rounded-md border border-gray-300 py-2 pl-4 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        />
        {/* Dropdown goes here */}
        <div className="absolute left-0 right-0 mt-2 max-h-[300px] overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="py-2">
            {dropdownList}
          </div>
        </div>
      </div>
    </div>
  )
}