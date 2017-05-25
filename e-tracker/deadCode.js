validateState(event) {

      var xhr = new XMLHttpRequest();
      xhr.open('post', 'http://127.0.0.1:3000/view_expense', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onload = function () {
      };

      xhr.send(JSON.stringify({
        filterBy:this.state.filterBy,
        date:this.state.dateValue,
        catagory : this.state.multiValue
      }));
      xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              var respOut = JSON.parse(xhr.responseText);
              console.log(respOut)
              this.setState({responseSuccess: true})
          }
      }.bind(this);
      console.log(this.state.responseSuccess)
      event.preventDefault();
  }
