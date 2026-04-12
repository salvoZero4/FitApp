import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Login effettuato con successo! Ti mando alla Dashboard
      navigate("/dashboard");
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="card-surface w-full max-w-md">
        <h1 className="page-title text-center mb-6">Welcome Back</h1>

        <form onSubmit={handleLogin} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-4"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          Don't have an account?{" "}
          <Link to="/register" className="text-[var(--accent)] hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </section>
  );
}
