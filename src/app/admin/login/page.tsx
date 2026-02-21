import LoginForm from "@/components/admin/LoginForm";

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white text-center mb-8">Admin</h1>
        <LoginForm />
      </div>
    </div>
  );
}
