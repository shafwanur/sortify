/**
 * v0 by Vercel.
 * @see https://v0.app/t/zQWdiid50KS
 * Documentation: https://v0.app/docs#integrating-generated-code-into-your-nextjs-app
 */
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input"
import DropdownCard from "@/components/ui/dropdown-card";

export default function Search() {
  const [response, setResponse] = useState<any>(null); // store API response in state

  async function handleChange(e: any) { // TODO: change type or how this is handled later. 

    await new Promise(resolve => setTimeout(resolve, 1000)); // 5s wait for user to stop typing. stupid solution, i know. give me a break. TODO: fix later.  
    console.log(e.target.value);
    
    const jwt_token = localStorage.getItem("jwt_token");
    
    const validate_response = await axios({
      method: 'get',
      url: 'http://localhost:8000/auth/validate',
      headers: {
        "Authorization": `Bearer ${jwt_token}`
      }
    });
    
    const access_token_response = await axios.post('http://localhost:8000/spotify/token/access', {
        spotify_user_id: validate_response.data.spotify_user_id,
        refresh_token: validate_response.data.refresh_token
      }
    )
    
    const access_token = access_token_response.data.access_token;

    console.log(access_token);
    console.log({ artist_name: e.target.value });


    const search_response = await axios({
      method: 'get',
      url: 'http://localhost:8000/api/artists',
      params: {
        artist_name: e.target.value
      },
      headers: {
        "access-token": access_token
      }
    });

    console.log(search_response);
    setResponse(search_response.data);
  }
  
  const dropdownList = response?.msg?.artists?.items?.map((item: any) => (
    <div key={item.id} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
      <DropdownCard 
        img={item.images[0]?.url}
        artistName={item.name} 
        spotifyUri={item.uri}
        followerCount={item.followers.total}
      />
    </div>
  ));

  console.log("log", dropdownList);

  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-[500px]">
        <Input
          type="search"
          placeholder="Search..."
          className="pr-10 rounded-md border border-gray-300 py-2 pl-4 focus:border-primary focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          onChange={handleChange}
        />
        {/* Dropdown goes here */}
        {
        dropdownList ? (
        <div className="absolute left-0 right-0 mt-2 max-h-[300px] overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="py-2">
            {dropdownList}
          </div>
        </div>
        ) : <></>
        }
      </div>
    </div>
  )
}