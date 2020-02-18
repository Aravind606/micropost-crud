import {
  http
} from './http'
import {
  ui
} from './ui'

document.addEventListener('DOMContentLoaded', getPost)

//GET method
function getPost() {
  http.get(' http://localhost:3000/posts')
    .then(data => ui.showPost(data))
    .catch(err => console.log(err))
}

var postSubmit = document.getElementById('post-submit');
postSubmit.addEventListener('click', submitPost)

//post method
function submitPost() {
  var title = document.getElementById('title').value;
  var body = document.getElementById('body').value;
  var id = document.getElementById('id').value;
  // console.log(id);

  if (title == '' || body == '') {
    ui.showAlert("please enter all fields", "alert alert-danger")
  } else {
    if (id == '') {
      var data = {
        "title": title,
        "body": body
      }
      http.post('http://localhost:3000/posts', data)
        .then(() => {
          ui.showAlert("post Added", "alert alert-danger");
          ui.clearFields();
          getPost();
        })
        .catch((err) => console.log(err))
    } else {
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          //console.log(data);
          ui.showAlert("post updated", "alert alert-success");
          ui.changeFormState('add');
          getPost();
        })
    }
  }

}

//delete method
document.getElementById('posts').addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id
    if (confirm('are you sure')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          ui.showAlert("post Removed", "alert alert-success");
          getPost();
        })
    }
  }
})

//update method
document.getElementById('posts').addEventListener('click', (e) => {
  const id = e.target.parentElement.dataset.id;
  const body = e.target.parentElement.previousElementSibling.textContent;
  const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
  if (e.target.parentElement.classList.contains('edit')) {
    var data = {
      id,
      body,
      title
    }
    ui.fillForm(data);

  }

})

//update cancel
document.querySelector('.card-form').addEventListener('click', (e) => {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
})