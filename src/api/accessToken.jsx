const useAccessToken = () => {
    const [token, setToken] = useState(null);
  
    useEffect(() => {
      // Get the access token from localStorage
      const token = localStorage.getItem("accessToken");
  
      // Set the access token state
      setToken(token);
    }, []);
  
    return { token };
  };