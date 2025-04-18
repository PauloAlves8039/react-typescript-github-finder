import Search from "../components/Search/Search";
import { useState } from "react";
import { UserProps } from "../types/user";
import { BASE_URL } from "../config/constants";
import User from "../components/User/User";
import Error from "../components/Error/Error";

export default function Home() {
  const [ user, setUser ] = useState<UserProps | null>(null);
  const [ error, setError ] = useState(false);

  const loadUser = async(userName: string) => {
    setError(false);
    setUser(null);
    const response = await fetch(`${BASE_URL}${userName}`);
    const data = await response.json();

    if (response.status === 404) {
      setError(true);
      return false;
    }

    const { avatar_url, login, location, followers, following } = data;

    const userData: UserProps = {
      avatar_url,
      login,
      location,
      followers,
      following
    };

    setUser(userData);
    return true;

  };

  return (
    <div>
      <Search loadUser={loadUser} />
      { user && <User {...user} /> }
      { error && <Error /> }
    </div>
  );
}
