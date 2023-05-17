fetch('http://43.200.63.91:3000/slackapi')
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Error: ' + response.status);
  })
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(error) {
    console.log(error);
  }
  )