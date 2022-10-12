import { FC } from "react";
import { Menu } from "@mantine/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mantine/core";
import Lottie from "lottie-react";
import TwitterNotification from "./18887-twitter-notification.json";
import { UserIcon } from "../atoms";

export const SigninPopover: FC = () => {
  const { data: session } = useSession();

  return (
    <Menu width={240} shadow="sm" position="bottom-end">
      <Menu.Target>
        <Button variant="subtle" color="gray" radius="xs" size="lg">
          <UserIcon />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          {!session && (
            <Button
              color="indigo"
              variant="outline"
              size="sm"
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                e.preventDefault();
                signIn();
              }}
            >
              <Lottie animationData={TwitterNotification} loop />
              {"\u00a0"}Sign in with Twitter
            </Button>
          )}
          {session && (
            <div className="flex justify-between">
              <Button
                color="indigo"
                variant="outline"
                onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </Button>
              <span className="text-xs">
                <small>
                  {"\u00a0"}Signed in as{"\u00a0"}
                </small>
                <strong>{session.user.email || session.user.name}</strong>
              </span>
            </div>
          )}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
