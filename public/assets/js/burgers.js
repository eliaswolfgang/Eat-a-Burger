// Wait to attach handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }
//  Code event handlers for each button presented on the index page; will use fetch methods and api routes
  const devourButtons = document.querySelectorAll('.devour');
  const addButton = document.getElementById('create');
  const deleteButtons = document.querySelectorAll('.delete')

// UPDATE
  devourButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      const newDevoured = { devoured: true };

      fetch(`/api/burgers/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDevoured)
      }).then((response) => {
        // Check the response is ok, reload page
        if(response.ok) location.reload('/')
      });
    });
  });

  // CREATE
  addButton.addEventListener('submit', (event) => {
    event.preventDefault();

    const newBurger = {
      name: document.getElementById('newBurger').value.trim(),
      devoured: false
    };

    fetch('/api/burgers', { 
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBurger)
    }).then(() => {
      document.getElementById('newBurger').value='';
      location.reload();
    });
  });

// DELETE
  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');

      fetch(`/api/burgers/${id}`, {
        method: 'DELETE'
      }).then((response) => {
        console.log(response);
        location.reload();
      });
    });
  });

});
