import React from 'react';

const ResumePrintable = ({ resumeData }) => {
  const {
    name,
    email,
    phone,
    location,
    education,
    experience,
    skills,
    projects,
    codingProfiles,
    certificates,
  } = resumeData;

  return (
    <div id="resume-container">
      <header className="bg-gray-800 text-white text-center py-4">
        <h1 className="text-3xl font-bold w-full text-center">{name}</h1>
        <p>Student</p>
      </header>

      <div className="container mx-auto my-4 px-4 flex">
        <div className="w-1/2 pr-4">
          <section>
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Contact Information</h2>
            <p>
              Email:{' '}
              <strong>{email}</strong> | Phone:{' '}
              <strong>{phone}</strong> | Location:{' '}
              <strong>{location}</strong>
            </p>
          </section>

          <section className="my-4">
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Work Experience</h2>
            <div className="mb-4">
              <strong>{experience}</strong>
            </div>
          </section>
          
          <section className="my-4">
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Education</h2>
            <div className="mb-4">
              <strong>{education}</strong>
            </div>
          </section>
        </div>

        <div className="w-1/2 pl-4">
          <section className="my-4">
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Skills</h2>
            <ul className="list-disc list-inside">
              {skills.map((skill, index) => (
                <li key={index}>
                  <strong>{skill}</strong>
                </li>
              ))}
            </ul>
          </section>

          <section className="my-4">
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Personal Projects</h2>
            <ul className="list-disc list-inside">
              {projects.map((project, index) => (
                <li key={index}>
                  <strong>{project}</strong>
                </li>
              ))}
            </ul>
          </section>

          <section className="my-4">
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Certificates</h2>
            <ul className="list-disc list-inside">
              {certificates.map((certificate, index) => (
                <li key={index}>
                  <strong>{certificate}</strong>
                </li>
              ))}
            </ul>
          </section>

          <section className="my-4">
            <h2 className="text-2xl font-bold border-b-2 pb-2 mb-4">Coding Profiles</h2>
            <ul className="list-disc list-inside">
              {codingProfiles.map((codingProfile, index) => (
                <li key={index}>
                  <strong>{codingProfile}</strong>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResumePrintable;
