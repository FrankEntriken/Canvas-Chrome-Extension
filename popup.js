var token = "TOKEN GOES HERE"

const user_url = "https://canvas.chapman.edu/api/v1/users/self/";

//request
fetch(user_url, {
  method: "GET",
  headers: {
    "Authorization": "Bearer " + token,
  }
})

  //response
  .then(function(response) {
    response.json().then(function(user_data) {
      const user_id = user_data['id'];

      //url that gives list of courses
      enrolled_url = "https://canvas.chapman.edu/api/v1/users/" + user_id + "/enrollments";

      //request
      fetch(enrolled_url, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
        }
      })

        //response
        .then(function(response) {
          return response.json();
        })

        .then(function(data) {

          //list if course ids used for future fetch urls
          let course_ids = []

          //for each course in list of courses
          for (let item = 0; item < data.length; item++){
            course_ids.push(data[item]['course_id']);

            const course_url = "https://canvas.chapman.edu/api/v1/courses/" + course_ids[item];

            fetch(course_url, {
              method: "GET",
              headers: {
                "Authorization": "Bearer " + token,
              }
            })

              //json response
              .then(function(response) {
                response.json().then(function(course_data) {

                  //array to remember class name
                  let course_name = []
                  course_name.push(course_data['name']);

                  //array to remember class code
                  let course_code = []
                  course_code.push(course_data['course_code']);

                  //url that gives list of upcoming assignments
                  var assignment_url = "https://canvas.chapman.edu/api/v1/courses/" + course_ids[item] + "/assignments";
                  //console.log(item);
                  console.log(course_url);
                  console.log(assignment_url);

                  //request
                  fetch(assignment_url, {
                    method: "GET",
                    headers: {
                      "Authorization": "Bearer " + token
                    }
                  })

                    //response
                    .then(function(response){
                      response.json().then(function(assignments) {

                        //if course contains no assignments, do not show in html
                        if (assignments.length == 0) {
                          return;
                        }

                        //course title
                        const body = document.querySelector('body');
                        const div = document.createElement('div')
                        const p = document.createElement('p');
                        div.setAttribute('class', 'modal-COURSE_NAME');
                        body.append(div);
                        div.append(p);
                        p.innerHTML = (course_name[0]).link("https://canvas.chapman.edu/courses/" + course_ids[item]); //link brings student to course page

                        //for each assignment
                        for(i in assignments) {

                          //assignment name
                          const body = document.querySelector('body');
                          const div = document.createElement('div')
                          const p = document.createElement('p');
                          div.setAttribute('class', 'modal-ASSIGNMENT');
                          body.append(div);
                          div.append(p);
                          p.innerHTML = (assignments[i]['name']).link(assignments[i]['html_url']); //link brings student to assignment page

                          //error if next due date does not exist
                          var invalid = false;
                          try {
                            var x = i;
                            x++;
                            new Date(assignments[x]['due_at']);
                          } catch (TypeError) {
                            invalid = true;
                          }

                          //assignment due date
                          var due = new Date(assignments[i]['due_at'])
                          const body2 = document.querySelector('body');
                          const div2 = document.createElement('div');
                          const p2 = document.createElement('p');

                          //if this is last date, use different spacing
                          if (invalid == false) {
                            div2.setAttribute('class', 'modal-DATE');
                          } else {
                            div2.setAttribute('class', 'modal-DATE-LAST');
                          }

                          body2.append(div2);
                          div2.append(p2);
                          p2.innerHTML = (due.toLocaleString());
                        }
                      })
                    })
                })
              })
            }
        });
    })
  })

/* --------------- TODO -------------------

Functionality
  - show the right classes --> DONE!
  - oauth2
  - notifications
  - rearranging assignments

Aesthetic
  - colors
  - spacing

---------------------------------------- */
