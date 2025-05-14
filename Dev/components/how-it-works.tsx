export default function HowItWorks() {
  return (
    <section className="relative w-full h-auto py-16 overflow-hidden bg-gradient-to-b from-background to-muted/30 md:py-24 lg:py-32">
      <div className="container">
        <div className="mx-auto mb-12 max-w-[58rem] text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tighter md:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Sharing sensitive information has never been easier or more secure.
          </p>
        </div>
        <div className="grid max-w-5xl gap-8 mx-auto md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Create</h3>
            <p className="text-sm text-muted-foreground">
              Enter your environment variables or sensitive information and set
              expiration options.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Share</h3>
            <p className="text-sm text-muted-foreground">
              Generate a secure link and share it with your team or clients via
              any communication channel.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10 text-primary">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="mb-2 text-xl font-bold">Access</h3>
            <p className="text-sm text-muted-foreground">
              Recipients can securely access the information before it expires
              or reaches its view limit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
