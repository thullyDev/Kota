import type { CreateUser, GetUser, User } from "../types/databaseServiceTypes";

export async function getUser({ email }: GetUser): Promise<null | User> {
  const fakeUser: User = {
    id: 1,
    profile_image_url: "https://example.com/profile_image.jpg",
    name: "John Doe",
    email: "john.doe@example.com",
    encrypted_password: "hashed_password_123",
    session_token: "session_token_abc123",
    created_at: "2024-10-01T12:00:00Z", // ISO 8601 format
  };
  // TODO: get real data from the database
  // return null

  return fakeUser;
}

export async function createUser({
  email,
  name,
  sessionToken,
  encryptedPassword,
}: CreateUser): Promise<boolean> {
  // TODO: create real data for the database
  return true;
}
