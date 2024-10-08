export type GetUser = {
  email: string;
};

export type CreateUser = {
  name: string;
  email: string;
  sessionToken: string;
  encryptedPassword: string;
  profileImageUrl: string;
};

export type User = {
  id: number;
  profile_image_url: string;
  name: string;
  email: string;
  encrypted_password: string;
  session_token: string;
  created_at: string;
};

// user columns
//   id,
//   profile_image_url,
//   name,
//   email,
//   encrypted_password,
//   session_token
//   created_at,
