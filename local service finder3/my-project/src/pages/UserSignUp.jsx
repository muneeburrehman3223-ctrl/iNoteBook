export default function UserSignUp() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-5">User Sign Up</h1>
      <form className="flex flex-col gap-4 w-80">
        <input
          type="text"
          placeholder="Full Name"
          className="p-3 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded"
        />
        <input type="text" placeholder="Phone" className="p-3 border rounded" />
        <input
          type="text"
          placeholder="Address"
          className="p-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded"
        />
        <button className="bg-purple-600 text-white p-3 rounded font-bold hover:bg-purple-700">
          Sign Up
        </button>
      </form>
    </div>
  );
}
