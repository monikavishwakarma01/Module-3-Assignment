function App() {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow p-4">
        <ul className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">Features</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="p-8 flex flex-col md:flex-row items-center gap-8">

        <div className="flex-1">
          {/* Responsive Gradient Text */}
          <h2 className="text-xl md:text-3xl lg:text-5xl font-bold 
                         bg-gradient-to-r from-blue-500 to-purple-600 
                         bg-clip-text text-transparent">
            Learn Tailwind CSS
          </h2>

          <p className="mt-4 text-gray-600">
            Build responsive and modern UI using Tailwind CSS in React.
          </p>

          {/* Button Styling */}
          <button className="mt-4 px-6 py-2 rounded bg-gray-200 
                             hover:bg-gray-300 active:bg-gray-400 transition">
            Get Started
          </button>
        </div>

        {/* Image with Hover Effect */}
        <div className="flex-1">
          <img
            src="https://via.placeholder.com/400"
            alt="Hero"
            className="rounded shadow-lg hover:scale-105 transition duration-300"
          />
        </div>

      </section>

      {/* ================= FEATURES GRID ================= */}
      <section className="p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Features</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {["Fast", "Responsive", "Customizable"].map((item) => (
            <div key={item} className="bg-white p-4 rounded shadow">
              <img
                src="https://via.placeholder.com/300"
                alt={item}
                className="rounded mb-3"
              />
              <h4 className="font-bold text-lg">{item}</h4>
              <p className="text-gray-600">Tailwind utility-based design.</p>
              <button className="mt-3 px-4 py-1 bg-gray-200 rounded 
                                 hover:bg-gray-300 active:bg-gray-400">
                Read More
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* ================= LIST STYLING ================= */}
      <section className="p-8">
        <h3 className="text-xl font-bold mb-3">Why Tailwind?</h3>
        <ul className="list-disc list-inside pl-5 space-y-2">
          <li className="hover:text-blue-600">Utility-first CSS</li>
          <li className="hover:text-blue-600">Responsive by default</li>
          <li className="hover:text-blue-600">Fast development</li>
        </ul>
      </section>

      {/* ================= TABLE ================= */}
      <section className="p-8 overflow-x-auto">
        <h3 className="text-xl font-bold mb-4">Pricing Table</h3>

        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Plan</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Support</th>
            </tr>
          </thead>

          <tbody>
            {[
              ["Basic", "Free", "Email"],
              ["Pro", "$10", "Chat"],
              ["Enterprise", "$50", "24/7"],
            ].map((row, index) => (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-100 hover:bg-gray-200"
              >
                {row.map((cell, i) => (
                  <td key={i} className="border p-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="p-8">
        <h3 className="text-xl font-bold mb-4">Contact Us</h3>

        <form className="bg-white p-6 rounded shadow max-w-md mx-auto space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded 
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            className="w-full bg-gray-200 py-2 rounded 
                       hover:bg-gray-300 active:bg-gray-400 transition">
            Submit
          </button>
        </form>
      </section>

    </div>
  );
}

export default App;
