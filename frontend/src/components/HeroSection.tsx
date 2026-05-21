function HeroSection() {
  return (
    <section className="bg-[#f7f7fb]">
      
      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left */}
        <div>
          
          <p className="text-indigo-600 font-semibold mb-4">
            #1 Job Platform
          </p>

          <h1 className="text-6xl font-bold leading-tight">
            Find Your
            <span className="text-indigo-600">
              {' '}Dream Job
            </span>
          </h1>

          <p className="mt-6 text-gray-500 text-lg leading-relaxed">
            Connect with top companies,
            discover opportunities,
            and build your future career.
          </p>

          {/* Search */}
          <div className="mt-10 bg-white rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4">
            
            <input
              type="text"
              placeholder="Job title or keyword"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none"
            />

            <input
              type="text"
              placeholder="Location"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none"
            />

            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold">
              Search
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          
          <div className="bg-indigo-600 rounded-[40px] h-[500px] flex items-center justify-center">
            
            <div className="bg-white rounded-3xl p-10 w-[80%] shadow-xl">
              
              <h3 className="text-2xl font-bold">
                UI/UX Designer
              </h3>

              <p className="text-gray-500 mt-2">
                Google Inc.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                
                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl">
                  Full Time
                </span>

                <span className="bg-gray-100 px-4 py-2 rounded-xl">
                  Remote
                </span>
              </div>

              <button className="mt-10 w-full bg-black text-white py-3 rounded-xl">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection