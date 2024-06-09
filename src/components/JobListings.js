import React, { useState } from 'react';

const JobListings = () => {
    const initialDummyJobs = [{
            id: 1,
            title: 'Frontend Developer',
            company: 'Tech Corp',
            location: 'San Francisco, CA',
            requirements: '3+ years of experience with React',
            salaryRange: '$90,000 - $120,000',
            deadline: '2024-07-01'
        },
        {
            id: 2,
            title: 'Backend Developer',
            company: 'Code Labs',
            location: 'New York, NY',
            requirements: '2+ years of experience with Node.js',
            salaryRange: '$80,000 - $110,000',
            deadline: '2024-06-30'
        },
        {
            id: 3,
            title: 'Full Stack Developer',
            company: 'Dev Solutions',
            location: 'Austin, TX',
            requirements: '5+ years of experience with full stack development',
            salaryRange: '$100,000 - $140,000',
            deadline: '2024-07-15'
        }
    ];

    const [jobs, setJobs] = useState(initialDummyJobs);
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [newJob, setNewJob] = useState({
        title: '',
        company: '',
        location: '',
        requirements: '',
        salaryRange: '',
        deadline: ''
    });
    const [errors, setErrors] = useState({});

    const handleApply = (jobId) => {
        if (!appliedJobs.includes(jobId)) {
            alert(`Applied for job with ID: ${jobId}`);
            setAppliedJobs([...appliedJobs, jobId]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob({
            ...newJob,
            [name]: value
        });
    };

    const handleAddJob = (e) => {
        e.preventDefault();
        const { title, company, location, requirements, salaryRange, deadline } = newJob;
        const newErrors = {};

        if (!title) newErrors.title = 'Field value is required';
        if (!company) newErrors.company = 'Field value is required';
        if (!location) newErrors.location = 'Field value is required';
        if (!requirements) newErrors.requirements = 'Field value is required';
        if (!salaryRange) newErrors.salaryRange = 'Field value is required';
        if (!deadline) newErrors.deadline = 'Field value is required';

        if (Object.keys(newErrors).length === 0) {
            setJobs([
                ...jobs,
                {...newJob, id: jobs.length + 1 }
            ]);
            setNewJob({
                title: '',
                company: '',
                location: '',
                requirements: '',
                salaryRange: '',
                deadline: ''
            });
            setErrors({});
            alert(`Job created with` + jobs.length);
        } else {
            setErrors(newErrors);
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase())
    );

    return ( <
        div >
        <
        input type = "text"
        placeholder = "Search by job title"
        value = { searchTerm }
        onChange = { e => setSearchTerm(e.target.value) }
        /> <
        input type = "text"
        placeholder = "Search by location"
        value = { location }
        onChange = { e => setLocation(e.target.value) }
        />

        <
        form onSubmit = { handleAddJob } >
        <
        h2 > Add New Job < /h2> <
        div >
        <
        input type = "text"
        name = "title"
        placeholder = "Job Title"
        value = { newJob.title }
        onChange = { handleInputChange }
        /> {
        errors.title && < p style = {
            { color: 'red' }
        } > { errors.title } < /p>} < /
        div > <
        div >
        <
        input type = "text"
        name = "company"
        placeholder = "Company"
        value = { newJob.company }
        onChange = { handleInputChange }
        /> {
        errors.company && < p style = {
            { color: 'red' }
        } > { errors.company } < /p>} < /
        div > <
        div >
        <
        input type = "text"
        name = "location"
        placeholder = "Location"
        value = { newJob.location }
        onChange = { handleInputChange }
        /> {
        errors.location && < p style = {
            { color: 'red' }
        } > { errors.location } < /p>} < /
        div > <
        div >
        <
        input type = "text"
        name = "requirements"
        placeholder = "Requirements"
        value = { newJob.requirements }
        onChange = { handleInputChange }
        /> {
        errors.requirements && < p style = {
            { color: 'red' }
        } > { errors.requirements } < /p>} < /
        div > <
        div >
        <
        input type = "text"
        name = "salaryRange"
        placeholder = "Salary Range"
        value = { newJob.salaryRange }
        onChange = { handleInputChange }
        /> {
        errors.salaryRange && < p style = {
            { color: 'red' }
        } > { errors.salaryRange } < /p>} < /
        div > <
        div >
        <
        input type = "date"
        name = "deadline"
        placeholder = "Deadline"
        value = { newJob.deadline }
        onChange = { handleInputChange }
        /> {
        errors.deadline && < p style = {
            { color: 'red' }
        } > { errors.deadline } < /p>} < /
        div > <
        button type = "submit" > Add Job < /button> < /
        form >

        <
        ul > {
            filteredJobs.map(job => ( <
                li key = { job.id } >
                <
                h2 > { job.title } < /h2> <
                p > { job.company } < /p> <
                p > { job.location } < /p> <
                p > { job.requirements } < /p> <
                p > { job.salaryRange } < /p> <
                p > { job.deadline } < /p> <
                button onClick = {
                    () => handleApply(job.id)
                }
                disabled = { appliedJobs.includes(job.id) } > { appliedJobs.includes(job.id) ? 'Applied' : 'Apply' } <
                /button> < /
                li >
            ))
        } <
        /ul> < /
        div >
    );
};

export default JobListings;