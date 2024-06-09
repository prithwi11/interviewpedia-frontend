import React from 'react'

const Profile = () => {
  return (
    <div className='bg-gray-100'>
    <div class= " max-w-4xl mx-auto mt-20 pt-12 ">

        <div class="bg-white w-4xl shadow-xl rounded-lg">
            <h2 class="text-2xl font-bold p-2 m-2">Basic Details</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-2 ">
                <div><strong>Full Name:</strong> John Doe</div>
                <div><strong>Company:</strong> ABC Corp</div>
                <div><strong>Job Title:</strong> Senior Developer</div>
                <div><strong>Contact No:</strong> +1234567890</div>
                <div><strong>Email:</strong> johndoe@example.com</div>
                <div><strong>Location:</strong> New York, USA</div>
                <div><strong>Profile Last Updated On:</strong> June 9, 2024</div>
            </div>
        </div>

        <div class="mt-4 bg-white shadow-xl rounded-lg">
            <h2 class="text-2xl font-bold py-4 px-4 ">Experience</h2>
                <div class=" px-4 py-2 rounded-lg shadow-sm">
                    <div><strong>Company:</strong> ABC Corp</div>
                    <div><strong>Job Title:</strong> Senior Developer</div>
                    <div><strong>Start Date:</strong> January 2020</div>
                    <div><strong>End Date:</strong> Present</div>
                    <div><strong>Responsibilities:</strong> Developing web applications, Leading team projects</div>
                </div>
        </div>

        <div class="mt-4 bg-white shadow-xl rounded-lg">
            <h2 class="text-2xl font-bold py-4 px-4">Skills</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-2">
                <div><strong>Skill Name:</strong> JavaScript</div>
                <div><strong>Proficiency Level:</strong> Expert</div>
                <div><strong>Skill Name:</strong> React</div>
                <div><strong>Proficiency Level:</strong> Intermediate</div>
            </div>
        </div>

        <div class="mt-4 bg-white shadow-xl rounded-lg">
            <h2 class="text-2xl font-bold py-4 px-4">Education</h2>
            <div class="space-y-4">
                <div class=" p-4 rounded-lg shadow-sm">
                    <div><strong>Degree:</strong> Bachelor of Science in Computer Science</div>
                    <div><strong>Institution:</strong> XYZ University</div>
                    <div><strong>Year:</strong> 2018</div>
                </div>
            </div>
        </div>

        <div class="mt-4 bg-white shadow-xl rounded-lg">
            <h2 class="text-2xl font-bold py-4 px-4">Certifications</h2>
            <div class="space-y-4">
                <div class=" p-4 rounded-lg shadow-sm">
                    <div><strong>Name:</strong> Certified JavaScript Developer</div>
                    <div><strong>Issuing Organization:</strong> Tech Institute</div>
                    <div><strong>Issue Date:</strong> June 2020</div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Profile