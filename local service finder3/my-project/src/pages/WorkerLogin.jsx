export default function WorkerLogin() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-5">Worker Login</h1>
      <form className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border rounded"
        />
        <button className="bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
