import Authenticate from "@/modules/authentication/Authenticate";

const signup = () => {
  return (
    <main className="h-screen w-full">
      <Authenticate />
    </main>
  );
};

export default signup;
