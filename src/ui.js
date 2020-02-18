class UI {
  constructor() {
    this.post = document.getElementById('posts');
    this.titleInput = document.getElementById('title');
    this.bodyInput = document.getElementById('body');
    this.postSubmit = document.getElementById('post-submit');
    this.idInput = document.getElementById('id');
    this.state = 'add';
  }


  showPost(posts) {
    var output = '';

    posts.forEach(post => {
      output += `
      <div class = "card mb-3">
        <div class = "card-body">
        <h2 class="card-title">${post.title}</h2>
        <p class="card-text">${post.body}</p>
       
        <a href="#" class="card-link edit" data-id="${post.id}">
        <i class = "fa fa-pencil"></i>
        </a>
        <a href="#" class="card-link delete" data-id="${post.id}">
        <i class = "fa fa-remove" style="color:red"></i>
        </a>
        </div>
      </div>
      `
    });
    this.post.innerHTML = output;
  }

  showAlert(message, className) {

    var div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    var container = document.querySelector('.post-container');
    var post = document.querySelector('#posts')
    container.insertBefore(div, post);

    setTimeout(() => {
      this.clearAlert()
    }, 1000)
  }
  clearAlert() {
    var alert = document.querySelector('.alert')
    alert.remove();
    // if (alert) {
    //   alert.remove();
    // }
  }
  clearIdInput() {
    this.idInput.value = '';
  }
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;

    this.idInput.value = data.id;

    this.changeFormState('edit')
  }

  changeFormState(type) {
    if (type == 'edit') {
      this.postSubmit.textContent = "update post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      //create cancel button
      var button = document.createElement('button');
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel Edit"));

      var cardForm = document.querySelector('.card-form');
      var form = document.querySelector('.form-end');
      cardForm.insertBefore(button, form);

    } else {
      this.postSubmit.textContent = "post It";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";
      document.querySelector('.post-cancel').remove();

      this.clearIdInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();