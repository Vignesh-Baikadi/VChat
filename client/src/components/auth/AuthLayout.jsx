function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col justify-center bg-green-600 text-white p-12">
        <h1 className="text-5xl font-bold mb-6">
          ChatConnect
        </h1>

        <p className="text-lg text-green-100">
          Secure real-time messaging built with
          React, Node.js, MongoDB and Socket.IO.
        </p>

        <div className="mt-10 space-y-4">
          <p>✓ Real-time messaging</p>
          <p>✓ Secure authentication</p>
          <p>✓ Group conversations</p>
          <p>✓ File sharing</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;