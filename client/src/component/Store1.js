import React from 'react'

const Store1 = () => {
  return (
    <div className="container mx-auto p-4 flex">
    {/* Left Column */}
    <div className="w-1/3 bg-gray-300 p-4">
      {/* Add your image here */}
      <img
        src="data:image/jpeg;base64,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"
        alt="Your Name"
        className="rounded-full mb-4"
      />
      {/* Contact Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Contact</h2>
        <div>Phone: 123-456-7890</div>
        <div>Email: hello@reallygreatsite.com</div>
        <div>Address: 123 Anywhere St., Any City</div>
      </section>
      {/* Education Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Education</h2>
        {/* Repeat the following block for each education entry */}
        <div className="mb-2">
          <div className="font-bold">University/College</div>
          <div>Enter Your Degree</div>
          <div>2008</div>
        </div>
        {/* Repeat the above block for each education entry */}
      </section>
      {/* Expertise Section */}
      <section>
        <h2 className="text-xl font-bold mb-2">Expertise</h2>
        <ul className="list-disc list-inside">
          <li>Visual Design</li>
          <li>Process Flows</li>
          <li>Storyboards</li>
          <li>UI/UX</li>
          <li>User Flows</li>
          <li>Wireframes</li>
          {/* Add more skills as needed */}
        </ul>
      </section>
    </div>
    {/* Right Column */}
    
    <div className="w-2/3 bg-white p-4">
        {/* Top Information Section */}
        <div className="text-right mb-4">
          <h1 className="text-3xl font-bold">Mariana Anderson</h1>
          <p className="text-xl">Marketing Manager</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor,
            quis tempus arcu elementum. In elementum elit at dui tristique.
          </p>
        </div>
      {/* Content for the right column */}
      {/* Experience Section */}
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">Experience</h2>
        {/* Repeat the following block for each job position */}
        <div className="mb-4">
          <div className="font-bold">Job Position</div>
          <div>Company Name | 123 Anywhere St., Any City</div>
          <div>2019 - 2022</div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pharetra in lorem at laoreet. Donec hendrerit libero eget est tempor,
            quis tempus arcu elementum.
          </p>
        </div>
        {/* Repeat the above block for each job position */}
      </section>
      {/* Reference Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2">Reference</h2>
        <div className="font-bold">Name Surname</div>
        <div>Phone: 123-456-7890</div>
        <div>Email: hello@reallygreatsite.com</div>
        <div>Job Position, Company Name</div>
      </section>
    </div>
  </div>
  
  )
}

export default Store1
