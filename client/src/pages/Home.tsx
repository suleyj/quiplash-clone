function Home() {
  return (
       <div className="min-h-screen hero bg-base-200">
        <div className="text-center hero-content">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">Quiplash Clone</h1>
            <p className="py-6 mb-4">
              The ultimate party game where wit wins the day. Battle friends in
              a hilarious showdown of quick thinking and clever comebacks.
              Answer prompts, vote on the funniest responses, and crown the
              comedy champion! Perfect for game nights, parties, and online
              hangouts. Laughter guaranteed!"
            </p>
            <button className="mb-4 btn btn-primary">CREATE GAME</button>
            <p className="mb-4 text-2xl font-bold">OR</p>
            <input
              type="text"
              placeholder="Enter Game Code"
              className="input input-bordered w-full max-w-[14rem] mr-2"
            />
            <button className="btn btn-primary">JOIN</button>
          </div>
        </div>
      </div>
  );
}

export default Home;
