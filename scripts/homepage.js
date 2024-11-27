document.addEventListener('DOMContentLoaded', () => {
  // Set current year and last modified date
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = "Last modified: " + document.lastModified;

  const hamButton = document.querySelector('#menu');
  const navigation = document.querySelector('.navigation');

  hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
  });

  const courses = [
    {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
      technology: ['Python'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
      technology: ['HTML', 'CSS'],
      completed: true
    },
    {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'Students become more organized, efficient, and powerful programmers by learning functions.',
      technology: ['Python'],
      completed: true
    },
    {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces classes and objects, encapsulation, inheritance, and polymorphism.',
      technology: ['C#'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 131,
      title: 'Dynamic Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'Students will learn to create dynamic websites using JavaScript.',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: true
    },
    {
      subject: 'WDD',
      number: 231,
      title: 'Frontend Web Development I',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course focuses on user experience, accessibility, performance optimization, and API usage.',
      technology: ['HTML', 'CSS', 'JavaScript'],
      completed: false
    }
  ];

  function displayCourses(filter = "all") {
    const courseContainer = document.getElementById('courseCards');
    const courseList = document.getElementById('courseList');
    courseContainer.innerHTML = '';
    courseList.innerHTML = '';

    let totalCredits = 0;

    const filteredCourses = courses.filter(course => filter === "all" || course.subject === filter);

    filteredCourses.forEach(course => {
      // Create course card
      const courseCard = document.createElement('div');
      courseCard.classList.add('course-btn');
      if (course.completed) courseCard.classList.add('completed');
      courseCard.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
      
      // Event listener for clicking on the course card
      courseCard.addEventListener('click', () => {
        displayCourseDetails(course);  // Calls the function to display course details
      });
    
      // Append the course card to the container
      courseContainer.appendChild(courseCard);
    
      // Create list item for the course in the course list
      const listItem = document.createElement('li');
      listItem.innerHTML = `${course.subject} ${course.number} - ${course.title} <span class="credits">${course.credits} credits</span>`;
      courseList.appendChild(listItem);
    
      totalCredits += course.credits;
    });
    

    // Append total credits
    const totalListItem = document.createElement('li');
    totalListItem.innerHTML = `Total Credits: <span>${totalCredits} credits</span>`;
    courseList.appendChild(totalListItem);
  }

  function displayCourseDetails(course) {
    const courseDetails = document.getElementById('courseDetails');
  
    courseDetails.innerHTML = `
      <button id="closeModal">❌</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Certificate:</strong> ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;
  
    courseDetails.showModal();
  
    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
      courseDetails.close();
    });
  }

  document.getElementById('allCourses').addEventListener('click', () => displayCourses("all"));
  document.getElementById('cseCourses').addEventListener('click', () => displayCourses("CSE"));
  document.getElementById('wddCourses').addEventListener('click', () => displayCourses("WDD"));

  displayCourses();
});
