import type { eq, SQL } from "drizzle-orm";

export type GetUser = {
  email: string | undefined | null;
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
  profile_image_url: string | null;
  name: string;
  email: string;
  encrypted_password: string;
  session_token: string;
  created_at: string | Date;
};


export type UpdateSessionToken = {
  email: string,
  sessionToken: string,
}

export type UpdateUser = {
  data: Record<string, any>,
  equalTo: SQL<unknown> 
}
