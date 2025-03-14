import Search from "../components/Search/Search";
import { useState } from "react";
import { UserProps } from "../types/user";

export default function Home() {
  const [ user, setUser ] = useState<UserProps | null>(null);
  const url: string = "https://api.github.com/users/";

  const loadUser = async(userName: string) => {
    const response = await fetch(`${url}${userName}`);
    const data = await response.json();

    console.log(data);
  }

  return (
    <div>
      <Search loadUser={loadUser} />
    </div>
  );
}
