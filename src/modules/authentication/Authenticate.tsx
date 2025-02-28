import Button from "@/components/Button";
import Input from "@/components/Input";

const Authenticate = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <form>
        {/* Container */}
        <div className="flex h-96 w-80 flex-col justify-between rounded-[12px] border border-black">
          <div className="p-4">
            <label className="text-xl font-bold">Sign In</label>
            <p className="text-xs">
              Enter your email below to login to your account
            </p>
            {/* Input boxes container */}
            <div className="flex flex-col space-y-4 pt-6">
              <div>
                <label>Email</label>
                <Input type="email" placeholder="Email" />
              </div>
              <div>
                <label>Password</label>
                <Input type="password" placeholder="Password" />
              </div>
            </div>
          </div>
          {/* Button container at bottom */}
          <div className="flex flex-col items-center justify-center p-4">
            <label className="cursor-pointer pb-2 text-center text-sm">
              Sign Up
            </label>
            <Button>Log in</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Authenticate;
