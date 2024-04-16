import { UserResponse } from "@/graphql/__generated__/graphql";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  id: number | undefined;
  avatarUrl: string | null;
  fullName: string | null;
  email: string;
  updateProfileImage: (_image: string) => void;
  updateFullName: (_name: string) => void;
  setUser: (user: UserResponse) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: undefined,
      fullName: "",
      avatarUrl: "",
      email: "",
      updateProfileImage: (image) => {
        set({ avatarUrl: image });
      },
      updateFullName: (name) => {
        set({
          fullName: name,
        });
      },
      setUser: (user) => {
        set({
          id: user.id || undefined,
          avatarUrl: user.createdAt,
          fullName: user.fullName,
          email: user.email,
        });
      },
    }),
    {
      name: "user-store",
    }
  )
);
