import { Loader } from "@/components/ui/loading";

export default function Success() {
  //   const { data: session, status } = useSession();
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (status === "authenticated") {
  //       // redirect to dashboard after a brief delay
  //       const id = setTimeout(() => router.replace("/"), 2000);
  //       return () => clearTimeout(id);
  //     }
  //   }, [status]);
  const status: "good" = "good";
  const session = {
    user: {
      name: "john",
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container max-w-md p-8 text-center rounded-lg shadow-xl bg-card">
        {status !== "good" ? (
          <div className="space-y-4">
            <div className="w-full h-2 rounded bg-ring animate-pulse"></div>
            <p className="text-lg font-noto-serif-regular text-foreground">
              Signing you in...
            </p>
          </div>
        ) : (
          <>
            <h1 className="mb-4 text-3xl font-noto-serif-bold text-primary">
              Welcome, {session?.user.name}!
            </h1>
            <p className="mb-6 text-base font-noto-serif-regular text-foreground">
              Redirecting to your dashboard...
            </p>
            <div className="flex items-center justify-center w-full h-auto">
              <Loader />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
