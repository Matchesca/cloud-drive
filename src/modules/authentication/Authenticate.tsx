"use client";
import "dotenv/config";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import * as motion from "motion/react-client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import axios from "axios";

const Authenticate = () => {
  const [isLogin, setLogin] = useState<boolean>(true);
  const router = useRouter();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        action={async (formData: FormData) => {
          if (isLogin) {
            const { data, error } = await authClient.signIn.email(
              {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                callbackURL: "/dashboard",
              },
              {
                onSuccess: (ctx) => {
                  router.push("/dashboard");
                },
              },
            );

            if (error) {
              console.log("Auth error:", error);
            }

            console.log(data);
          } else {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const firstName = formData.get("firstName") as string;
            const lastName = formData.get("lastName") as string;

            const { data, error } = await authClient.signUp.email(
              {
                email: email,
                password: password,
                name: firstName + lastName,
              },
              {
                onSuccess: async (ctx) => {
                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER}/user/setup`,
                    { method: "POST", credentials: "include" },
                  );

                  if (response) {
                    console.log("nope:", response);
                  }

                  router.push("/dashboard");
                },
              },
            );

            if (error) {
              console.log("Auth signup error:", error);
            }

            console.log(data);
          }
        }}
      >
        {/* Container */}
        <motion.div className="flex w-96 flex-col justify-between rounded-[12px] border border-black">
          {isLogin ? (
            <>
              <div className="p-4">
                <label className="text-3xl font-bold">Sign In</label>
                <p className="text-xs">
                  Enter your email below to login to your account
                </p>
                {/* Input boxes container */}
                <div className="flex flex-col space-y-4 pt-6">
                  <div>
                    <label>Email</label>
                    <Input type="email" name="email" placeholder="Email" />
                  </div>
                  <div>
                    <label>Password</label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                </div>
              </div>
              {/* Button container at bottom */}
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <Button type="submit">Log in</Button>
                <Button variant="outline" onClick={() => setLogin(!isLogin)}>
                  Sign up
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="p-4">
                <label className="text-3xl font-bold">Sign Up</label>
                <p className="text-xs">
                  Enter your information to create an account
                </p>
                {/* Input boxes container */}
                <div className="flex flex-col space-y-4 pt-6">
                  <div className="flex flex-row justify-between space-x-4">
                    <div>
                      <label>First Name</label>
                      <Input
                        type="text"
                        name="firstName"
                        autoComplete="name"
                        placeholder="Max"
                      />
                    </div>
                    <div>
                      <label>Last Name</label>
                      <Input
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        placeholder="Robinson"
                      />
                    </div>
                  </div>
                  <div>
                    <label>Email</label>
                    <Input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label>Password</label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <label>Confirm Password</label>
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
              </div>
              {/* Button container at bottom */}
              <div className="flex flex-col items-center justify-center space-y-2 p-4">
                <Button type="submit">Create an account</Button>
              </div>
            </>
          )}
        </motion.div>
      </form>
    </div>
  );
};

export default Authenticate;
