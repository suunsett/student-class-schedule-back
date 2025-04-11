const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const data = require('./sample.json');

app.get('', (req, res) => {
  res.send("hi")
})

app.get('/api/home', (req, res) => {

  let filteredData = data; // Start with all data

  // Step 1: Filter by university first (if provided)
  if (req.query.university) {
    const universities = req.query.university.split(',').map(u => u.toLowerCase());
    filteredData = filteredData.filter(item =>
      item.university && universities.includes(item.university.toLowerCase())
    );
  }

  // Step 2: Apply additional filters (if provided)
  if (req.query.courseName) {
    const courses = req.query.courseName.split(',').map(c => c.toLowerCase());
    filteredData = filteredData.filter(item =>
      item.courseName && courses.includes(item.courseName.toLowerCase())
    );
  }
  
  if (req.query.courseProf) {
    const professors = req.query.courseProf.split(',').map(p => p.toLowerCase());
    filteredData = filteredData.filter(item =>
      item.courseProf && professors.includes(item.courseProf.toLowerCase())
    );
  }
  
  if (req.query.major) {
    const majors = req.query.major.split(',').map(m => m.toLowerCase());
    filteredData = filteredData.filter(item =>
      item.major && majors.includes(item.courseProf.toLowerCase())
    );
  }

  if (req.query.date) {
    const dates = req.query.date.split(',').map(d => d.toLowerCase());
    filteredData = filteredData.filter(item =>
      item.date && dates.includes(item.date.toLowerCase())
    );
  }

  if (filteredData.length === 0) {
    return res.status(404).json({ message: "No matching classes found!" });
  }

  res.json(filteredData); // Send back the filtered data
})


app.listen(5000, () =>
    console.log('Server is running on port 5000')
)