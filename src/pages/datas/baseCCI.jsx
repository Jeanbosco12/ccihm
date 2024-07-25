import axios from 'axios';

// ...
let mockDataTeam = [];
// Assuming you have an API endpoint to fetch the team data
const API_ENDPOINT = 'https://localhost:8080/membres';

// Function to fetch data from the API and update the static data
async function baseCCI() {
  try {
    const response = await axios.get(API_ENDPOINT);
    const teamData = response.data;

    // Update the static data with the fetched data
    mockDataTeam.length = 0;
    teamData.forEach((teamMember) => {
      mockDataTeam.push({
        id: teamMember.id,
        name: teamMember.name,
        email: teamMember.email,
        age: teamMember.age,
        phone: teamMember.phone,
        access: teamMember.access,
      });
    });

    // Now you can use the updated mockDataTeam for your application
    console.log(mockDataTeam);
  } catch (error) {
    console.error('Error fetching team data:', error);
  }
}

// Call the function to fetch the team data
baseCCI();

// ...