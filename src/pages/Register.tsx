import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Registration successful! You can now log in.");
      setEmail("");
      setPassword("");
    }
    setLoading(false);
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="card-surface w-full max-w-md">
        <h1 className="page-title text-center mb-6">Join F.I.T.</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-white focus:border-[var(--accent)] focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-rose-400 text-sm text-center bg-rose-400/10 p-2 rounded border border-rose-400/20">
              {error}
            </p>
          )}
          {message && (
            <p className="text-emerald-400 text-sm text-center bg-emerald-400/10 p-2 rounded border border-emerald-400/20">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-4"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--accent)] hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </section>
  );
}
