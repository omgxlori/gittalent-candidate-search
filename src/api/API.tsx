// Fetch multiple users based on a search query (for potential future use)
const searchGithub = async (query: string) => {
  try {
    const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    return data.items; // Returns an array of users
  } catch (err) {
    console.error('An error occurred', err);
    return [];
  }
};

// Fetch a specific GitHub user by username
const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    return data; // Returns a single user object
  } catch (err) {
    console.error('An error occurred', err);
    return {};
  }
};

// Fetch a random GitHub user
const fetchRandomUser = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    
    // First, fetch a list of users
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    const users = await response.json();
    if (!response.ok || users.length === 0) {
      throw new Error('Invalid API response, check the network tab');
    }


    const username = users[0].login;


    const detailedResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    const detailedUser = await detailedResponse.json();
    if (!detailedResponse.ok) {
      throw new Error('Failed to fetch detailed user information');
    }

    return detailedUser; // Return the detailed user object

  } catch (err) {
    console.error('An error occurred', err);
    return null;
  }
};


export { searchGithub, searchGithubUser, fetchRandomUser };
