// Define the structure for the photo object
export interface Photo {
    value: string;
  }
  
  // Define the structure for the GitHub plan
  export interface Plan {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  }
  
  // Define the structure for the _json object
  export interface UserJson {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    name: string;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
    notification_email: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    private_gists: number;
    total_private_repos: number;
    owned_private_repos: number;
    disk_usage: number;
    collaborators: number;
    two_factor_authentication: boolean;
    plan: Plan;
  }
  
  // Define the structure for the user object
  export interface User {
    id: string;
    nodeId: string;
    displayName: string;
    username: string;
    profileUrl: string;
    photos: Photo[];
    provider: string;
    _raw: string;
    _json: UserJson;
    accessToken: string;
  }
  
  // Define the structure for the root response
  export interface ApiResponse {
    user: User;
  }